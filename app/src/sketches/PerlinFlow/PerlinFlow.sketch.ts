import { initialPerlinFlowVars, PerlinFlowVars } from "./PerlinFlow.variables";
import { checkForMismatchedSize } from "utils/misc/checkForMismatchedSize";
import { createParticle, Particle } from "factories/Particle";
import { getVectorFromAngle } from "utils/data/vectors";
import { P5Instance } from "types/p5";
import p5, { Vector } from "p5";

const BASE_INCREMENT = 0.01;
const MAX_RANDOM_SEED = 1000000;

export const getPerlinFlowSketch = () => {
  return (p: P5Instance<PerlinFlowVars>) => {
    p.variables = initialPerlinFlowVars;
    let initOffset: number;
    let zOff = 0;
    const particleAmount = 400;
    const particles: Array<Particle> = [];
    const vectorForceDivisor = 6;

    const drawBackground = () => {
      p.background(0);
    };

    p.setup = () => {
      if (particles.length) {
        particles.splice(0, particles.length);
      }
      Array(particleAmount)
        .fill(0)
        .forEach(() => {
          const randomLocation = p.createVector(
            p.random(0, p.windowWidth),
            p.random(0, p.windowHeight)
          );
          const randomMass = p.random(1, 6);
          particles.push(
            createParticle({
              location: randomLocation,
              width: randomMass / 3,
              height: randomMass / 3,
              mass: randomMass,
              drawTrails: true,
              maxTrailLength: 20,
            })
          );
        });

      initOffset = p.random(0, MAX_RANDOM_SEED);
      p.frameRate(60);
      p.createCanvas(p.windowWidth, p.windowHeight);
      drawBackground();
    };

    p.windowResized = () => {
      p.resizeCanvas(p.windowWidth, p.windowHeight);
      drawBackground();
    };

    p.draw = () => {
      drawBackground();
      checkForMismatchedSize(p);
      if (p.variables) {
        // get variables
        const {
          vectorPadding,
          angleVariation,
          perlinXIncrementScale,
          perlinYIncrementScale,
          perlinZIncrementScale,
        } = p.variables;

        let xOff = initOffset;
        let yOff = initOffset;

        const forceVectors: Array<Array<Vector>> = [];

        for (let x = 0; x < p.width + vectorPadding; x += vectorPadding) {
          const col = Math.floor(x / vectorPadding);
          forceVectors.push([]);
          for (let y = 0; y < p.height + vectorPadding; y += vectorPadding) {
            // use trig to find vector
            const angle =
              (p.noise(xOff, yOff, zOff) * p.TWO_PI * angleVariation) %
              p.TWO_PI;
            const forceVector = getVectorFromAngle(x, y, angle, vectorPadding);

            // now to implement a gradient of influence on the force vectors in order to make the particles stay aiming at the center
            // first use the vectors position to find the percentage of difference from the center (edge of screen at 100%, center at 0%) for each orientation
            const centerX = p.width / 2;
            const centerY = p.height / 2;
            const percentageFromCenterX = Math.round(
              (x > centerX ? (x - centerX) / centerX : 1 - x / centerX) * 100
            );
            const percentageFromCenterY = Math.round(
              (y > centerY ? (y - centerY) / centerY : 1 - y / centerY) * 100
            );
            // next is to use these percentage values to make the vector point more and more to the center as the percentage goes up
            // create a vector that points to the center by dividing the difference between the position and the center coordinates (by the forceDivisor)
            // this will also scale it so the outer vectors will be stronger because the divisor remains constant as the distance grows (which is what we want)
            // this effect is also furtherly compounded with multiplying by the normalized percentage difference between the two points to allow for a nice gradient
            // transition between the two vectors to allow for less influence by the toCenterVector in places where its not necessary (near the center, where we want
            // most of the effect to be from the perlin noise)
            const centerVector = p.createVector(centerX, centerY);
            const toCenterVector = p.createVector(
              centerVector.x - x,
              centerVector.y - y
            );
            toCenterVector.div(vectorForceDivisor);
            toCenterVector.x =
              (toCenterVector.x * percentageFromCenterX) / 1000;
            toCenterVector.y =
              (toCenterVector.y * percentageFromCenterY) / 1000;

            // find the difference between the forcevector and tocentervector and use the percentage difference to

            // push the vector to the multiarray
            forceVectors[col].push(
              forceVector.sub(x, y).div(vectorPadding).add(toCenterVector)
            );

            // // debug
            if (percentageFromCenterX > 10 || percentageFromCenterY > 10) {
              p.stroke(255, 100, 100, 50);
            }
            p.line(
              x,
              y,
              x + forceVector.x * vectorPadding,
              y + forceVector.y * vectorPadding
            );
            p.stroke(255, 255, 255);

            yOff += perlinYIncrementScale * BASE_INCREMENT;
          }
          yOff = initOffset;
          xOff += perlinXIncrementScale * BASE_INCREMENT;
        }

        // handle particles
        particles.forEach((particle) => {
          const col = Math.floor(particle.location.x / vectorPadding);
          const row = Math.floor(particle.location.y / vectorPadding);
          const forceVector = forceVectors?.[col]?.[row];

          // apply force vector if it exists
          if (forceVector) {
            particle.acceleration.mult(0);
            particle.velocity.mult(0);
            particle.applyForce(forceVector.copy());
          }

          // update values and draw the particle
          particle.update(p);
          particle.display(p);
        });

        zOff += perlinZIncrementScale * BASE_INCREMENT;
      }
    };
  };
};
