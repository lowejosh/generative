
import { getPerlinFieldSketch } from "./PerlinField.sketch";
import { PerlinFieldMenu } from "./PerlinField.menu";
import { SketchDiv } from "components/StyledUI";
import React, { Fragment } from "react";
import { useP5 } from "hooks";

export const PerlinField = () => {
  const sketch = getPerlinFieldSketch();
  const { ref, p5Instance } = useP5(sketch);

  return (
    <Fragment>
      <SketchDiv ref={ref} />
      <PerlinFieldMenu
        p5Instance={p5Instance}
      />
    </Fragment>
  );
};

