import { NEON_BLUE, NEON_PINK } from "constants/colors";
import { createBuilding } from "factories/Building/Building";
import p5 from "p5";
import { randomlyVaryColor } from "utils/drawing/colors";

export const createRandomBuilding = (p: p5, startX: number, startY: number) => {
  const maxHeight = 400; // TODO move to var
  const maxWidth = 200; // TODO move to var
  const minHeight = 100; // TODO move to var
  const minWidth = 50; // TODO move to var
  const minXIncrement = 30; // TODO move to var
  const maxXIncrement = 200; // TODO move to var

  // Randomize
  const color = randomlyVaryColor(p, p.color(NEON_PINK)); // TODO move to var
  const windowColor = randomlyVaryColor(p, p.color(NEON_BLUE)); // TODO move to var
  const height = p.random(minHeight, maxHeight);
  const width = p.random(minWidth, maxWidth);
  const xIncrement = p.random(minXIncrement, maxXIncrement);
  const windowVariation = p.random(["tiled", "horizontal", "vertical"]);

  // Finalise
  const x = startX + xIncrement;
  const y = startY - height;
  const location = p.createVector(x, y);

  const building = createBuilding({
    height,
    width,
    location,
    color,
    windowColor,
    windowVariation,
  });

  return building;
};
