import p5, { Color } from "p5";

/**
 * Generates a random hexadecimal color
 * Source: https://stackoverflow.com/a/7638362/7457383
 */
export const getRandomColor = () => "#" + Math.random().toString(16).substr(-6);

export const randomlyVaryColor = (p: p5, color: Color, varyMax?: number) => {
  const varyAmount = p.random(0, varyMax || 0.5);
  const lerpColor = p.color(Math.random() > 0.5 ? "#000" : "#FFF"); /// lighten or darken
  return p.lerpColor(color, lerpColor, varyAmount);
};
