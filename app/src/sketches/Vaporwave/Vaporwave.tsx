
import { getVaporwaveSketch } from "./Vaporwave.sketch";
import { VaporwaveMenu } from "./Vaporwave.menu";
import { SketchDiv } from "components/StyledUI";
import React, { Fragment } from "react";
import { useP5 } from "hooks";

export const Vaporwave = () => {
  const sketch = getVaporwaveSketch();
  const { ref, p5Instance } = useP5(sketch);

  return (
    <Fragment>
      <SketchDiv ref={ref} />
      <VaporwaveMenu
        p5Instance={p5Instance}
      />
    </Fragment>
  );
};

