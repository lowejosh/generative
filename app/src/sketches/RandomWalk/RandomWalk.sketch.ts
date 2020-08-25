import { RandomWalkVariables } from "./RandomWalk";
import { P5Instance } from "types/p5";

export const getRandomWalkSketch = (initialVariables: RandomWalkVariables) => {
  return (p: P5Instance<RandomWalkVariables>) => {
    p.variables = initialVariables;
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
          POS_VARIANCE,
          COLOR_VARIANCE,
          ELLIPSE_OPACITY,
          ELLIPSE_RADIUS,
          SPEED,
        } = p.variables;

        // draw an ellipse
        Array(SPEED)
          .fill(0)
          .forEach(() => {
            p.fill(r, g, b, p.map(ELLIPSE_OPACITY, 0, 100, 0, 255));
            p.noStroke();
            p.ellipse(x, y, ELLIPSE_RADIUS, ELLIPSE_RADIUS);

            //increment pos randomly (max at end of screen - diameter)
            x = incrementRandomlyMinMaxed(x, POS_VARIANCE, 0, p.windowWidth);
            y = incrementRandomlyMinMaxed(y, POS_VARIANCE, 0, p.windowHeight);

            //increment color randomly (max at 255)
            r = incrementRandomlyMinMaxed(r, COLOR_VARIANCE, 0, 255);
            g = incrementRandomlyMinMaxed(g, COLOR_VARIANCE, 0, 255);
            b = incrementRandomlyMinMaxed(b, COLOR_VARIANCE, 0, 255);
          });
      }
    };
  };
};
