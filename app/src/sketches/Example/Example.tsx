import { getExampleSketch, ExampleVariables } from "./Example.sketch";
import React, { Fragment } from "react";
import { SketchDiv } from "components/StyledUI";
import { ExampleMenu } from "./Example.menu";
import { useP5 } from "utils/hooks";

const variables: ExampleVariables = {
  POS_VARIANCE: 20,
  COLOR_VARIANCE: 20,
  ELLIPSE_RADIUS: 20,
  ELLIPSE_OPACITY: 20,
};

/**
 * Component showing an example of using live-updating p5.js variables controlled by react components
 */
export const Example = () => {
  const sketch = getExampleSketch(variables);
  const { ref, p5Instance } = useP5(sketch);

  return (
    <Fragment>
      <SketchDiv ref={ref} />
      <ExampleMenu initialVariables={variables} p5Instance={p5Instance} />
    </Fragment>
  );
};
