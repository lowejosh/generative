import { initialCityscapeVars, CityscapeVars } from "./Cityscape.variables";
import { checkForMismatchedSize } from "utils/misc/checkForMismatchedSize";
import { P5Instance } from "types/p5";
import { createBuilding } from "factories/Building/Building";
import { gradientRect } from "utils/drawing/gradients";
import { createRandomBuilding } from "./Cityscape.util";
import { NIGHT_SKY } from "constants/colors";

export const getCityscapeSketch = () => {
  return (p: P5Instance<CityscapeVars>) => {
    p.variables = initialCityscapeVars;

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
        const { foo, bar } = p.variables;
        const bgColor1 = NIGHT_SKY;
        const bgColor2 = "#191970";
        gradientRect(
          p,
          0,
          0,
          p.windowWidth,
          p.windowHeight,
          p.color(bgColor1),
          p.color(bgColor2),
          "y"
        );

        const building = createRandomBuilding(p, 0, p.windowHeight);
        building.display(p);

        const building2 = createRandomBuilding(p, 200, p.windowHeight);
        building2.display(p);
        const building3 = createRandomBuilding(p, 400, p.windowHeight);
        building3.display(p);

        p.noLoop();
        // do stuff
      }
    };
  };
};
