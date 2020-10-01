import {
  initialPerlinFieldVars,
  PerlinFieldVars,
} from "./PerlinField.variables";
import { P5Instance } from "types/p5";
import { NotListedLocationSharp } from "@material-ui/icons";

export const getPerlinFieldSketch = () => {
  return (p: P5Instance<PerlinFieldVars>) => {
    p.variables = initialPerlinFieldVars;
    const vectorPadding = 15;
    let initOffset = p.random(0, 1000000);

    const drawBackground = () => {
      p.background(0);
    };

    p.setup = () => {
      p.colorMode(p.HSB);
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
        // const {
        //   foo,
        //   bar,
        // } = p.variables;
        drawBackground();

        let xOff = initOffset;
        let yOff = initOffset;
        let offsetIncrement = 0.001;

        for (let x = vectorPadding / 3; x < p.width; x += vectorPadding) {
          for (let y = vectorPadding / 3; y < p.height; y += vectorPadding) {
            // use trig to find vector
            const angle = p.map(p.noise(xOff, yOff), 0, 1, 0, 360);
            const x2 = x + p.sin(angle) * vectorPadding;
            const y2 = y + p.cos(angle) * vectorPadding;
            const hue = p.map(angle, 0, 360, 0, 255);

            p.stroke(hue, 255, 255);
            p.line(x, y, x2, y2);
            p.point(x, y);

            yOff += offsetIncrement;
          }
          yOff = initOffset;
          xOff += offsetIncrement;
        }

        initOffset += 0.0005;

        // p.noLoop();
      }
    };
  };
};
