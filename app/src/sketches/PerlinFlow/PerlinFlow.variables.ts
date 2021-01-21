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
  particleSize: number;
  clearScreen: boolean;
  drawTrails: boolean;
  trailLength: number;
  particleAmount: number;
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
  particleAmount: 500,
  vectorPadding: 15,
  clearScreen: true,
  drawTrails: true,
  particleSize: 1,
  trailLength: 3,
  maxVelocity: 5,
  refresh: (p: p5) => {
    p.setup();
    p.draw();
  },
};
