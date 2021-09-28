import p5, { Color } from "p5";
import { Building } from "./Building";

export const drawWindows = (
  p: p5,
  variant: Building["windowVariation"],
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
  const isSpacingX = variant !== "horizontal";
  const isSpacingY = variant !== "vertical";

  const windowAmountX = Math.floor(
    (width - windowSpacing * (isSpacingX ? 1 : 2)) /
      (windowSize + (isSpacingX ? windowSpacing : 0))
  );
  const windowAmountY = Math.floor(
    (height - windowSpacing * (isSpacingY ? 1 : 2)) /
      (windowSize + (isSpacingY ? windowSpacing : 0))
  );

  const extraXPaddingToCenter =
    (width -
      windowSpacing * (isSpacingX ? 1 : 2) -
      windowAmountX * (windowSize + (isSpacingX ? windowSpacing : 0))) /
    2;
  const extraYPaddingToCenter =
    (height -
      windowSpacing * (isSpacingY ? 1 : 2) -
      windowAmountY * (windowSize + (isSpacingY ? windowSpacing : 0))) /
    2;

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
            xi * (windowSize + (isSpacingX ? windowSpacing : 0));
          const y =
            yStart +
            extraYPaddingToCenter +
            windowSpacing +
            yi * (windowSize + (isSpacingY ? windowSpacing : 0));

          if (Math.random() < offLightChance) {
            p.fill(p.lerpColor(buildingColor, p.color("#000"), 0.2));
          } else {
            p.fill(windowColor);
          }

          p.rect(x, y, windowSize, windowSize);
        });
    });
};
