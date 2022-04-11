import { initialCityscapeVars, CityscapeVars } from "./Cityscape.variables";
import { checkForMismatchedSize } from "utils/misc/checkForMismatchedSize";
import { isP5InstanceInitialized, P5Instance } from "types/p5";
import { createBuilding } from "factories/Building/Building";
import { gradientRect } from "utils/drawing/gradients";
import {
  createRandomBuilding,
  createRowOfRandomBuildings,
  createAllRowsOfRandomBuildings,
  drawStars,
} from "./Cityscape.util";
import {
  NEON_BLUE,
  NEON_PINK,
  NEON_RED,
  NEON_YELLOW,
  NIGHT_SKY,
  SUNSET_ORANGE,
} from "constants/colors";

export const getCityscapeSketch = () => {
  return (p: P5Instance<CityscapeVars>) => {
    p.variables = initialCityscapeVars;

    const drawBackground = () => {
      if (isP5InstanceInitialized(p)) {
        const bgColor2 = SUNSET_ORANGE; // TODO move to vars
        const bgColor1 = NIGHT_SKY; // TODO move to vars
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
        drawStars(p, 3000);
      }
    };

    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight);
      p.pixelDensity(1);
      drawBackground();
      p.draw();
    };

    p.windowResized = () => {
      p.resizeCanvas(p.windowWidth, p.windowHeight);
      p.setup();
      p.draw(); // cause we're no looping it
    };

    p.draw = () => {
      checkForMismatchedSize(p);

      if (isP5InstanceInitialized(p)) {
        // Draw buildings
        const rowMatrix = createAllRowsOfRandomBuildings(
          p,
          p.variables.rowAmount
        );
        rowMatrix.flat().forEach((b) => b.display(p));
        p.noLoop();
      }
    };
  };
};
