// Generates a link-preview / OG thumbnail (1200x630) using the same
// fBm-noise + marching-squares topographic contour background as the
// homepage (see src/home/utils/heightfield.ts + marchingSquares.ts and
// src/home/components/TopographicBackground.tsx), rendered once to a
// static PNG instead of animated per-frame in the browser.
//
// Usage:
//   node scripts/thumbnail-generator.mjs ["Title" ["Subtitle"]] [--out path] [--seed text]
//
// With no title/subtitle, outputs just the background texture.
import { GlobalFonts, createCanvas } from "@napi-rs/canvas";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const WIDTH = 1200;
const HEIGHT = 630;

const palette = {
    background: { r: 31, g: 31, b: 40 }, // --bg-dark
    highlightTeal: { r: 122, g: 168, b: 159 }, // --highlight-teal
    highlightBlue: { r: 127, g: 180, b: 202 }, // --highlight-blue
    title: "#e5e9f0",
    subtitle: "#7fb4ca" // --highlight-blue
};

// ---- CLI args ---------------------------------------------------------

const rawArgs = process.argv.slice(2);
const flags = {};
const positional = [];
for (let i = 0; i < rawArgs.length; i++) {
    const arg = rawArgs[i];
    if (arg.startsWith("--")) {
        flags[arg.slice(2)] = rawArgs[++i];
    } else {
        positional.push(arg);
    }
}

const title = flags.title ?? positional[0] ?? "";
const subtitle = flags.subtitle ?? positional[1] ?? "";
const seedText = flags.seed ?? (title || subtitle || "default");

const slugify = (value) =>
    value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "") || "blank";

const outPath =
    flags.out ??
    path.join(root, "public/assets/img/thumbnails", `${slugify(title)}.png`);

// ---- Seeded PRNG + Perlin noise ---------------------------------------
// A self-contained classic (Ken Perlin) 3D noise implementation, seeded so
// the same title/subtitle always reproduces the same texture.

const hashSeed = (text) => {
    let h = 2166136261;
    for (let i = 0; i < text.length; i++) {
        h ^= text.charCodeAt(i);
        h = Math.imul(h, 16777619);
    }
    return h >>> 0;
};

const mulberry32 = (seed) => {
    let a = seed;
    return () => {
        a |= 0;
        a = (a + 0x6d2b79f5) | 0;
        let t = Math.imul(a ^ (a >>> 15), 1 | a);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
};

const buildPermutation = (random) => {
    const p = Array.from({ length: 256 }, (_, i) => i);
    for (let i = 255; i > 0; i--) {
        const j = Math.floor(random() * (i + 1));
        [p[i], p[j]] = [p[j], p[i]];
    }
    return [...p, ...p];
};

const fade = (t) => t * t * t * (t * (t * 6 - 15) + 10);
const lerp = (t, a, b) => a + t * (b - a);
const grad = (hash, x, y, z) => {
    const h = hash & 15;
    const u = h < 8 ? x : y;
    const v = h < 4 ? y : h === 12 || h === 14 ? x : z;
    return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
};

const makeNoise3D = (perm) => (x, y, z) => {
    const X = Math.floor(x) & 255;
    const Y = Math.floor(y) & 255;
    const Z = Math.floor(z) & 255;
    x -= Math.floor(x);
    y -= Math.floor(y);
    z -= Math.floor(z);
    const u = fade(x);
    const v = fade(y);
    const w = fade(z);
    const A = perm[X] + Y;
    const AA = perm[A] + Z;
    const AB = perm[A + 1] + Z;
    const B = perm[X + 1] + Y;
    const BA = perm[B] + Z;
    const BB = perm[B + 1] + Z;

    const result = lerp(
        w,
        lerp(
            v,
            lerp(u, grad(perm[AA], x, y, z), grad(perm[BA], x - 1, y, z)),
            lerp(u, grad(perm[AB], x, y - 1, z), grad(perm[BB], x - 1, y - 1, z))
        ),
        lerp(
            v,
            lerp(u, grad(perm[AA + 1], x, y, z - 1), grad(perm[BA + 1], x - 1, y, z - 1)),
            lerp(u, grad(perm[AB + 1], x, y - 1, z - 1), grad(perm[BB + 1], x - 1, y - 1, z - 1))
        )
    );
    // classic Perlin noise is roughly [-1, 1]; normalize to [0, 1] like p5.noise()
    return (result + 1) / 2;
};

// ---- Heightfield (fBm) + marching squares ------------------------------
// Ported 1:1 from src/home/utils/heightfield.ts and marchingSquares.ts,
// which have no browser/DOM dependency beyond the noise sampler itself.

const generateHeightfield = (sampleNoise, { cols, rows, noiseScale, time, octaves = 3, persistence = 0.5, lacunarity = 2 }) => {
    const field = new Float32Array(cols * rows);
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            let amplitude = 1;
            let frequency = 1;
            let sum = 0;
            let maxAmplitude = 0;
            for (let octave = 0; octave < octaves; octave++) {
                sum += sampleNoise(col * noiseScale * frequency, row * noiseScale * frequency, time) * amplitude;
                maxAmplitude += amplitude;
                amplitude *= persistence;
                frequency *= lacunarity;
            }
            field[row * cols + col] = sum / maxAmplitude;
        }
    }
    return field;
};

