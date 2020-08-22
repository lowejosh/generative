const getComponentTemplate = (sketchName) => `
import { get${sketchName}Sketch } from "./${sketchName}.sketch";
import { ${sketchName}Menu } from "./${sketchName}.menu";
import { SketchDiv } from "components/StyledUI";
import React, { Fragment } from "react";
import { useP5 } from "hooks";
import p5 from "p5";

export interface ${sketchName}Variables extends P5Defaults {
  FOO: number;
  BAR: number;
}

const initialVariables: ${sketchName}Variables = {
  FOO: 0,
  BAR: 0,
  refresh: (p: p5) => {
    p.setup();
  },
};

export const ${sketchName} = () => {
  const sketch = get${sketchName}Sketch(initialVariables);
  const { ref, p5Instance } = useP5(sketch);

  return (
    <Fragment>
      <SketchDiv ref={ref} />
      <${sketchName}Menu
        initialVariables={initialVariables}
        p5Instance={p5Instance}
      />
    </Fragment>
  );
};

`;

module.exports = getComponentTemplate;
