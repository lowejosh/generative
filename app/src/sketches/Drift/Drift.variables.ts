
import { P5Defaults } from "types/p5";
import p5 from "p5";

export interface DriftVars extends P5Defaults {
  foo: number;
  bar: number;
}

export const initialDriftVars: DriftVars = {
  foo: 0,
  bar: 0,
  refresh: (p: p5) => {
    p.setup();
  },
};
