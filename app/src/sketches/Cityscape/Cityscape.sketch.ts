import { initialCityscapeVars, CityscapeVars } from "./Cityscape.variables";
import { checkForMismatchedSize } from "utils/misc/checkForMismatchedSize";
import { P5Instance } from "types/p5";
import { createBuilding } from "factories/Building/Building";
import { gradientRect } from "utils/drawing/gradients";
import {
  createRandomBuilding,
  createRowOfRandomBuildings,
  createAllRowsOfRandomBuildings,
  drawStars,
} from "./Cityscape.util";
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

        // Draw background
        const bgColor1 = "#000"; // TODO move to vars
        const bgColor2 = "#191970"; // TODO move to vars
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

        // Draw stars
        drawStars(p, 1000);

        // Draw buildings
        const rowMatrix = createAllRowsOfRandomBuildings(p, 5);
        rowMatrix.flat().forEach((b) => b.display(p));

        p.noLoop();
        // do stuff
      }
    };
  };
};
