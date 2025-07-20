import { checkForMismatchedSize } from "utils/misc/checkForMismatchedSize";
import { getVectorFromAngle } from "utils/data/vectors";
import { P5Instance } from "types/p5";
import {
  initialPerlinFieldVars,
  PerlinFieldVars,
} from "./PerlinField.variables";

const BASE_INCREMENT = 0.01;
const MAX_RANDOM_SEED = 1000000;

export const getPerlinFieldSketch = () => {
  return (p: P5Instance<PerlinFieldVars>) => {
    p.variables = initialPerlinFieldVars;
    let initOffset: number;
    let zOff = 0;

    const drawBackground = () => {
      p.background(0);
    };

    p.setup = () => {
      initOffset = p.random(0, MAX_RANDOM_SEED);
      p.frameRate(50);
      p.colorMode(p.HSB);
      p.createCanvas(p.windowWidth, p.windowHeight);
      drawBackground();
    };

    p.windowResized = () => {
      p.resizeCanvas(p.windowWidth, p.windowHeight);
      drawBackground();
    };

    p.draw = () => {
      drawBackground()
      checkForMismatchedSize(p);
      if (p.variables) {
        // get variables
        const {
          vectorPadding,
          angleVariation,
          perlinXIncrementScale,
          perlinYIncrementScale,
          perlinZIncrementScale,
        } = p.variables;

        let xOff = initOffset;
        let yOff = initOffset;

        for (let x = vectorPadding / 3; x < p.width; x += vectorPadding) {
          for (let y = vectorPadding / 3; y < p.height; y += vectorPadding) {
            // use trig to find vector
            const angle =
              (p.noise(xOff, yOff, zOff) * p.TWO_PI * angleVariation) %
              p.TWO_PI;
            const { x: x2, y: y2 } = getVectorFromAngle(
              x,
              y,
              angle,
              vectorPadding
            );

            // get a nice color
            const hue = Math.round(
              p.map(
                angle < p.PI ? angle : p.PI - (angle - p.PI), // smoothen the hue by implementing a middle point that it rises to and falls from rather than a jump to start
                0,
                p.PI,
                0,
                255
              )
            );

            p.stroke(hue, 255, 255);
            p.line(x, y, x2, y2);

            yOff += perlinYIncrementScale * BASE_INCREMENT;
          }
          yOff = initOffset;
          xOff += perlinXIncrementScale * BASE_INCREMENT;
        }

        zOff += perlinZIncrementScale * BASE_INCREMENT;
      }
    };
  };
};
