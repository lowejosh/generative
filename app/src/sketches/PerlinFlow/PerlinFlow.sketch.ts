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
    const particleAmount = 600;
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
            // use trig to find vector from noise
            const angle =
              (p.noise(xOff, yOff, zOff) * p.TWO_PI * angleVariation) %
              p.TWO_PI;
            const forceVector = getVectorFromAngle(x, y, angle, vectorPadding);

            /* 
              Now to implement a gradient of influence on the force vectors in order to make the particles stay aiming at the center.
              First use the vectors position to find the percentage of difference from the center (edge of screen at 100%, center at 0%) for each orientation.
            */
            const centerX = p.width / 2;
            const centerY = p.height / 2;
            const percentageFromCenterX = Math.round(
              (x > centerX ? (x - centerX) / centerX : 1 - x / centerX) * 100
            );
            const percentageFromCenterY = Math.round(
              (y > centerY ? (y - centerY) / centerY : 1 - y / centerY) * 100
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
            const shortDistX = p.sin(toCenterAngle) * vectorPadding;
            const shortDistY = p.cos(toCenterAngle) * vectorPadding;
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
              forceVector.x +
              (percentageFromCenterX / 100) *
                toCenterDiffX *
                (Math.pow(2, percentageFromCenterX / 25) / 16);
            forceVector.y =
              forceVector.y +
              (percentageFromCenterY / 100) *
                toCenterDiffY *
                (Math.pow(2, percentageFromCenterY / 25) / 16);

            // debug
            // p.stroke(100, 200, 120, 50);
            // p.line(x, y, toCenterVector.x, toCenterVector.y);
            // p.stroke(100, 200, 120, 150);
            // p.ellipse(forceVector.x, forceVector.y, 2, 2);
            // p.line(x, y, forceVector.x, forceVector.y);
            p.stroke(30, 100, 255, 50);

            // push the vector to the multiarray
            forceVectors[col].push(forceVector.sub(x, y).div(vectorPadding)); //todo change vector padding to maxspeed - speed

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
