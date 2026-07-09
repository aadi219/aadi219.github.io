export interface Point {
    x: number;
    y: number;
}

export interface Segment {
    a: Point;
    b: Point;
}

const interpolate = (threshold: number, v0: number, v1: number): number => {
    if (v1 === v0) return 0.5;
    return (threshold - v0) / (v1 - v0);
};

const marchCell = (
    tl: number,
    tr: number,
    br: number,
    bl: number,
    x0: number,
    y0: number,
    x1: number,
    y1: number,
    threshold: number
): Segment[] => {
    const tlAbove = tl >= threshold;
    const trAbove = tr >= threshold;
    const brAbove = br >= threshold;
    const blAbove = bl >= threshold;

    const top: Point | null =
        tlAbove !== trAbove
            ? { x: x0 + interpolate(threshold, tl, tr) * (x1 - x0), y: y0 }
            : null;
    const right: Point | null =
        trAbove !== brAbove
            ? { x: x1, y: y0 + interpolate(threshold, tr, br) * (y1 - y0) }
            : null;
    const bottom: Point | null =
        blAbove !== brAbove
            ? { x: x0 + interpolate(threshold, bl, br) * (x1 - x0), y: y1 }
            : null;
    const left: Point | null =
        tlAbove !== blAbove
            ? { x: x0, y: y0 + interpolate(threshold, tl, bl) * (y1 - y0) }
            : null;

    if (top && right && bottom && left) {
        // Saddle case: resolve the ambiguity using the cell's average value.
        const center = (tl + tr + br + bl) / 4;
        return center >= threshold
            ? [
                  { a: left, b: top },
                  { a: right, b: bottom },
              ]
            : [
                  { a: top, b: right },
                  { a: bottom, b: left },
              ];
    }

    if (top && right) return [{ a: top, b: right }];
    if (right && bottom) return [{ a: right, b: bottom }];
    if (bottom && left) return [{ a: bottom, b: left }];
    if (left && top) return [{ a: left, b: top }];
    if (top && bottom) return [{ a: top, b: bottom }];
    if (left && right) return [{ a: left, b: right }];

    return [];
};

/**
 * Runs marching squares over a row-major heightfield for each threshold,
 * returning one segment list per threshold (in the same order) so callers
 * can batch drawing by contour level.
 */
export const extractContours = (
    field: Float32Array,
    cols: number,
    rows: number,
    cellSize: number,
    thresholds: number[]
): Segment[][] => {
    const contours: Segment[][] = thresholds.map(() => []);

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
                const segments = marchCell(
                    tl,
                    tr,
                    br,
                    bl,
                    x0,
                    y0,
                    x1,
                    y1,
                    thresholds[i]
                );
                if (segments.length) contours[i].push(...segments);
            }
        }
    }

    return contours;
};
