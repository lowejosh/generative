import { getCityscapeSketch } from "./Cityscape.sketch";
import { CityscapeMenu } from "./Cityscape.menu";
import { SketchDiv } from "components/generic";
import React, { Fragment } from "react";
import { useP5 } from "hooks";

export const Cityscape = () => {
  const sketch = getCityscapeSketch();
  const { ref, p5Instance } = useP5(sketch);

  return (
    <Fragment>
      <SketchDiv ref={ref} />
      <CityscapeMenu p5Instance={p5Instance} />
    </Fragment>
  );
};
