import { createBuilding } from "factories/Building/Building";
import { randomlyVaryColor } from "utils/drawing/colors";
import { P5InstanceInitialized } from "types/p5";

import { CityscapeVars } from "./Cityscape.variables";

// If we're gonna have animations might have to convert this to returning an array of stars and rendering them in the draw func
export const drawStars = (
  p: P5InstanceInitialized<CityscapeVars>,
  starAmount: number
) => {
  const { starColor, minStarSize, maxStarSize } = p.variables;

  const maxY = p.windowHeight; // Note: maybe add a fadeout max height?
  const minY = 0;
  const minX = 0;
  const maxX = p.windowWidth;
  const color = p.color(starColor);

  for (let i = 0; i < starAmount; i++) {
    const x = p.random(minX, maxX);
    const y = p.random(minY, maxY);
    const d = p.random(minStarSize, maxStarSize);

    color.setAlpha(p.random(200, 255));
    p.fill(color);
    p.circle(x, y, d);
  }
};

export const createAllRowsOfRandomBuildings = (
  p: P5InstanceInitialized<CityscapeVars>,
  rowAmount: number
) => {
  const matrix = [];

  for (let i = 0; i < rowAmount; i++) {
    const row = createRowOfRandomBuildings(p, i, rowAmount);
    matrix.push(row);
  }

  return matrix;
};

export const createRowOfRandomBuildings = (
  p: P5InstanceInitialized<CityscapeVars>,
  rowIndex: number,
  rowAmount: number
): import("d:/projects/generative/app/src/factories/Building/Building").Building[] => {
  const { maxXIncrement } = p.variables;
  const row = [];
  let currentStartX = -150; // Maybe turn into a variable? will have to investigate the effects
  let isAddingBuilding = true;

  while (isAddingBuilding) {
    // Add the building and update the startX
    const newBuilding = createRandomBuilding(
      p,
      currentStartX,
      p.windowHeight,
      rowIndex,
      rowAmount
    );
    row.push(newBuilding);
    currentStartX = newBuilding.location.x + newBuilding.width;

    // Check if we're done with the row
    if (currentStartX + maxXIncrement > p.windowWidth) {
      isAddingBuilding = false;
    }
  }

  return row;
};

export const createRandomBuilding = (
  p: P5InstanceInitialized<CityscapeVars>,
  startX: number,
  startY: number,
  rowIndex: number,
  rowAmount: number
) => {
  const {
    increaseMaxHeightAmount,
    bottomSkyColor,
    minXIncrement,
    maxXIncrement,
    colorVariance,
    buildingColor,
    fogIncrement,
    windowColor,
    maxHeight,
    minHeight,
    minWidth,
    maxWidth,
  } = p.variables;

  // Randomize
  const newMaxHeight =
    maxHeight + (rowAmount - (rowIndex + 1)) * increaseMaxHeightAmount; // Increase the max height of distant buildings if we can
  const height = p.random(minHeight, newMaxHeight);
  const width = p.random(minWidth, maxWidth);
  const xIncrement = p.random(minXIncrement, maxXIncrement);
  const windowVariation = p.random(["tiled", "horizontal", "vertical"]);
  const lerpToColor = p.lerpColor(
    p.color(bottomSkyColor),
    p.color("#000"),
    0.5
  );

  // We calculate the colours as a interpolation between the background color and the building colour, depending on the row index
  // The lower the row index, the closer the building is to the background. Because we need to draw them first.
  const lerpColorAmount = (rowAmount - (rowIndex + 1)) * fogIncrement;
  const color = p.lerpColor(
    randomlyVaryColor(p, p.color(buildingColor), colorVariance),
    lerpToColor,
    lerpColorAmount
  );
  const variedWindowColor = p.lerpColor(
    randomlyVaryColor(p, p.color(windowColor), colorVariance),
    lerpToColor,
    lerpColorAmount / 1.5
  );

  // Finalise
  const x = startX + xIncrement;
  const y = startY - height;
  const location = p.createVector(x, y);

  const building = createBuilding({
    windowColor: variedWindowColor,
    windowVariation,
    location,
    height,
    width,
    color,
  });

  return building;
};
