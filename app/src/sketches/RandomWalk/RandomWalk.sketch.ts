import { initialRandomWalkVars, RandomWalkVars } from "./RandomWalk.variables";
import { P5Instance } from "types/p5";

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

    const incrementRandomlyMinMaxed = (
      current: number,
      variance: number,
      min: number,
      max: number
    ) => {
      if (current + variance > max) {
        current = current + p.random(-variance, 0);
      } else if (current - variance < min) {
        current = current + p.random(0, variance);
      } else {
        current = current + p.random(-variance, variance);
      }
      return current;
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
            p.fill(r, g, b, p.map(opacity, 0, 100, 0, 255));
            p.noStroke();
            p.ellipse(x, y, radius, radius);

            //increment pos randomly (max at end of screen - diameter)
            x = incrementRandomlyMinMaxed(x, posVariance, 0, p.windowWidth);
            y = incrementRandomlyMinMaxed(y, posVariance, 0, p.windowHeight);

            //increment color randomly (max at 255)
            r = incrementRandomlyMinMaxed(r, colorVariance, 0, 255);
            g = incrementRandomlyMinMaxed(g, colorVariance, 0, 255);
            b = incrementRandomlyMinMaxed(b, colorVariance, 0, 255);
          });
      }
    };
  };
};
