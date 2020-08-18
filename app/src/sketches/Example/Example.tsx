import { getExampleSketch, ExampleConstants } from "./Example.sketch";
import { Sketch } from "components/Sketch";
import React from "react";

export const Example = () => {
  const constants: ExampleConstants = {
    POS_VARIANCE: 50,
    COLOR_VARIANCE: 20,
    ELLIPSE_RADIUS: 20,
    ELLIPSE_OPACITY: 20,
  };

  return <Sketch sketch={getExampleSketch(constants)} />;
};
