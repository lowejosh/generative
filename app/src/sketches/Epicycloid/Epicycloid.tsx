import { epicycloidSketch } from "./Epicycloid.sketch";
import { EpicycloidMenu } from "./Epicycloid.menu";
import { SketchDiv } from "components/StyledUI";
import React, { Fragment } from "react";
import { useP5 } from "hooks";

export const Epicycloid = () => {
  const { ref, p5Instance } = useP5(epicycloidSketch);

  console.log("test");
  return (
    <Fragment>
      <SketchDiv ref={ref} />
      <EpicycloidMenu p5Instance={p5Instance} />
    </Fragment>
  );
};
