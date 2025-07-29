import { getPerlinFlowSketch } from "./PerlinFlow.sketch";
import { PerlinFlowMenu } from "./PerlinFlow.menu";
import { SketchDiv } from "components/generic";
import React, { Fragment } from "react";
import { useP5 } from "hooks";

export const PerlinFlow = () => {
  const sketch = getPerlinFlowSketch();
  const { ref, p5Instance } = useP5(sketch);

  return (
    <Fragment>
      <SketchDiv ref={ref} />
      <PerlinFlowMenu p5Instance={p5Instance} />
    </Fragment>
  );
};
