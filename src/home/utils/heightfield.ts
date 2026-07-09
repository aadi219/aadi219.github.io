export type NoiseSampler = (x: number, y: number, z: number) => number;

export interface HeightfieldOptions {
    cols: number;
    rows: number;
    noiseScale: number;
    time: number;
    octaves?: number;
    persistence?: number;
    lacunarity?: number;
}

/**
 * Builds a row-major grid of elevation values in roughly [0, 1] by summing
 * octaves of the supplied noise function (fractal/fBm noise).
 */
export const generateHeightfield = (
    sampleNoise: NoiseSampler,
    options: HeightfieldOptions
): Float32Array => {
    const {
        cols,
        rows,
        noiseScale,
        time,
        octaves = 3,
        persistence = 0.5,
        lacunarity = 2,
    } = options;

    const field = new Float32Array(cols * rows);

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            let amplitude = 1;
            let frequency = 1;
            let sum = 0;
            let maxAmplitude = 0;

            for (let octave = 0; octave < octaves; octave++) {
                sum +=
                    sampleNoise(
                        col * noiseScale * frequency,
                        row * noiseScale * frequency,
                        time
                    ) * amplitude;
                maxAmplitude += amplitude;
                amplitude *= persistence;
                frequency *= lacunarity;
            }

            field[row * cols + col] = sum / maxAmplitude;
        }
    }

    return field;
};

/**
 * Raises the heightfield within a radius of a point (in the same pixel
 * space as cellSize), with a smooth falloff toward the edge of the radius.
 * Only visits cells inside the affected bounding box.
 */
export const applyRadialBump = (
    field: Float32Array,
    cols: number,
    rows: number,
    cellSize: number,
    centerX: number,
    centerY: number,
    radius: number,
    strength: number
): void => {
    const radiusCells = radius / cellSize;
    if (radiusCells <= 0) return;

    const centerCol = centerX / cellSize;
    const centerRow = centerY / cellSize;
    const minCol = Math.max(0, Math.floor(centerCol - radiusCells));
    const maxCol = Math.min(cols - 1, Math.ceil(centerCol + radiusCells));
    const minRow = Math.max(0, Math.floor(centerRow - radiusCells));
    const maxRow = Math.min(rows - 1, Math.ceil(centerRow + radiusCells));

    for (let row = minRow; row <= maxRow; row++) {
        for (let col = minCol; col <= maxCol; col++) {
            const dx = col - centerCol;
            const dy = row - centerRow;
            const dist = Math.sqrt(dx * dx + dy * dy) / radiusCells;
            if (dist >= 1) continue;

            const falloff = (1 - dist) ** 2;
            field[row * cols + col] += falloff * strength;
        }
    }
};
