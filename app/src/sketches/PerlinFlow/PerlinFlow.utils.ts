import { PerlinFlowVars } from "./PerlinFlow.variables";
import { createParticle, Particle } from "factories/Particle";
import { P5Instance } from "types/p5";
import p5, { Vector } from "p5";
import {
  getVectorFromAngle,
  relativelyPointVectorToCenter,
} from "utils/data/vectors";

const BASE_INCREMENT = 0.01;

/**
 * Initializes the array of particles used in the PerlinFlow
 * @param p
 * @param particles
 */
export const initParticles = (
  p: P5Instance<PerlinFlowVars>,
  particles: Array<Particle>
) => {
  // Clear the particles if they exist and we want to reinitialize them
  if (particles.length) {
    particles.splice(0, particles.length);
  }

  Array(p.variables?.particleAmount)
    .fill(0)
    .forEach(() => {
      if (p.variables) {
        const {
          swapSidesAtBorder,
          particleOpacity,
          particleColor,
          particleSize,
          maxVelocity,
          trailLength,
          drawTrails,
          mass,
        } = p.variables;

        const particleColorObj = p.color(particleColor);
        particleColorObj.setAlpha(p.map(particleOpacity, 0, 100, 0, 255));
        const randomLocation = p.createVector(
          p.random(0, p.windowWidth),
          p.random(0, p.windowHeight)
        );

        particles.push(
          createParticle({
            maxTrailLength: trailLength,
            location: randomLocation,
            stroke: particleColorObj,
            fill: particleColorObj,
            height: particleSize,
            width: particleSize,
            swapSidesAtBorder,
            maxVelocity,
            drawTrails,
            mass,
          })
        );
      }
    });
};

/**
 * Calculates the force vectors for the perlin flow
 * @param p
 */
export const getForceVectors = (
  p: P5Instance<PerlinFlowVars>,
  seed: number
): Array<Array<Vector>> => {
  const forceVectors: Array<Array<Vector>> = [];

  if (p.variables) {
    const {
      perlinXIncrementScale,
      perlinYIncrementScale,
      perlinZIncrementScale,
      viewForceVectors,
      angleVariation,
      vectorPadding,
      avoidBorders,
    } = p.variables;
    let xOff = seed;
    let yOff = seed;
    let zOff = p.frameCount * perlinZIncrementScale * BASE_INCREMENT; // We need this to be dynamic, so we calculate it from the frame count

    for (let x = 0; x < p.width + vectorPadding; x += vectorPadding) {
      const col = Math.floor(x / vectorPadding);
      forceVectors.push([]);
      for (let y = 0; y < p.height + vectorPadding; y += vectorPadding) {
        // Use trig to find vector from noise
        const angle =
          (p.noise(xOff, yOff, zOff) * p.TWO_PI * angleVariation) % p.TWO_PI;

        const initialForceVector = getVectorFromAngle(
          x,
          y,
          angle,
          vectorPadding
        );

        const forceVector = avoidBorders
          ? relativelyPointVectorToCenter(
              p,
              x,
              y,
              initialForceVector,
              vectorPadding
            )
          : initialForceVector;

        // Show the vectors if we want to
        if (viewForceVectors) {
          p.stroke(100, 200, 120, 50);
          p.ellipse(forceVector.x, forceVector.y, 2, 2);
          p.line(x, y, forceVector.x, forceVector.y);
        }
        p.stroke(100, 200, 120, 150);

        // Push the vector to the multiarray
        forceVectors[col].push(forceVector.sub(x, y).div(vectorPadding));
        yOff += perlinYIncrementScale * BASE_INCREMENT;
      }
      yOff = seed;
      xOff += perlinXIncrementScale * BASE_INCREMENT;
    }
  }

  return forceVectors;
};

/**
 * Loops through and updates the particles for the perlin flow
 * @param p
 * @param particles
 * @param forceVectors
 */
export const updateParticles = (
  p: P5Instance<PerlinFlowVars>,
  particles: Array<Particle>,
  forceVectors: Array<Array<Vector>>
) => {
  if (p.variables) {
    const { vectorPadding, avoidBorders } = p.variables;

    particles.forEach((particle) => {
      const col = Math.floor(particle.location.x / vectorPadding);
      const row = Math.floor(particle.location.y / vectorPadding);
      const maxCol = Math.floor(p.width / vectorPadding);
      const maxRow = Math.floor(p.height / vectorPadding);

      // Update the particle properties
      if (p.variables) {
        const {
          swapSidesAtBorder,
          particleOpacity,
          particleColor,
          particleSize,
          maxVelocity,
          trailLength,
          drawTrails,
          mass,
        } = p.variables;
        const particleColorObj = p.color(particleColor);
        particleColorObj.setAlpha(p.map(particleOpacity, 0, 100, 0, 255));
        particle = {
          ...particle,
          ...{
            maxTrailLength: trailLength,
            stroke: particleColorObj,
            fill: particleColorObj,
            height: particleSize,
            width: particleSize,
            swapSidesAtBorder,
            maxVelocity,
            drawTrails,
            mass,
          },
        };
      }

      // If the particle is out of bounds, push it back towards the center, otherwise just access the force vector
      const forceVector =
        avoidBorders && (col > maxCol || row > maxRow || !col || !row)
          ? relativelyPointVectorToCenter(
              p,
              particle.location.x,
              particle.location.y,
              new p5.Vector(),
              vectorPadding
            )
          : forceVectors?.[col]?.[row];

      // Apply force vector if it exists
      if (forceVector) {
        particle.applyForce(forceVector.copy());
      }

      // Update values and draw the particle
      particle.update(p);
      particle.display(p);
    });
  }
};
