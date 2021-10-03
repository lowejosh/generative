import { createBuilding } from "factories/Building/Building";
import p5, { Color } from "p5";
import { randomlyVaryColor } from "utils/drawing/colors";
import { NIGHT_SKY } from "constants/colors";

const maxHeight = 350; // TODO move to var
const maxWidth = 200; // TODO move to var
const minHeight = 100; // TODO move to var
const minWidth = 50; // TODO move to var
const minXIncrement = 100; // TODO move to var
const maxXIncrement = 200; // TODO move to var
const fogIncrement = 0.25; // TODO move to var

// If we're gonna have animations might have to convert this to returning an array of stars and rendering them in the draw func
export const drawStars = (p: p5, starAmount: number) => {
  const maxY = p.windowHeight; // Note: maybe add a fadeout max height?
  const minY = 0;
  const minX = 0;
  const maxX = p.windowWidth;

  for (let i = 0; i < starAmount; i++) {
    const x = p.random(minX, maxX);
    const y = p.random(minY, maxY);
    const d = p.random(1, 2);

    p.fill("#FFF");
    p.circle(x, y, d);
  }
};

export const createAllRowsOfRandomBuildings = (p: p5, rowAmount: number) => {
  const matrix = [];

  for (let i = 0; i < rowAmount; i++) {
    const row = createRowOfRandomBuildings(p, i, rowAmount);
    matrix.push(row);
  }

  return matrix;
};

export const createRowOfRandomBuildings = (
  p: p5,
  rowIndex: number,
  rowAmount: number
) => {
  const row = [];
  let currentStartX = -150; // Maybe turn into a variable? will have to investigate the effects
  let isAddingBuilding = true;
  const lerpToColor = p.lerpColor(p.color("#191970"), p.color("#000"), 0.25); //TODO move to var

  while (isAddingBuilding) {
    // We calculate the colours as a interpolation between the background color and the building colour, depending on the row index
    // The lower the row index, the closer the building is to the background. Because we need to draw them first.
    const lerpColorAmount = (rowAmount - (rowIndex + 1)) * fogIncrement;
    const color = p.lerpColor(
      randomlyVaryColor(p, p.color("#808080"), 0.15),
      lerpToColor,
      lerpColorAmount
    ); // TODO move to var
    const windowColor = p.lerpColor(
      randomlyVaryColor(p, p.color("#FFAA"), 0.15),
      lerpToColor,
      lerpColorAmount
    ); // TODO move to var

    // Add the building and update the startX
    const newBuilding = createRandomBuilding(
      p,
      currentStartX,
      p.windowHeight,
      color,
      windowColor
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
  p: p5,
  startX: number,
  startY: number,
  color: Color,
  windowColor: Color
) => {
  // Randomize
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
