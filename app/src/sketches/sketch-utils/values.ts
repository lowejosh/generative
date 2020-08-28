import { DEFAULT_SMOOTHING_PCNT } from "constants/numbers";

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
