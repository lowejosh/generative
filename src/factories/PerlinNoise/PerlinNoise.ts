import p5 from "p5";

const p = new p5(() => {});
const MAX_RANDOM_SEED = 1000000;
const DEFAULT_NOISE_INCREMENT = 0.01;
const DEFAULT_NOISE_OFFSET = p.random(0, MAX_RANDOM_SEED);

type Props = {
  noiseIncrement?: number;
  noiseOffset?: number;
};

export type PerlinNoise = {
  noiseIncrement: number;
  noiseOffset: number;
  getNoise: (x?: number, y?: number, z?: number) => number;
};

export function createPerlinNoise({
  noiseIncrement,
  noiseOffset,
}: Props): PerlinNoise {
  return {
    noiseOffset: noiseOffset || DEFAULT_NOISE_OFFSET,
    noiseIncrement: noiseIncrement || DEFAULT_NOISE_INCREMENT,
    getNoise(x, y, z) {
      return p.noise(
        this.noiseOffset + (x || 0) * this.noiseIncrement,
        this.noiseOffset + (y || 0) * this.noiseIncrement,
        this.noiseOffset + (z || 0) * this.noiseIncrement
      );
    },
  };
}
