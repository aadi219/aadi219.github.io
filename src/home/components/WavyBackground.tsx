import p5Types from "p5";
import { useEffect, useRef, useState } from "react";
import Sketch from "react-p5";

const WavyBackground = () => {
    const yOffset = useRef(0);
    const noiseScale = useRef(0.008);
    const frameCount = useRef(0);
    const [lowPerfMode, setLowPerfMode] = useState(false);
    const mouseX = useRef(0);
    const mouseY = useRef(0);
    const isMouseInCanvas = useRef(false);

    // performance optimizations
    const drawEveryNthFrame = 4;
    const lineResolution = 120;
    const numLines = lowPerfMode ? 10 : 20;

    useEffect(() => {
        // Check if running on a lower-powered device
        const checkPerformance = () => {
            const isLowPowered = navigator.hardwareConcurrency <= 4;
            setLowPerfMode(isLowPowered);
        };

        checkPerformance();

        // Clean up animation frame on unmount
        return () => {
            yOffset.current = 0;
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
        // only draw every nth frame
        frameCount.current++;
        if (frameCount.current % drawEveryNthFrame !== 0) return;

        // Update mouse position
        mouseX.current = p5.mouseX;
        mouseY.current = p5.mouseY;
        isMouseInCanvas.current =
            p5.mouseX >= 0 &&
            p5.mouseX <= p5.width &&
            p5.mouseY >= 0 &&
            p5.mouseY <= p5.height;

        p5.clear(0,0,0,0);
        p5.background(7, 33, 50, 15);

        const width = p5.width;
        const height = p5.height;

        const highlightBlue = { r: 95, g: 203, b: 236 };
        const highlightTeal = { r: 74, g: 254, b: 189 };

        const mouseInfluenceRadius = Math.min(width, height) * 0.25;

        for (let i = 0; i < numLines; i++) {
            let t = i / (numLines - 1);

            // Start point: along left edge
            let startY = p5.map(t, 0, 1, height * 0.1, height * 0.85);

            // Instead of beginning a shape for the whole line at once,
            // draw segments with varying opacity

            let prevX = 0;
            let prevY = startY;

            for (
                let step = 1 / lineResolution;
                step <= 1;
                step += 1 / lineResolution
            ) {
                // Interpolate base position
                let x = p5.lerp(0, width * 0.9, step);
                let y = p5.lerp(startY, height * 0.95, step);

                // Calculate distance from mouse
                let distToMouse = p5.dist(x, y, mouseX.current, mouseY.current);
                let mouseInfluence = isMouseInCanvas.current
                    ? p5.map(distToMouse, 0, mouseInfluenceRadius, 1, 0, true)
                    : 0;

                // extra noise for mouse hover effect
                let mouseNoiseEffect = mouseInfluence * 40;

                let noiseVal = p5.noise(
                    x * noiseScale.current,
                    i * 0.3,
                    yOffset.current
                );

                if (isMouseInCanvas.current && mouseInfluence > 0) {
                    noiseVal +=
                        p5.noise(
                            x * 0.01 + p5.frameCount * 0.05,
                            y * 0.01,
                            yOffset.current * 2
                        ) *
                        0.3 *
                        mouseInfluence;
                }

                let noiseAmount = (noiseVal - 0.5) * (80 + mouseNoiseEffect); // Centered noise

                // more noise in the middle, less at endpoints
                let waveFactor = Math.sin(step * Math.PI);
                noiseAmount *= waveFactor;

                // Apply offset
                y += noiseAmount;

                // calculate opacity based on x position
                let opacity = p5.map(
                    step,
                    0,
                    0.6, // map the first 60% of the line
                    5,
                    40, // from 5% to 40% transparency
                    true
                );

                // color interpolation between blue and teal based on mouse influence
                let r = p5.lerp(
                    highlightBlue.r,
                    highlightTeal.r,
                    mouseInfluence
                );
                let g = p5.lerp(
                    highlightBlue.g,
                    highlightTeal.g,
                    mouseInfluence
                );
                let b = p5.lerp(
                    highlightBlue.b,
                    highlightTeal.b,
                    mouseInfluence
                );
                let strokeW = p5.lerp(1.2, 1.8, mouseInfluence);

                p5.stroke(r, g, b, opacity);
                p5.strokeWeight(strokeW);

                // Draw line segment
                p5.line(prevX, prevY, x, y);

                // Update previous point
                prevX = x;
                prevY = y;
            }
        }

        // slower animation for better performance
        yOffset.current += 0.03;
    };

    // debounce window resize for better performance
    const windowResized = (p5: p5Types) => {
        // debounce resize to avoid excessive calculations
        if (frameCount.current % 10 === 0) {
            p5.resizeCanvas(window.innerWidth, window.innerHeight);
        }
    };

    return <Sketch setup={setup} draw={draw} windowResized={windowResized} />;
};

export default WavyBackground;
