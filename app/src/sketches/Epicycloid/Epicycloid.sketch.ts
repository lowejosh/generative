import { initialEpicycloidVars, EpicycloidVars } from "./Epicycloid.variables";
import { P5Instance } from "types/p5";
import { smoothTransitionTo } from "sketches/sketch-utils/values";

export const epicycloidSketch = (p: P5Instance<EpicycloidVars>) => {
  // sketch scoped vars
  p.variables = initialEpicycloidVars;
  let smoothFactor = 0;
  let smoothRadius = 0;
  let smoothTotalVertices = 0;

  const drawBackground = () => {
    p.background(0);
  };

  // returns a vector for a given vertex index
  const getVector = (index: number) => {
    if (p.variables) {
      const angle =
        p.map(
          index % smoothTotalVertices,
          0,
          smoothTotalVertices,
          0,
          p.TWO_PI
        ) -
        p.TWO_PI / 2;
      const x = smoothRadius * p.cos(angle);
      const y = smoothRadius * p.sin(angle);
      return {
        x,
        y,
      };
    }
  };

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    smoothFactor = 0;
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

      // smoothing values
      smoothRadius = smoothTransitionTo(smoothRadius, radius);
      smoothTotalVertices = smoothTransitionTo(
        smoothTotalVertices,
        totalVertices
      );

      // increment factor if autoplaying
      if (isAutoplaying) {
        if (smoothFactor === factor) {
          smoothFactor = 0;
        }
        smoothFactor += autoplaySpeed;
      } else {
        smoothFactor = smoothTransitionTo(smoothFactor, factor);
      }

      // setup cycle
      drawBackground();
      p.translate(p.windowWidth / 2, p.windowHeight / 2);
      p.circle(0, 0, smoothRadius * 2);
      p.strokeWeight(strokeWidth);
      const opacity = p.map(strokeOpacity, 0, 100, 0, 255);

      // init vertices
      for (let i = 0; i < smoothTotalVertices; i++) {
        // vectors
        const startPos = getVector(i);
        const endPos = getVector(i * smoothFactor);

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
