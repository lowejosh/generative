const getSketchTemplate = (sketchName) => `
import { checkForMismatchedSize } from "sketches/sketch-utils/funcs/checkForMismatchedSize";
import { initial${sketchName}Vars, ${sketchName}Vars } from "./${sketchName}.variables";
import { P5Instance } from "types/p5";

export const get${sketchName}Sketch = () => {
  return (p: P5Instance<${sketchName}Vars>) => {
    p.variables = initial${sketchName}Vars;

    const drawBackground = () => {
      p.background(0);
    };

    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight);
      drawBackground();
    };

    p.windowResized = () => {
      p.resizeCanvas(p.windowWidth, p.windowHeight);
      drawBackground();
    };

    p.draw = () => {
      checkForMismatchedSize(p);
      if (p.variables) {
        // get variables
        const {
          foo,
          bar,
        } = p.variables;

        // do stuff
      }
    };
  };
};
`;

module.exports = getSketchTemplate;