const interpolateThreshold = (threshold, v0, v1) => (v1 === v0 ? 0.5 : (threshold - v0) / (v1 - v0));

const marchCell = (tl, tr, br, bl, x0, y0, x1, y1, threshold) => {
    const tlAbove = tl >= threshold;
    const trAbove = tr >= threshold;
    const brAbove = br >= threshold;
    const blAbove = bl >= threshold;

    const top = tlAbove !== trAbove ? { x: x0 + interpolateThreshold(threshold, tl, tr) * (x1 - x0), y: y0 } : null;
    const right = trAbove !== brAbove ? { x: x1, y: y0 + interpolateThreshold(threshold, tr, br) * (y1 - y0) } : null;
    const bottom = blAbove !== brAbove ? { x: x0 + interpolateThreshold(threshold, bl, br) * (x1 - x0), y: y1 } : null;
    const left = tlAbove !== blAbove ? { x: x0, y: y0 + interpolateThreshold(threshold, tl, bl) * (y1 - y0) } : null;

    if (top && right && bottom && left) {
        const center = (tl + tr + br + bl) / 4;
        return center >= threshold ? [{ a: left, b: top }, { a: right, b: bottom }] : [{ a: top, b: right }, { a: bottom, b: left }];
    }
    if (top && right) return [{ a: top, b: right }];
    if (right && bottom) return [{ a: right, b: bottom }];
    if (bottom && left) return [{ a: bottom, b: left }];
    if (left && top) return [{ a: left, b: top }];
    if (top && bottom) return [{ a: top, b: bottom }];
    if (left && right) return [{ a: left, b: right }];
    return [];
};

const extractContours = (field, cols, rows, cellSize, thresholds) => {
    const contours = thresholds.map(() => []);
    for (let row = 0; row < rows - 1; row++) {
        for (let col = 0; col < cols - 1; col++) {
            const tl = field[row * cols + col];
            const tr = field[row * cols + col + 1];
            const bl = field[(row + 1) * cols + col];
            const br = field[(row + 1) * cols + col + 1];
            const x0 = col * cellSize;
            const y0 = row * cellSize;
            const x1 = x0 + cellSize;
            const y1 = y0 + cellSize;
            for (let i = 0; i < thresholds.length; i++) {
                const segments = marchCell(tl, tr, br, bl, x0, y0, x1, y1, thresholds[i]);
                if (segments.length) contours[i].push(...segments);
            }
        }
    }
    return contours;
};

// ---- Render -------------------------------------------------------------

const random = mulberry32(hashSeed(seedText));
const perm = buildPermutation(random);
const noise3D = makeNoise3D(perm);
const timeOffset = random() * 1000;

