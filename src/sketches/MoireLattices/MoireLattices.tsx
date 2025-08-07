import { moireLatticesSketch } from "./MoireLattices.sketch";
import { MoireLatticesMenu } from "./MoireLattices.menu";
import { SketchDiv } from "components/generic";
import React, { Fragment } from "react";
import { useP5 } from "hooks";

export const MoireLattices = () => {
  const { ref, p5Instance } = useP5(moireLatticesSketch);

  return (
    <Fragment>
      <SketchDiv ref={ref} />
      <MoireLatticesMenu p5Instance={p5Instance} />
    </Fragment>
  );
};
