import p5, { Color } from "p5";

export const drawTiledWindows = (
  p: p5,
  xStart: number,
  yStart: number,
  width: number,
  height: number,
  windowSize: number,
  windowSpacing: number,
  buildingColor: Color,
  windowColor: Color,
  offLightChance: number
) => {
  const windowAmountX = Math.floor(
    (width - windowSpacing) / (windowSize + windowSpacing)
  );
  const windowAmountY = Math.floor(
    (height - windowSpacing) / (windowSize + windowSpacing)
  );
  const extraXPaddingToCenter =
    (width - windowSpacing - windowAmountX * (windowSize + windowSpacing)) / 2;
  const extraYPaddingToCenter =
    (height - windowSpacing - windowAmountY * (windowSize + windowSpacing)) / 2;

  Array(windowAmountY)
    .fill(null)
    .forEach((_, yi) => {
      Array(windowAmountX)
        .fill(null)
        .forEach((_, xi) => {
          const x =
            xStart +
            extraXPaddingToCenter +
            windowSpacing +
            xi * (windowSpacing + windowSize);
          const y =
            yStart +
            extraYPaddingToCenter +
            windowSpacing +
            yi * (windowSpacing + windowSize);

          if (Math.random() < offLightChance) {
            p.fill(p.lerpColor(buildingColor, p.color("#000"), 0.2));
          } else {
            p.fill(windowColor);
          }

          p.rect(x, y, windowSize, windowSize);
        });
    });
};

export const drawVerticalWindows = (
  p: p5,
  xStart: number,
  yStart: number,
  width: number,
  height: number,
  windowSize: number,
  windowSpacing: number,
  buildingColor: Color,
  windowColor: Color,
  offLightChance: number
) => {
  const windowAmountX = Math.floor(
    (width - windowSpacing) / (windowSize + windowSpacing)
  );
  const windowAmountY = Math.floor((height - windowSpacing * 2) / windowSize);
  const extraXPaddingToCenter =
    (width - windowSpacing - windowAmountX * (windowSize + windowSpacing)) / 2;
  const extraYPaddingToCenter =
    (height - windowSpacing * 2 - windowAmountY * windowSize) / 2;

  Array(windowAmountY)
    .fill(null)
    .forEach((_, yi) => {
      Array(windowAmountX)
        .fill(null)
        .forEach((_, xi) => {
          const x =
            xStart +
            extraXPaddingToCenter +
            windowSpacing +
            xi * (windowSpacing + windowSize);
          const y =
            yStart + extraYPaddingToCenter + windowSpacing + yi * windowSize;

          if (Math.random() < offLightChance) {
            p.fill(p.lerpColor(buildingColor, p.color("#000"), 0.2));
          } else {
            p.fill(windowColor);
          }

          p.rect(x, y, windowSize, windowSize);
        });
    });
};
