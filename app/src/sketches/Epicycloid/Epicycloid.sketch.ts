import { initialEpicycloidVars, EpicycloidVars } from "./Epicycloid.variables";
import { P5Instance } from "types/p5";

export const epicycloidSketch = (p: P5Instance<EpicycloidVars>) => {
  p.variables = initialEpicycloidVars;
  let localFactor: number;

  const drawBackground = () => {
    p.background(0);
  };

  // returns a vector for a given vertex index
  const getVector = (index: number) => {
    if (p.variables) {
      const { totalVertices, radius } = p.variables;
      const angle =
        p.map(index % totalVertices, 0, totalVertices, 0, p.TWO_PI) -
        p.TWO_PI / 2;
      const x = radius * p.cos(angle);
      const y = radius * p.sin(angle);
      return {
        x,
        y,
      };
    }
  };

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    localFactor = 0;
    p.fill(0);
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
        totalVertices,
        radius,
        factor,
        strokeWidth,
        strokeOpacity,
        isAutoplaying,
        autoplaySpeed,
        color,
      } = p.variables;

      // increment factor if autoplaying
      if (isAutoplaying) {
        if (localFactor === factor) {
          localFactor = 0;
        }
        localFactor += autoplaySpeed;
      } else {
        localFactor = factor;
      }

      // setup cycle
      drawBackground();
      p.translate(p.windowWidth / 2, p.windowHeight / 2);
      p.circle(0, 0, radius * 2);
      p.strokeWeight(strokeWidth);
      const opacity = p.map(strokeOpacity, 0, 100, 0, 255);

      // init vertices
      for (let i = 0; i < totalVertices; i++) {
        // vectors
        const startPos = getVector(i);
        const endPos = getVector(i * localFactor);

        // draw
        const opacityColor = p.color(color);
        opacityColor.setAlpha(opacity);
        p.stroke(opacityColor);
        if (startPos && endPos) {
          p.line(startPos.x, startPos.y, endPos.x, endPos.y);
        }
      }
    }
  };
};
