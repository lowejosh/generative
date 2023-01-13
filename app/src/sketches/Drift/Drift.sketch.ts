import { checkForMismatchedSize } from "utils/misc/checkForMismatchedSize";
import { P5Instance } from "types/p5";

import { initialDriftVars, DriftVars } from "./Drift.variables";
import { createPerlinNoise } from "factories/PerlinNoise/PerlinNoise";
import { getVectorFromAngle } from "../../utils/data/vectors";

export const getDriftSketch = () => {
  return (p: P5Instance<DriftVars>) => {
    p.variables = initialDriftVars;
    const mainNoiseHandler = createPerlinNoise({
      noiseIncrement: 0.003,
    });
    const lineLengthNoiseHandler = createPerlinNoise({
      noiseIncrement: 0.005,
    });

    const drawBackground = () => {
      p.background(0);
    };

    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight);
      p.strokeWeight(3);
      drawBackground();
    };

    p.windowResized = () => {
      p.resizeCanvas(p.windowWidth, p.windowHeight);
      drawBackground();
    };

    p.draw = () => {
      drawBackground();
      checkForMismatchedSize(p);
      if (p.variables) {
        const increment = 15;
        p.stroke(255, 255, 255, 125);

        for (let x = 0; x < p.width; x += increment) {
          for (let y = 0; y < p.width; y += increment) {
            const lineLengthNoise = lineLengthNoiseHandler.getNoise(
              x,
              y,
              p.frameCount * 2
            );
            const lineLength =
              p.map(lineLengthNoise, 0, 1, -50, 250, true) || 0;

            if (lineLength > 0) {
              const mainNoise = mainNoiseHandler.getNoise(x, y, p.frameCount);
              const angle = (mainNoise * p.TWO_PI) % p.TWO_PI;
              const { x: x2, y: y2 } = getVectorFromAngle(
                x,
                y,
                angle,
                lineLength
              );

              p.line(x, y, x2, y2);
            }
          }
        }
      }
      // p.noLoop();
    };
  };
};
