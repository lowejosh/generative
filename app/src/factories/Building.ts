import p5, { Color, Vector } from "p5";

// local p5 instance to access p5 utilities and since some of the p5 constructor types are broken
const p = new p5(() => {});

export type Building = {
  windowVariation: "horizontal" | "vertical" | "tiled";
  sidePerspectiveRatio: number;
  darkenSideAmount: number;
  offLightChance: number;
  windowColor: Color;
  location: Vector;
  height: number;
  width: number;
  color: Color;
  display: (this: Building, p: p5) => void;
};

// type safed props
type Props = {
  sidePerspectiveRatio?: Building["sidePerspectiveRatio"];
  darkenSideAmount?: Building["darkenSideAmount"];
  windowVariation?: Building["windowVariation"];
  offLightChance?: Building["offLightChance"];
  windowColor?: Building["windowColor"];
  location: Building["location"];
  height: Building["height"];
  color?: Building["color"];
  width: Building["width"];
};

/**
 * TODO
 * @param params
 */
export function createBuilding({
  windowColor = p.color("#FFF"),
  sidePerspectiveRatio = 0.15,
  windowVariation = "tiled",
  darkenSideAmount = 0.25,
  color = p.color("#000"),
  offLightChance = 0.2,
  location,
  height,
  width,
}: Props): Building {
  return {
    sidePerspectiveRatio,
    darkenSideAmount,
    windowVariation,
    offLightChance,
    windowColor,
    location,
    height,
    width,
    color,
    display(p) {
      p.noStroke();

      // find the details of the actual face of the building and the side perspective
      const sidePerspectiveWidth = this.width * this.sidePerspectiveRatio;
      const faceStartX = this.location.x + sidePerspectiveWidth;
      const faceWidth = this.width - sidePerspectiveWidth;

      // side perspective
      p.fill(p.lerpColor(this.color, p.color("#000"), this.darkenSideAmount));
      p.rect(
        this.location.x,
        this.location.y,
        sidePerspectiveWidth,
        this.height
      );

      // front face
      p.fill(this.color);
      p.rect(faceStartX, this.location.y, faceWidth, this.height);

      // windows
      // export to a function
      if (windowVariation === "tiled") {
        // export to props
        const windowSize = 6;
        const windowSpacing = 8;
        const windowAmountX = Math.floor(
          (faceWidth - windowSpacing) / (windowSize + windowSpacing)
        );
        const windowAmountY = Math.floor(
          (this.height - windowSpacing) / (windowSize + windowSpacing)
        );
        const extraXPaddingToCenter =
          (faceWidth -
            windowSpacing -
            windowAmountX * (windowSize + windowSpacing)) /
          2;
        const extraYPaddingToCenter =
          (this.height -
            windowSpacing -
            windowAmountY * (windowSize + windowSpacing)) /
          2;

        Array(windowAmountY)
          .fill(null)
          .forEach((_, yi) => {
            Array(windowAmountX)
              .fill(null)
              .forEach((_, xi) => {
                const x =
                  faceStartX +
                  extraXPaddingToCenter +
                  windowSpacing +
                  xi * (windowSpacing + windowSize);
                const y =
                  this.location.y +
                  extraYPaddingToCenter +
                  windowSpacing +
                  yi * (windowSpacing + windowSize);

                if (Math.random() < this.offLightChance) {
                  p.fill(p.lerpColor(this.color, p.color("#000"), 0.2));
                } else {
                  p.fill(this.windowColor);
                }

                p.rect(x, y, windowSize, windowSize);
              });
          });
      }
    },
  };
}
