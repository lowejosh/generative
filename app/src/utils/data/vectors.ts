import p5 from "p5";

// local p5 instance to access p5 utilities and since some of the p5 constructor types are broken
const p = new p5(() => {});

/**
 * Returns a vector given an angle and distance from a starting position
 * @param sx Starting X
 * @param sy Starting Y
 * @param angle Angle from starting position (in radians)
 * @param distance Distance from starting position to ending position
 */
export const getVectorFromAngle = (
  sx: number,
  sy: number,
  angle: number,
  distance: number
) => {
  return p.createVector(
    sx + Math.sin(angle) * distance,
    sy + Math.cos(angle) * distance
  );
};
