import { initialPerlinFlowVars, PerlinFlowVars } from "./PerlinFlow.variables";
import { checkForMismatchedSize } from "utils/misc/checkForMismatchedSize";
import { getVectorFromAngle } from "utils/data/vectors";
import { P5Instance } from "types/p5";
import { createParticle, Particle } from "factories/Particle";
import { Vector } from "p5";
import { NEON_PINK } from "./../../constants/colors";

const BASE_INCREMENT = 0.01;
const MAX_RANDOM_SEED = 1000000;

export const getPerlinFlowSketch = () => {
  return (p: P5Instance<PerlinFlowVars>) => {
    p.variables = initialPerlinFlowVars;
    let initOffset: number;
    let zOff = 0;
    const particleAmount = 1;
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
        const cols = Math.floor(p.width / vectorPadding);
        const rows = Math.floor(p.height / vectorPadding);

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
            // create a vector that points to the center
            const positionVector = p.createVector(x, y);
            const centerVector = p.createVector(centerX, centerY);
            const angleToCenter = centerVector.angleBetween(positionVector);
            if (p.frameCount % 180 === 0) {
              console.log(positionVector.x, positionVector.y);
              console.log(centerVector.x, centerVector.y);
            }
            const vectorPointingToCenter = getVectorFromAngle(
              x,
              y,
              angleToCenter,
              vectorPadding
            );

            p.stroke(255, 0, 0);
            p.ellipse(positionVector.x, positionVector.y, 2, 2);
            p.stroke(0, 255, 0);
            p.ellipse(vectorPointingToCenter.x, vectorPointingToCenter.y, 2, 2);

            // push the vector to the multiarray
            forceVectors[col].push(
              forceVector.copy().sub(x, y).div(vectorForceDivisor)
            );

            // // debug
            if (percentageFromCenterX > 5 || percentageFromCenterY > 5) {
              p.stroke(255, 100, 100, 50);
            }
            p.line(x, y, vectorPointingToCenter.x, vectorPointingToCenter.y);
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

          // const angle =
          //   (p.noise(
          //     particle.location.x / 1000,
          //     particle.location.y / 1000,
          //     zOff
          //   ) *
          //     p.TWO_PI *
          //     angleVariation) %
          //   p.TWO_PI;

          // const forceVector = getVectorFromAngle(
          //   particle.location.x,
          //   particle.location.y,
          //   angle,
          //   vectorPadding
          // );

          if (forceVector) {
            particle.acceleration.mult(0);
            particle.velocity.mult(0);
            particle.applyForce(forceVector.copy());
          }
          particle.update(p);
          particle.display(p);
        });

        zOff += perlinZIncrementScale * BASE_INCREMENT;
      }
    };
  };
};
