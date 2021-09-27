import { initialPerlinFlowVars, PerlinFlowVars } from "./PerlinFlow.variables";
import { checkForMismatchedSize } from "utils/misc/checkForMismatchedSize";
import { Particle } from "factories/Particle/Particle";
import { P5Instance } from "types/p5";
import {
  getForceVectors,
  updateParticles,
  initParticles,
} from "./PerlinFlow.utils";

const MAX_RANDOM_SEED = 1000000;

export const getPerlinFlowSketch = () => {
  return (p: P5Instance<PerlinFlowVars>) => {
    p.variables = initialPerlinFlowVars;
    let seed = p.random(0, MAX_RANDOM_SEED);
    const particles: Array<Particle> = [];

    const refreshScreen = (force?: boolean) => {
      if (p.variables && (p.variables?.clearScreen || force)) {
        p.background(p.variables.bgColor);
      }
    };

    p.setup = () => {
      seed = p.random(0, MAX_RANDOM_SEED);
      p.createCanvas(p.windowWidth, p.windowHeight);
      initParticles(p, particles);
      refreshScreen(true);
    };

    p.windowResized = () => {
      p.setup();
    };

    p.draw = () => {
      refreshScreen();
      checkForMismatchedSize(p);
      const forceVectors = getForceVectors(p, seed);
      updateParticles(p, particles, forceVectors);
    };
  };
};
