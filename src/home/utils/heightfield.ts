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
