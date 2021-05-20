import { PresetData } from "components/menu/IconMenu/Presets/Presets.types";
import { NEON_BLUE, NEON_PINK } from "constants/colors";
import { P5Defaults } from "types/p5";
import p5 from "p5";

export interface PerlinFlowVars extends P5Defaults {
  perlinXIncrementScale: number;
  perlinYIncrementScale: number;
  perlinZIncrementScale: number;
  swapSidesAtBorder: boolean;
  viewForceVectors: boolean;
  particleOpacity: number;
  angleVariation: number;
  particleAmount: number;
  vectorPadding: number;
  particleColor: string;
  avoidBorders: boolean;
  randomColor: boolean;
  particleSize: number;
  clearScreen: boolean;
  drawTrails: boolean;
  trailLength: number;
  maxVelocity: number;
  bgColor: string;
  mass: number;
}

/* -------------------------------------------------------------------------- */
/*                                  DEFAULTS                                  */
/* -------------------------------------------------------------------------- */
export const initialPerlinFlowVars: PerlinFlowVars = {
  perlinZIncrementScale: 0.4,
  perlinXIncrementScale: 1,
  perlinYIncrementScale: 1,
  particleColor: NEON_BLUE,
  swapSidesAtBorder: true,
  viewForceVectors: false,
  particleOpacity: 25,
  particleAmount: 500,
  randomColor: false,
  avoidBorders: true,
  bgColor: "#000000",
  angleVariation: 20,
  vectorPadding: 15,
  clearScreen: true,
  drawTrails: true,
  particleSize: 1,
  trailLength: 3,
  maxVelocity: 5,
  mass: 2,
  refresh: (p: p5) => {
    p.setup();
    p.draw();
  },
};

/* -------------------------------------------------------------------------- */
/*                                   PRESETS                                  */
/* -------------------------------------------------------------------------- */
const classicalPerlinFlow: PerlinFlowVars = {
  ...initialPerlinFlowVars,
  ...{
    swapSidesAtBorder: false,
    perlinZIncrementScale: 0,
    particleColor: "#000000",
    particleOpacity: 1.5,
    particleAmount: 5000,
    vectorPadding: 25,
    avoidBorders: false,
    clearScreen: false,
    bgColor: "#FFFFFF",
    drawTrails: false,
    angleVariation: 5,
    particleSize: 1,
    trailLength: 0,
    maxVelocity: 2,
    mass: 5,
  },
};

const plasma: PerlinFlowVars = {
  ...initialPerlinFlowVars,
  ...{
    swapSidesAtBorder: false,
    perlinZIncrementScale: 5,
    particleColor: NEON_PINK,
    particleOpacity: 1.5,
    particleAmount: 1500,
    avoidBorders: true,
    clearScreen: false,
    bgColor: "#000000",
    angleVariation: 25,
    vectorPadding: 25,
    drawTrails: false,
    particleSize: 1,
    trailLength: 0,
    maxVelocity: 3,
    mass: 25,
  },
};

export const perlinFlowPresets: PresetData<PerlinFlowVars> = [
  {
    name: "Classical Flow",
    vars: classicalPerlinFlow,
  },
  {
    name: "Plasma",
    vars: plasma,
  },
];
