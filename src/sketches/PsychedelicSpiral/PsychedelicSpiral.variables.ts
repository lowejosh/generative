import { P5Defaults } from "types/p5";
import p5 from "p5";

export interface PsychedelicSpiralVars extends P5Defaults {
  spiralSpeed: number;
  particleCount: number;
  colorShiftSpeed: number;
  morphingIntensity: number;
  trailLength: number;
  kaleidoscopeSegments: number;
  pulsationIntensity: number;
  fractalDepth: number;
  clearScreen: boolean;
}

export const initialPsychedelicSpiralVars: PsychedelicSpiralVars = {
  spiralSpeed: 0.02,
  particleCount: 150,
  colorShiftSpeed: 0.005,
  morphingIntensity: 50,
  trailLength: 20,
  kaleidoscopeSegments: 8,
  pulsationIntensity: 30,
  fractalDepth: 3,
  clearScreen: false,
  refresh: (p: p5) => {
    p.setup();
  },
};