const cellSize = 10;
const noiseScale = 0.025;
const octaves = 3;
const contourCount = 10;
const cols = Math.ceil(WIDTH / cellSize) + 1;
const rows = Math.ceil(HEIGHT / cellSize) + 1;

const field = generateHeightfield(noise3D, { cols, rows, noiseScale, time: timeOffset, octaves });
const thresholds = Array.from({ length: contourCount }, (_, i) => (i + 1) / (contourCount + 1));
const contours = extractContours(field, cols, rows, cellSize, thresholds);

const canvas = createCanvas(WIDTH, HEIGHT);
const ctx = canvas.getContext("2d");

ctx.fillStyle = `rgb(${palette.background.r}, ${palette.background.g}, ${palette.background.b})`;
ctx.fillRect(0, 0, WIDTH, HEIGHT);

contours.forEach((segments, i) => {
    if (!segments.length) return;
    const t = i / (contourCount - 1);
    const r = lerp(t, palette.highlightTeal.r, palette.highlightBlue.r);
    const g = lerp(t, palette.highlightTeal.g, palette.highlightBlue.g);
    const b = lerp(t, palette.highlightTeal.b, palette.highlightBlue.b);
    const alpha = lerp(t, 12, 35) / 255;

    ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    segments.forEach((segment) => {
        ctx.moveTo(segment.a.x, segment.a.y);
        ctx.lineTo(segment.b.x, segment.b.y);
    });
    ctx.stroke();
});

if (title || subtitle) {
    GlobalFonts.registerFromPath(path.join(root, "public/assets/fonts/Outfit/static/Outfit-Regular.ttf"), "Outfit");
    GlobalFonts.registerFromPath(path.join(root, "public/assets/fonts/Montserrat/static/Montserrat-Regular.ttf"), "Montserrat");

    // Subtle scrim behind the text so it stays legible over the contour lines.
    const gradient = ctx.createLinearGradient(0, HEIGHT * 0.35, 0, HEIGHT);
    gradient.addColorStop(0, "rgba(22, 22, 29, 0)");
    gradient.addColorStop(1, "rgba(22, 22, 29, 0.55)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    const padding = 80;
    const maxTextWidth = WIDTH - padding * 2;

    const wrapText = (text, font, maxWidth) => {
        ctx.font = font;
        const words = text.split(/\s+/);
        const lines = [];
        let line = "";
        for (const word of words) {
            const candidate = line ? `${line} ${word}` : word;
            if (ctx.measureText(candidate).width > maxWidth && line) {
                lines.push(line);
                line = word;
            } else {
                line = candidate;
            }
        }
        if (line) lines.push(line);
        return lines;
    };

    const titleFont = "600 56px Outfit";
    const subtitleFont = "400 28px Montserrat";
    const titleLines = title ? wrapText(title, titleFont, maxTextWidth) : [];
    const subtitleLines = subtitle ? wrapText(subtitle, subtitleFont, maxTextWidth) : [];

    const titleLineHeight = 66;
    const subtitleLineHeight = 38;
    const gap = title && subtitle ? 24 : 0;
    const blockHeight = titleLines.length * titleLineHeight + gap + subtitleLines.length * subtitleLineHeight;

    let y = HEIGHT - padding - blockHeight + titleLineHeight * 0.75;

    ctx.textAlign = "left";
    ctx.fillStyle = palette.title;
    ctx.font = titleFont;
    titleLines.forEach((line) => {
        ctx.fillText(line, padding, y);
        y += titleLineHeight;
    });

    y += gap;
    ctx.fillStyle = palette.subtitle;
    ctx.font = subtitleFont;
    subtitleLines.forEach((line) => {
        ctx.fillText(line, padding, y);
        y += subtitleLineHeight;
    });
}

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, canvas.toBuffer("image/png"));
console.log(`Wrote ${path.relative(root, outPath)} (${WIDTH}x${HEIGHT})`);
