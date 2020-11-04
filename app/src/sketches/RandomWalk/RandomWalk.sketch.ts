import { initialRandomWalkVars, RandomWalkVars } from "./RandomWalk.variables";
import { incrementRandomlyMinMaxed } from "utils/data/values";
import { P5Instance } from "types/p5";
import { checkForMismatchedSize } from "utils/misc/checkForMismatchedSize";

export const getRandomWalkSketch = () => {
  return (p: P5Instance<RandomWalkVars>) => {
    p.variables = initialRandomWalkVars;
    let x = 0;
    let y = 0;
    let r = 255;
    let g = 255;
    let b = 255;

    const drawBackground = () => {
      p.background(0);
    };

    const setupPosition = () => {
      x = p.windowWidth / 2;
      y = p.windowHeight / 2;
      r = 255;
      g = 255;
      b = 255;
    };

    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight);
      drawBackground();
      setupPosition();
    };

    p.windowResized = () => {
      p.resizeCanvas(p.windowWidth, p.windowHeight);
      drawBackground();
      setupPosition();
    };

    p.draw = () => {
      checkForMismatchedSize(p);
      if (p.variables) {
        // get variables
        const {
          posVariance,
          colorVariance,
          opacity,
          radius,
          speed,
        } = p.variables;

        // draw an ellipse
        Array(speed)
          .fill(0)
          .forEach(() => {
            // prepare
            p.fill(r, g, b, p.map(opacity, 0, 100, 0, 255));
            p.noStroke();
            p.ellipse(x, y, radius, radius);

            // increment pos randomly (max at end of screen - diameter)
            x = incrementRandomlyMinMaxed(p, x, posVariance, 0, p.windowWidth);
            y = incrementRandomlyMinMaxed(p, y, posVariance, 0, p.windowHeight);

            // increment color randomly (max at 255)
            r = incrementRandomlyMinMaxed(p, r, colorVariance, 0, 255);
            g = incrementRandomlyMinMaxed(p, g, colorVariance, 0, 255);
            b = incrementRandomlyMinMaxed(p, b, colorVariance, 0, 255);
          });
      }
    };
  };
};
