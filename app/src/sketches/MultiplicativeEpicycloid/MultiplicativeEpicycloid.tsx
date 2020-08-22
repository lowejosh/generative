import { MultiplicativeEpicycloidMenu } from "./MultiplicativeEpicycloid.menu";
import { SketchDiv } from "components/StyledUI";
import React, { Fragment } from "react";
import { useP5 } from "hooks";
import p5 from "p5";
import { P5Defaults } from "types/p5";
import { getMultiplicativeEpicycloidSketch } from "./MultiplicativeEpicycloid.sketch";

export interface MultiplicativeEpicycloidVariables extends P5Defaults {
  TOTAL_VERTICES: number;
  RADIUS: number;
  FACTOR: number;
  AUTOPLAY_SPEED: number;
  IS_AUTOPLAYING: boolean;
}

const initialVariables: MultiplicativeEpicycloidVariables = {
  TOTAL_VERTICES: 150,
  RADIUS: 300,
  FACTOR: 2,
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
