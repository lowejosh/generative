export const smoothTransitionTo = (
  value: number,
  valueTo: number,
  smoothPercent?: number
) => {
  const defaultPercent = 25;
  if (valueTo > value) {
    // If the desired value is bigger, increment a percentage of the difference between the two
    return (value +=
      (valueTo - value) / (100 / (smoothPercent || defaultPercent)));
  } else {
    // otherwise - decrement
    return (value -=
      (value - valueTo) / (100 / (smoothPercent || defaultPercent)));
  }
};
