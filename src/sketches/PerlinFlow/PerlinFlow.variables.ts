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
  fillTrails: boolean;
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
  swapSidesAtBorder: false,
  perlinZIncrementScale: 0,
  perlinXIncrementScale: 1,
  perlinYIncrementScale: 1,
  particleColor: "#FFFFFF",
  viewForceVectors: false,
  particleOpacity: 1.5,
  particleAmount: 5000,
  randomColor: false,
  avoidBorders: false,
  bgColor: "#000000",
  angleVariation: 5,
  fillTrails: false,
  vectorPadding: 25,
  clearScreen: false,
  drawTrails: false,
  particleSize: 1,
  trailLength: 0,
  maxVelocity: 2,
  mass: 5,
  refresh: (p: p5) => {
    p.setup();
    p.draw();
  },
};

/* -------------------------------------------------------------------------- */
/*                                   PRESETS                                  */
/* -------------------------------------------------------------------------- */
const floaters: PerlinFlowVars = {
  ...initialPerlinFlowVars,
  ...{
    perlinZIncrementScale: 0.4,
    particleColor: NEON_BLUE,
    swapSidesAtBorder: true,
    particleOpacity: 25,
    particleAmount: 500,
    avoidBorders: true,
    angleVariation: 20,
    vectorPadding: 15,
    clearScreen: true,
    drawTrails: true,
    trailLength: 3,
    maxVelocity: 5,
    mass: 2,
  },
};

const plasma: PerlinFlowVars = {
  ...initialPerlinFlowVars,
  ...{
    swapSidesAtBorder: false,
    perlinZIncrementScale: 5,
    particleColor: NEON_PINK,
    particleOpacity: 1.5,
    particleAmount: 3500,
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

const cosmic: PerlinFlowVars = {
  ...initialPerlinFlowVars,
  ...{
    perlinZIncrementScale: 0.5,
    perlinXIncrementScale: 10,
    perlinYIncrementScale: 10,
    swapSidesAtBorder: true,
    particleAmount: 100,
    bgColor: "#120817",
    clearScreen: false,
    vectorPadding: 50,
    angleVariation: 1,
    randomColor: true,
    trailLength: 25,
    maxVelocity: 3,
    particleOpacity: 1,
    avoidBorders: false,
    mass: 10,
  },
};

export const perlinFlowPresets: PresetData<PerlinFlowVars> = [
  {
    name: "Default",
    vars: initialPerlinFlowVars,
  },
  {
    name: "Floaters",
    vars: floaters,
  },
  {
    name: "Plasma",

    vars: plasma,
  },
  {
    name: "Cosmic",
    vars: cosmic,
  },
];
