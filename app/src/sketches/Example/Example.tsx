import { getExampleSketch, ExampleVariables } from "./Example.sketch";
import { SketchDiv } from "components/StyledUI";
import { ExampleMenu } from "./Example.menu";
import React, { Fragment } from "react";
import { useP5 } from "hooks";
import p5 from "p5";

const initialVariables: ExampleVariables = {
  POS_VARIANCE: 20,
  COLOR_VARIANCE: 20,
  ELLIPSE_RADIUS: 40,
  ELLIPSE_OPACITY: 80,
  refresh: (p: p5) => {
    p.setup();
  },
};

/**
 * Component showing an example of using live-updating p5.js initialVariables controlled by react components
 */
export const Example = () => {
  const sketch = getExampleSketch(initialVariables);
  const { ref, p5Instance } = useP5(sketch);

  return (
    <Fragment>
      <SketchDiv ref={ref} />
      <ExampleMenu
        initialVariables={initialVariables}
        p5Instance={p5Instance}
      />
    </Fragment>
  );
};
