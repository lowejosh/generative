import { kaleidoscopeCausticsSketch } from "./KaleidoscopeCaustics.sketch";
import { KaleidoscopeCausticsMenu } from "./KaleidoscopeCaustics.menu";
import { SketchDiv } from "components/generic";
import React, { Fragment } from "react";
import { useP5 } from "hooks";

export const KaleidoscopeCaustics = () => {
  const { ref, p5Instance } = useP5(kaleidoscopeCausticsSketch);
  return (
    <Fragment>
      <SketchDiv ref={ref} />
      <KaleidoscopeCausticsMenu p5Instance={p5Instance} />
    </Fragment>
  );
};
