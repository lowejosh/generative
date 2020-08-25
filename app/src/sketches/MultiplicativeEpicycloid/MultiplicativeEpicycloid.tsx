import { getMultiplicativeEpicycloidSketch } from "./MultiplicativeEpicycloid.sketch";
import { MultiplicativeEpicycloidMenu } from "./MultiplicativeEpicycloid.menu";
import { SketchDiv } from "components/StyledUI";
import React, { Fragment } from "react";
import { P5Defaults } from "types/p5";
import { useP5 } from "hooks";
import p5 from "p5";

export interface MultiplicativeEpicycloidVariables extends P5Defaults {
  IS_AUTOPLAYING: boolean;
  TOTAL_VERTICES: number;
  STROKE_OPACITY: number;
  AUTOPLAY_SPEED: number;
  STROKE_WIDTH: number;
  RADIUS: number;
  FACTOR: number;
  COLOR: string;
}

const initialVariables: MultiplicativeEpicycloidVariables = {
  IS_AUTOPLAYING: false,
  TOTAL_VERTICES: 150,
  STROKE_OPACITY: 70,
  AUTOPLAY_SPEED: 0.01,
  STROKE_WIDTH: 1,
  RADIUS: 300,
  COLOR: "#FFFFFF",
  FACTOR: 2,
  refresh: (p: p5) => {
    p.setup();
  },
};

export const MultiplicativeEpicycloid = () => {
  const sketch = getMultiplicativeEpicycloidSketch(initialVariables);
  const { ref, p5Instance } = useP5(sketch);

  return (
    <Fragment>
      <SketchDiv ref={ref} />
      <MultiplicativeEpicycloidMenu
        initialVariables={initialVariables}
        p5Instance={p5Instance}
      />
    </Fragment>
  );
};
