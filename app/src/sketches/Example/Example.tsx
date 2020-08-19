import { getExampleSketch, ExampleVariables } from "./Example.sketch";
import React, { Fragment, useState } from "react";
import { SketchDiv } from "components/StyledUI";
import { ExampleMenu } from "./Example.menu";
import { useP5 } from "utils/hooks";

const variables: ExampleVariables = {
  POS_VARIANCE: 20,
  COLOR_VARIANCE: 20,
  ELLIPSE_RADIUS: 20,
  ELLIPSE_OPACITY: 20,
};

export const Example = () => {
  const [posVariance, setPosVariance] = useState(20);
  const [colorVariance, setColorVariance] = useState(60);
  const [radius, setRadius] = useState(30);
  const [opacity, setOpacity] = useState(60);

  const sketch = getExampleSketch(variables);
  const { ref, p5Instance } = useP5(sketch);

  return (
    <Fragment>
      <SketchDiv ref={ref} />
      <ExampleMenu initialVariables={variables} p5Instance={p5Instance} />
    </Fragment>
  );
};
