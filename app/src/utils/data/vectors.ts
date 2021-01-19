import p5, { Vector } from "p5";
import { P5Instance } from "types/p5";

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

export const relativelyPointVectorToCenter = (
  p: P5Instance<any>,
  x: number,
  y: number,
  vector: Vector,
  length: number
) => {
  const forceVector = vector.copy();

  /* 
    Now to implement a gradient of influence on the force vectors in order to make the particles stay aiming at the center.
    First use the vectors position to find the percentage of difference from the center (edge of screen at 100%, center at 0%) for each orientation.
  */
  const centerX = p.width / 2;
  const centerY = p.height / 2;
  const percentageFromCenterX = Math.round(
    x > p.width
      ? 100
      : (x > centerX ? (x - centerX) / centerX : 1 - x / centerX) * 100
  );
  const percentageFromCenterY = Math.round(
    y > p.height
      ? 100
      : (y > centerY ? (y - centerY) / centerY : 1 - y / centerY) * 100
  );

  /*
    Find the angle between position and center using trig.

    sin(angle) = opposite / hyp
    (angle) = sin-1((distance between x and cx) / (total distance between center and position))
  */
  const centerVector = p.createVector(centerX, centerY);
  const positionVector = p.createVector(x, y);
  const distX =
    positionVector.x < centerVector.x
      ? centerVector.x - positionVector.x
      : positionVector.x - centerVector.x;
  const dist = positionVector.dist(centerVector);
  const toCenterAngle = p.asin(distX / dist);

  /* 
    Now use this angle to create a vector the size of the vector padding from the position.
    Cos adjacent will be the yDiff and sin opposite will be the xDiff (given the hypotenuse is the vectorPadding).

    p.sin(toCenterAngle) = xdiff / vectorpadding 
    p.cos(toCenterAngle) = ydiff / vectorpadding
  */
  const shortDistX = p.sin(toCenterAngle) * length;
  const shortDistY = p.cos(toCenterAngle) * length;
  const toCenterVector = p.createVector(
    x > centerVector.x ? x - shortDistX : x + shortDistX,
    y > centerVector.y ? y - shortDistY : y + shortDistY
  );

  /* Now all thats left is to find the differences between the current forceVector and this new toCenter vector
    and then influence the forceVector to be more like the toCenter vector, the closer the position is to the edges.
    This is where the percentage differences will come into play, while also superimposed with an exponential function,
    so that it has nearly no relevance close to the center, where we want the perlin noise to be the major influence.

    The exponential function will be multiplier = (2^(percentageDiff / 25) / 16), because if the max diff is 4 (100 / 25).
    The max output would be 16, and we want to normalize that value between 0 and 1 to use as a multiplier.
    the reason for picking these numbers is that they give a nice gradient along the edges without influencing the center too much (guess & check)
  */
  const toCenterDiffY = toCenterVector.y - forceVector.y;
  const toCenterDiffX = toCenterVector.x - forceVector.x;

  forceVector.x =
    forceVector.x + // Increment it onto the existing vector
    (percentageFromCenterX / 100) * // Apply the percentage multiplier
      (x > p.width ? -toCenterDiffX : toCenterDiffX) * // Add a check for out of bound anomalies
      (Math.pow(2, percentageFromCenterX / 25) / 16); // Apply the exponential function
  forceVector.y = // " "
    forceVector.y +
    (percentageFromCenterY / 100) *
      (y > p.height ? -toCenterDiffY : toCenterDiffY) *
      (Math.pow(2, percentageFromCenterY / 25) / 16);

  return forceVector;
};
