import { createAllRowsOfRandomBuildings, drawStars } from "./Cityscape.util";
import { initialCityscapeVars, CityscapeVars } from "./Cityscape.variables";
import { checkForMismatchedSize } from "utils/misc/checkForMismatchedSize";
import { isP5InstanceInitialized, P5Instance } from "types/p5";
import { gradientRect } from "utils/drawing/gradients";

export const getCityscapeSketch = () => {
  return (p: P5Instance<CityscapeVars>) => {
    p.variables = initialCityscapeVars;

    const drawBackground = () => {
      if (isP5InstanceInitialized(p)) {
        const { topSkyColor, bottomSkyColor, starAmount } = p.variables;

        gradientRect(
          p,
          0,
          0,
          p.windowWidth,
          p.windowHeight,
          p.color(topSkyColor),
          p.color(bottomSkyColor),
          "y"
        );
        // Draw stars
        drawStars(p, starAmount);
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
