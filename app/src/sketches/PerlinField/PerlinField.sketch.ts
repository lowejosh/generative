import { P5Instance } from "types/p5";
import {
  initialPerlinFieldVars,
  PerlinFieldVars,
} from "./PerlinField.variables";

export const getPerlinFieldSketch = () => {
  return (p: P5Instance<PerlinFieldVars>) => {
    p.variables = initialPerlinFieldVars;
    const baseIncrement = 0.01;
    let initOffset: number;
    let zOff = 0;

    const drawBackground = () => {
      p.background(0);
    };

    p.setup = () => {
      initOffset = p.random(0, 1000000);
      p.frameRate(30);
      p.colorMode(p.HSB);
      p.createCanvas(p.windowWidth, p.windowHeight);
      drawBackground();
    };

    p.windowResized = () => {
      p.resizeCanvas(p.windowWidth, p.windowHeight);
      drawBackground();
    };

    p.draw = () => {
      if (p.variables) {
        drawBackground();
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
            const x2 = x + p.sin(angle) * vectorPadding;
            const y2 = y + p.cos(angle) * vectorPadding;

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

            yOff += perlinYIncrementScale * baseIncrement;
          }
          yOff = initOffset;
          xOff += perlinXIncrementScale * baseIncrement;
        }

        zOff += perlinZIncrementScale * baseIncrement;
      }
    };
  };
};
