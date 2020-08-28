import { P5Defaults } from "types/p5";
import p5 from "p5";

export interface RandomWalkVars extends P5Defaults {
  posVariance: number;
  colorVariance: number;
  radius: number;
  opacity: number;
  speed: number;
}

export const initialRandomWalkVars: RandomWalkVars = {
  posVariance: 20,
  colorVariance: 20,
  radius: 40,
  opacity: 80,
  speed: 1,
  refresh: (p: p5) => {
    p.setup();
  },
};
