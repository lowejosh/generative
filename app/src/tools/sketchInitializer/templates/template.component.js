const getComponentTemplate = (sketchName) => `
import { get${sketchName}Sketch } from "./${sketchName}.sketch";
import { ${sketchName}Menu } from "./${sketchName}.menu";
import { SketchDiv } from "components/StyledUI";
import React, { Fragment } from "react";
import { useP5 } from "hooks";
import p5 from "p5";

export interface ${sketchName}Vars extends P5Defaults {
  FOO: number;
  BAR: number;
}

const initialVars: ${sketchName}Vars = {
  FOO: 0,
  BAR: 0,
  refresh: (p: p5) => {
    p.setup();
  },
};

export const ${sketchName} = () => {
  const sketch = get${sketchName}Sketch(initialVars);
  const { ref, p5Instance } = useP5(sketch);

  return (
    <Fragment>
      <SketchDiv ref={ref} />
      <${sketchName}Menu
        initialVars={initialVars}
        p5Instance={p5Instance}
      />
    </Fragment>
  );
};

`;

module.exports = getComponentTemplate;
