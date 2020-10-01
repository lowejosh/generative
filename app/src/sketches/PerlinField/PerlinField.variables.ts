import { P5Defaults } from "types/p5";
import p5 from "p5";

export interface PerlinFieldVars extends P5Defaults {
  vectorPadding: number;
  angleVariation: number;
  perlinXIncrementScale: number;
  perlinYIncrementScale: number;
  perlinZIncrementScale: number;
}

export const initialPerlinFieldVars: PerlinFieldVars = {
  vectorPadding: 20,
  angleVariation: 5,
  perlinXIncrementScale: 1,
  perlinYIncrementScale: 1,
  perlinZIncrementScale: 1,
  refresh: (p: p5) => {
    p.setup();
  },
};
