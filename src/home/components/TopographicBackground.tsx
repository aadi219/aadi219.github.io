import p5Types from "p5";
import { useEffect, useRef, useState } from "react";
import Sketch from "react-p5";
import { applyRadialBump, generateHeightfield } from "../utils/heightfield";
import { extractContours } from "../utils/marchingSquares";

const highlightTeal = { r: 122, g: 168, b: 159 };
const highlightBlue = { r: 127, g: 180, b: 202 };

const TopographicBackground = () => {
    const time = useRef(0);
    const frameCount = useRef(0);
    const [lowPerfMode, setLowPerfMode] = useState(false);
    const mouseX = useRef(0);
    const mouseY = useRef(0);
    const isMouseInCanvas = useRef(false);

    // performance tuning
    const drawEveryNthFrame = 4;
    const cellSize = lowPerfMode ? 44 : 30;
    const noiseScale = 0.12;
    const octaves = lowPerfMode ? 2 : 3;
    const contourCount = lowPerfMode ? 6 : 10;
    const timeStep = 0.0025;
    const mouseBumpRadius = 220;
    const mouseBumpStrength = 0.35;

    useEffect(() => {
        const isLowPowered = navigator.hardwareConcurrency <= 4;
        setLowPerfMode(isLowPowered);

        return () => {
            time.current = 0;
        };
    }, []);

    const setup = (p5: p5Types, canvasParentRef: Element) => {
        const canvas = p5
            .createCanvas(window.innerWidth, window.innerHeight)
            .parent(canvasParentRef);
        canvas.style("position", "absolute");
        canvas.style("left", "0");
        canvas.style("top", "0");
        canvas.style("z-index", "-1");
        canvas.style("width", "100%");
        canvas.style("height", "100%");
        p5.noFill();

        if (lowPerfMode) {
            p5.pixelDensity(0.5);
        }
    };

    const draw = (p5: p5Types) => {
        frameCount.current++;
        if (frameCount.current % drawEveryNthFrame !== 0) return;

        mouseX.current = p5.mouseX;
        mouseY.current = p5.mouseY;
        isMouseInCanvas.current =
            p5.mouseX >= 0 &&
            p5.mouseX <= p5.width &&
            p5.mouseY >= 0 &&
            p5.mouseY <= p5.height;

        p5.clear(0, 0, p5.width, p5.height);
        p5.background(31, 31, 40, 20);

        const cols = Math.ceil(p5.width / cellSize) + 1;
        const rows = Math.ceil(p5.height / cellSize) + 1;

        const field = generateHeightfield((x, y, z) => p5.noise(x, y, z), {
            cols,
            rows,
            noiseScale,
            time: time.current,
            octaves,
        });

        if (isMouseInCanvas.current) {
            applyRadialBump(
                field,
                cols,
                rows,
                cellSize,
                mouseX.current,
                mouseY.current,
                mouseBumpRadius,
                mouseBumpStrength
            );
        }

        const thresholds = Array.from(
            { length: contourCount },
            (_, i) => (i + 1) / (contourCount + 1)
        );

        const contours = extractContours(field, cols, rows, cellSize, thresholds);

        contours.forEach((segments, i) => {
            if (!segments.length) return;

            const t = i / (contourCount - 1);
            const r = p5.lerp(highlightTeal.r, highlightBlue.r, t);
            const g = p5.lerp(highlightTeal.g, highlightBlue.g, t);
            const b = p5.lerp(highlightTeal.b, highlightBlue.b, t);
            const alpha = p5.map(t, 0, 1, 12, 35);

            p5.stroke(r, g, b, alpha);
            p5.strokeWeight(1);

            segments.forEach((segment) => {
                p5.line(segment.a.x, segment.a.y, segment.b.x, segment.b.y);
            });
        });

        time.current += timeStep;
    };

    const windowResized = (p5: p5Types) => {
        if (frameCount.current % 10 === 0) {
            p5.resizeCanvas(window.innerWidth, window.innerHeight);
        }
    };

    return <Sketch setup={setup} draw={draw} windowResized={windowResized} />;
};

export default TopographicBackground;
