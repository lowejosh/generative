const getSketchTemplate = (sketchName) => `
import { ${sketchName}Vars } from "./${sketchName}";
import { P5Instance } from "types/p5";

export const get${sketchName}Sketch = (initialVars: ${sketchName}Vars) => {
  return (p: P5Instance<${sketchName}Vars>) => {
    p.variables = initialVars;

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
      if (p.variables) {
        // get variables
        const {
          FOO,
          BAR,
        } = p.variables;

        // do stuff
      }
    };
  };
};
`;

module.exports = getSketchTemplate;
