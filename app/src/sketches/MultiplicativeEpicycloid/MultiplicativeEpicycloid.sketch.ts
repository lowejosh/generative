import { MultiplicativeEpicycloidVariables } from "./MultiplicativeEpicycloid";
import { P5Instance } from "types/p5";

export const getMultiplicativeEpicycloidSketch = (
  initialVariables: MultiplicativeEpicycloidVariables
) => {
  return (p: P5Instance<MultiplicativeEpicycloidVariables>) => {
    p.variables = initialVariables;
    let localFactor: number;

    const drawBackground = () => {
      p.background(0);
    };

    // returns a vector for a given vertex index
    const getVector = (index: number) => {
      if (p.variables) {
        const { TOTAL_VERTICES, RADIUS } = p.variables;
        const angle =
          p.map(index % TOTAL_VERTICES, 0, TOTAL_VERTICES, 0, p.TWO_PI) -
          p.TWO_PI / 2;
        const x = RADIUS * p.cos(angle);
        const y = RADIUS * p.sin(angle);
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
          TOTAL_VERTICES,
          RADIUS,
          FACTOR,
          STROKE_WIDTH,
          STROKE_OPACITY,
          IS_AUTOPLAYING,
          AUTOPLAY_SPEED,
          COLOR,
        } = p.variables;

        // increment factor if autoplaying
        if (IS_AUTOPLAYING) {
          if (localFactor === FACTOR) {
            localFactor = 0;
          }
          localFactor += AUTOPLAY_SPEED;
        } else {
          localFactor = FACTOR;
        }

        // setup cycle
        drawBackground();
        p.translate(p.windowWidth / 2, p.windowHeight / 2);
        p.circle(0, 0, RADIUS * 2);
        p.strokeWeight(STROKE_WIDTH);
        const opacity = p.map(STROKE_OPACITY, 0, 100, 0, 255);

        // init vertices
        for (let i = 0; i < TOTAL_VERTICES; i++) {
          // vectors
          const startPos = getVector(i);
          const endPos = getVector(i * localFactor);

          // draw
          const color = p.color(COLOR);
          color.setAlpha(opacity);
          p.stroke(color);
          if (startPos && endPos) {
            p.line(startPos.x, startPos.y, endPos.x, endPos.y);
          }
        }
      }
    };
  };
};
