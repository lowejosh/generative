const getComponentTemplate = (sketchName) => `import React, { Fragment } from "react";
import { useP5 } from "hooks";

import { SketchDiv } from "components/generic";

import { get${sketchName}Sketch } from "./${sketchName}.sketch";
import { ${sketchName}Menu } from "./${sketchName}.menu";

export const ${sketchName} = () => {
  const sketch = get${sketchName}Sketch();
  const { ref, p5Instance } = useP5(sketch);

  return (
    <Fragment>
      <SketchDiv ref={ref} />
      <${sketchName}Menu p5Instance={p5Instance} />
    </Fragment>
  );
};
`;

module.exports = getComponentTemplate;
