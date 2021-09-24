import { initialCityscapeVars, CityscapeVars } from "./Cityscape.variables";
import { checkForMismatchedSize } from "utils/misc/checkForMismatchedSize";
import { P5Instance } from "types/p5";
import { createBuilding } from "factories/Building";

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

        const building = createBuilding({
          height: 300,
          windowColor: p.color("#ABD"),
          width: 100,
          location: p.createVector(p.windowWidth / 2, p.windowHeight / 2),
          color: p.color("#892832"),
        });
        building.display(p);
        p.noLoop();

        // do stuff
      }
    };
  };
};