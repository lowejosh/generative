const getSketchTemplate = (sketchName) => `
import { P5Instance, P5Defaults } from "types/p5";

export interface ${sketchName}Variables extends P5Defaults {
  FOO: number;
  BAR: number;
}

export const get${sketchName}Sketch = (initialVariables: ${sketchName}Variables) => {
  return (p: P5Instance<${sketchName}Variables>) => {
    p.variables = initialVariables;

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
