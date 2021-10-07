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
      const bgColor2 = SUNSET_ORANGE; // TODO move to vars
      console.log("reached");
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
    };

    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight);
      p.pixelDensity(1);
      drawBackground();
    };

    p.windowResized = () => {
      p.resizeCanvas(p.windowWidth, p.windowHeight);
      p.setup();
      p.draw(); // cause we're no looping it
    };

    p.draw = () => {
      checkForMismatchedSize(p);

      if (p.variables) {
        // get variables
        const { foo, bar } = p.variables;

        // Draw buildings
        const rowMatrix = createAllRowsOfRandomBuildings(p, 3);
        rowMatrix.flat().forEach((b) => b.display(p));

        // console.log(p.pixels);
        // for (var y = 0; y < p.height; y++) {
        //   for (var x = 0; x < p.width; x++) {
        //     var index = (x + y * p.width) * 4;
        //     p.pixels[index + 0] = p.pixels[index + 0] + p.random(-5, 20);
        //     p.pixels[index + 1] = p.pixels[index + 1] + p.random(-5, 20);
        //     p.pixels[index + 2] = p.pixels[index + 2] + p.random(-5, 20);
        //   }
        // }
        // p.updatePixels();
        // console.log(p.pixels);

        p.noLoop();
        // do stuff
      }
    };
  };
};
