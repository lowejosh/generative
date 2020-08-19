import { getExampleSketch, ExampleConstants } from "./Example.sketch";
import { Sketch } from "components/Sketch";
import React, { useMemo, Fragment } from "react";
import { Menu } from "components/Menu";

export const Example = () => {
  const constants: ExampleConstants = useMemo(
    () => ({
      POS_VARIANCE: 20,
      COLOR_VARIANCE: 60,
      ELLIPSE_RADIUS: 50,
      ELLIPSE_OPACITY: 60,
    }),
    []
  );

  // const sketch = useMemo(
  //   () => <Sketch sketch={getExampleSketch(constants)} />,
  //   [constants]
  // );

  return (
    <Fragment>
      <Sketch sketch={getExampleSketch(constants)} />
    </Fragment>
  );
};
