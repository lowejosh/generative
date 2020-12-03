import { P5Defaults } from "types/p5";
import p5 from "p5";

export interface PerlinFlowVars extends P5Defaults {
  vectorPadding: number;
  angleVariation: number;
  perlinXIncrementScale: number;
  perlinYIncrementScale: number;
  perlinZIncrementScale: number;
}

export const initialPerlinFlowVars: PerlinFlowVars = {
  vectorPadding: 15,
  angleVariation: 8,
  perlinXIncrementScale: 1,
  perlinYIncrementScale: 1,
  perlinZIncrementScale: 0.4,
  refresh: (p: p5) => {
    p.setup();
    p.draw();
  },
};
