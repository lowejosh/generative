import { getMultiplicativeEpicycloidSketch } from "./MultiplicativeEpicycloid.sketch";
import { MultiplicativeEpicycloidMenu } from "./MultiplicativeEpicycloid.menu";
import { SketchDiv } from "components/StyledUI";
import React, { Fragment } from "react";
import { P5Defaults } from "types/p5";
import { useP5 } from "hooks";
import p5 from "p5";

export interface MultiplicativeEpicycloidVariables extends P5Defaults {
  TOTAL_VERTICES: number;
  RADIUS: number;
  FACTOR: number;
  STROKE_WIDTH: number;
  STROKE_OPACITY: number;
  AUTOPLAY_SPEED: number;
  IS_AUTOPLAYING: boolean;
}

const initialVariables: MultiplicativeEpicycloidVariables = {
  TOTAL_VERTICES: 150,
  RADIUS: 300,
  FACTOR: 2,
  STROKE_WIDTH: 1,
  STROKE_OPACITY: 70,
  AUTOPLAY_SPEED: 0.01,
  IS_AUTOPLAYING: false,
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
