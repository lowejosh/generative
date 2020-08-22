import { P5Instance, P5Defaults } from "types/p5";

export interface CardioidVariables extends P5Defaults {
  FOO: number;
  BAR: number;
}

export const getCardioidSketch = (initialVariables: CardioidVariables) => {
  return (p: P5Instance<CardioidVariables>) => {
    p.variables = initialVariables;

    // temp
    let totalPoints = 200;
    let r: number;
    let factor = 0;

    const drawBackground = () => {
      p.background(0);
    };

    const getVector = (index: number) => {
      const angle = p.map(index % totalPoints, 0, totalPoints, 0, p.TWO_PI);
      const x = r * p.cos(angle);
      const y = r * p.sin(angle);
      return {
        x,
        y,
      };
    };

    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight);
      r = p.windowWidth / 3 - 32;
      drawBackground();
    };

    p.windowResized = () => {
      p.resizeCanvas(p.windowWidth, p.windowHeight);
      drawBackground();
    };

    p.draw = () => {
      if (p.variables) {
        // get variables
        const { FOO, BAR } = p.variables;
        factor += 0.01;

        // do stuff
        p.fill(0);

        console.log(p.TWO_PI);
        p.translate(p.windowWidth / 2, p.windowHeight / 2);
        p.circle(0, 0, r * 2);
        for (let i = 0; i < totalPoints; i++) {
          // vectors
          const a = getVector(i);
          const b = getVector(i * factor);

          // colors
          p.stroke(100, 200, 200);
          p.line(a.x, a.y, b.x, b.y);
        }
      }
    };
  };
};
