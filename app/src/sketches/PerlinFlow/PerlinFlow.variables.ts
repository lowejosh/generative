import { NEON_BLUE } from "constants/colors";
import { P5Defaults } from "types/p5";
import p5 from "p5";

export interface PerlinFlowVars extends P5Defaults {
  perlinXIncrementScale: number;
  perlinYIncrementScale: number;
  perlinZIncrementScale: number;
  viewForceVectors: boolean;
  particleOpacity: number;
  angleVariation: number;
  vectorPadding: number;
  particleColor: string;
  clearScreen: boolean;
  maxVelocity: number;
  bgColor: string;
}

export const initialPerlinFlowVars: PerlinFlowVars = {
  perlinZIncrementScale: 0.4,
  perlinXIncrementScale: 1,
  perlinYIncrementScale: 1,
  particleColor: NEON_BLUE,
  viewForceVectors: false,
  particleOpacity: 25,
  bgColor: "#000000",
  angleVariation: 20,
  vectorPadding: 15,
  clearScreen: true,
  maxVelocity: 5,
  refresh: (p: p5) => {
    p.setup();
    p.draw();
  },
};
