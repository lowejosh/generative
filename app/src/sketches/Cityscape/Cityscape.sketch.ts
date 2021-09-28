import { initialCityscapeVars, CityscapeVars } from "./Cityscape.variables";
import { checkForMismatchedSize } from "utils/misc/checkForMismatchedSize";
import { P5Instance } from "types/p5";
import { createBuilding } from "factories/Building/Building";

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
          height: 150,
          windowColor: p.color("red"),
          width: 80,
          location: p.createVector(p.windowWidth / 2, p.windowHeight - 150),
          color: p.color("#892832"),
          windowVariation: "vertical",
          sidePerspectiveRatio: 0.3,
          windowSpacing: 3,
          darkenSideAmount: 0.35,
        });
        const building2 = createBuilding({
          height: 300,
          windowColor: p.color("#FFFAAA"),
          width: 150,
          location: p.createVector(
            p.windowWidth / 2 - 260,
            p.windowHeight - 300
          ),
          color: p.color("#808080"),
        });
        building.display(p);
        building2.display(p);
        p.noLoop();

        const building3 = createBuilding({
          height: 250,
          windowColor: p.color("#F82382"),
          width: 120,
          location: p.createVector(
            p.windowWidth / 2 + 150,
            p.windowHeight - 250
          ),
          color: p.color("#482384"),
          windowVariation: "horizontal",
        });
        building.display(p);
        building2.display(p);
        building3.display(p);
        p.noLoop();

        // do stuff
      }
    };
  };
};
