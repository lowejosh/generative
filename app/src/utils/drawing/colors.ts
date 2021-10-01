import p5, { Color } from "p5";

/**
 * Generates a random hexadecimal color
 * Source: https://stackoverflow.com/a/7638362/7457383
 */
export const getRandomColor = () => "#" + Math.random().toString(16).substr(-6);

export const randomlyVaryColor = (p: p5, color: Color) => {
  const varyAmount = Math.random() / 2; // 0 - 0.5
  const lerpColor = p.color(Math.random() > 0.5 ? "#000" : "#FFF"); /// lighten or darken
  return p.lerpColor(color, lerpColor, varyAmount);
};
