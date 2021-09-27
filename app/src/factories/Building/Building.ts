import { drawTiledWindows, drawVerticalWindows } from "./Building.utils";
import p5, { Color, Vector } from "p5";

// local p5 instance to access p5 utilities and since some of the p5 constructor types are broken
const p = new p5(() => {});

export type Building = {
  windowVariation: "horizontal" | "vertical" | "tiled";
  darkenSideWindowAmount: number;
  sidePerspectiveRatio: number;
  darkenSideAmount: number;
  offLightChance: number;
  windowSpacing: number;
  windowSize: number;
  windowColor: Color;
  location: Vector;
  height: number;
  width: number;
  color: Color;
  display: (this: Building, p: p5) => void;
};

// type safed props
type Props = {
  darkenSideWindowAmount?: Building["darkenSideWindowAmount"];
  sidePerspectiveRatio?: Building["sidePerspectiveRatio"];
  darkenSideAmount?: Building["darkenSideAmount"];
  windowVariation?: Building["windowVariation"];
  offLightChance?: Building["offLightChance"];
  windowSpacing?: Building["windowSpacing"];
  windowColor?: Building["windowColor"];
  windowSize?: Building["windowSize"];
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
  darkenSideWindowAmount = 0.45,
  sidePerspectiveRatio = 0.15,
  windowVariation = "tiled",
  darkenSideAmount = 0.25,
  color = p.color("#000"),
  offLightChance = 0.25,
  windowSpacing = 5,
  windowSize = 3,
  location,
  height,
  width,
}: Props): Building {
  return {
    darkenSideWindowAmount,
    sidePerspectiveRatio,
    darkenSideAmount,
    windowSize,
    windowSpacing,
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
      const sidePerspectiveColor = p.lerpColor(
        this.color,
        p.color("#000"),
        this.darkenSideAmount
      );
      // p.stroke(sidePerspectiveColor);
      p.fill(sidePerspectiveColor);
      p.rect(
        this.location.x,
        this.location.y,
        sidePerspectiveWidth,
        this.height
      );

      // front face
      p.fill(this.color);
      p.rect(faceStartX, this.location.y, faceWidth, this.height);

      // Windows
      if (windowVariation === "tiled") {
        // Side windows
        drawTiledWindows(
          p,
          this.location.x,
          this.location.y,
          sidePerspectiveWidth,
          this.height,
          this.windowSize,
          this.windowSpacing,
          sidePerspectiveColor,
          p.lerpColor(
            this.windowColor,
            p.color("#000"),
            this.darkenSideWindowAmount
          ),
          this.offLightChance
        );

        // Face
        drawTiledWindows(
          p,
          faceStartX,
          this.location.y,
          faceWidth,
          this.height,
          this.windowSize,
          this.windowSpacing,
          this.color,
          this.windowColor,
          this.offLightChance
        );
      } else if (windowVariation === "vertical") {
        // Side windows
        drawVerticalWindows(
          p,
          this.location.x,
          this.location.y,
          sidePerspectiveWidth,
          this.height,
          this.windowSize,
          this.windowSpacing,
          sidePerspectiveColor,
          p.lerpColor(
            this.windowColor,
            p.color("#000"),
            this.darkenSideWindowAmount
          ),
          this.offLightChance
        );

        // Face
        drawVerticalWindows(
          p,
          faceStartX,
          this.location.y,
          faceWidth,
          this.height,
          this.windowSize,
          this.windowSpacing,
          this.color,
          this.windowColor,
          this.offLightChance
        );
      } else {
      }
    },
  };
}
