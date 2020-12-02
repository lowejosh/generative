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
            // use trig to find vector from noise
            const angle =
              (p.noise(xOff, yOff, zOff) * p.TWO_PI * angleVariation) %
              p.TWO_PI;
            const forceVector = getVectorFromAngle(x, y, angle, vectorPadding);

            /* 
              now to implement a gradient of influence on the force vectors in order to make the particles stay aiming at the center
              first use the vectors position to find the percentage of difference from the center (edge of screen at 100%, center at 0%) for each orientation 
            */
            const centerX = p.width / 2;
            const centerY = p.height / 2;
            const percentageFromCenterX = Math.round(
              (x > centerX ? (x - centerX) / centerX : 1 - x / centerX) * 100
            );
            const percentageFromCenterY = Math.round(
              (y > centerY ? (y - centerY) / centerY : 1 - y / centerY) * 100
            );

            const centerVector = p.createVector(centerX, centerY);
            const positionVector = p.createVector(x, y);

            /*
              find the angle between position and center using trig
              sin(angle) = opposite / hyp
              (angle) = sin-1((distance between x and cx) / (total distance between center and position))
            */
            const distX =
              positionVector.x < centerVector.x
                ? centerVector.x - positionVector.x
                : positionVector.x - centerVector.x;
            const dist = positionVector.dist(centerVector);
            const toCenterAngle = p.asin(distX / dist);
            /* 
              p.text(Math.round(p.degrees(toCenterAngle)), x, y);
              now use this angle to create a vector the size of the vector padding from the position
              cos adjacent will be the yDiff and sin opposite will be the xDiff, given the hypotenuse is the vectorPadding
              p.sin(toCenterAngle) = xdiff / vectorpadding so... 
            */
            const shortDistX = p.sin(toCenterAngle) * vectorPadding;
            // p.cos(toCenterAngle) = ydiff / vectorpadding so...
            const shortDistY = p.cos(toCenterAngle) * vectorPadding;
            // then add these to the position to create the facing center vector
            const toCenterVector = p.createVector(
              x + shortDistX,
              y + shortDistY
            );
            p.text(Math.round(shortDistY), x, y);

            // push the vector to the multiarray
            forceVectors[col].push(forceVector.sub(x, y).div(vectorPadding));

            // debug
            if (percentageFromCenterX > 10 || percentageFromCenterY > 10) {
              p.stroke(255, 100, 100, 50);
            }
            p.line(x, y, toCenterVector.x, toCenterVector.y);
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
