import { DEFAULT_SMOOTHING_PCNT } from "constants/numbers";
import p5 from "p5";

/** Smoothly increments a number to a desired output */
export const smoothTransitionTo = (
  value: number,
  valueTo: number,
  smoothPercent?: number
) => {
  if (valueTo > value) {
    // If the desired value is bigger, increment a percentage of the difference between the two
    return (value +=
      (valueTo - value) / (100 / (smoothPercent || DEFAULT_SMOOTHING_PCNT)));
  } else {
    // otherwise - decrement
    return (value -=
      (value - valueTo) / (100 / (smoothPercent || DEFAULT_SMOOTHING_PCNT)));
  }
};

/**
 *  Randomly increments a number within the bounds of a minimum, maximum and given variance
 */
export const incrementRandomlyMinMaxed = (
  p: p5,
  current: number,
  variance: number,
  min: number,
  max: number
) => {
  if (current + variance > max) {
    current = current + p.random(-variance, 0);
  } else if (current - variance < min) {
    current = current + p.random(0, variance);
  } else {
    current = current + p.random(-variance, variance);
  }
  return current;
};
