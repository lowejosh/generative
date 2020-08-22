
import { getCardioidSketch, CardioidVariables } from "./Cardioid.sketch";
import { CardioidMenu } from "./Cardioid.menu";
import { SketchDiv } from "components/StyledUI";
import React, { Fragment } from "react";
import { useP5 } from "hooks";
import p5 from "p5";

const initialVariables: CardioidVariables = {
  FOO: 0,
  BAR: 0,
  refresh: (p: p5) => {
    p.setup();
  },
};

export const Cardioid = () => {
  const sketch = getCardioidSketch(initialVariables);
  const { ref, p5Instance } = useP5(sketch);

  return (
    <Fragment>
      <SketchDiv ref={ref} />
      <CardioidMenu
        initialVariables={initialVariables}
        p5Instance={p5Instance}
      />
    </Fragment>
  );
};

