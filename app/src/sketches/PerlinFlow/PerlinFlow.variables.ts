import { NEON_BLUE } from "constants/colors";
import { P5Defaults } from "types/p5";
import p5 from "p5";

export interface PerlinFlowVars extends P5Defaults {
  perlinXIncrementScale: number;
  perlinYIncrementScale: number;
  perlinZIncrementScale: number;
  viewForceVectors: boolean;
  angleVariation: number;
  vectorPadding: number;
  particleColor: string;
  clearScreen: boolean;
  bgColor: string;
}

export const initialPerlinFlowVars: PerlinFlowVars = {
  perlinZIncrementScale: 0.4,
  perlinXIncrementScale: 1,
  perlinYIncrementScale: 1,
  particleColor: NEON_BLUE,
  viewForceVectors: false,
  bgColor: "#000000",
  vectorPadding: 15,
  angleVariation: 8,
  clearScreen: true,
  refresh: (p: p5) => {
    p.setup();
    p.draw();
  },
};
