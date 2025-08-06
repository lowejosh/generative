
import React, { Fragment } from "react";
import { useP5 } from "hooks";

import { SketchDiv } from "components/generic";

import { getQuantumHarmonicsSketch } from "./QuantumHarmonics.sketch";
import { QuantumHarmonicsMenu } from "./QuantumHarmonics.menu";

export const QuantumHarmonics = () => {
  const sketch = getQuantumHarmonicsSketch();
  const { ref, p5Instance } = useP5(sketch);

  return (
    <Fragment>
      <SketchDiv ref={ref} />
      <QuantumHarmonicsMenu
        p5Instance={p5Instance}
      />
    </Fragment>
  );
};

