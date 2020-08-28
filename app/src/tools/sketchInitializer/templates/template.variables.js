const getVariablesTemplate = (sketchName) => `
import { P5Defaults } from "types/p5";
import p5 from "p5";

export interface ${sketchName}Vars extends P5Defaults {
  foo: number;
  bar: number;
}

export const initial${sketchName}Vars: ${sketchName}Vars = {
  foo: 0,
  bar: 0,
  refresh: (p: p5) => {
    p.setup();
  },
};
`;
module.exports = getVariablesTemplate;
