import { initialPerlinFlowVars, PerlinFlowVars } from "./PerlinFlow.variables";
import { checkForMismatchedSize } from "utils/misc/checkForMismatchedSize";
import { createParticle, Particle } from "factories/Particle";
import {
  getVectorFromAngle,
  relativelyPointVectorToCenter,
} from "utils/data/vectors";
import { P5Instance } from "types/p5";
import p5, { Vector } from "p5";

const BASE_INCREMENT = 0.01;
const MAX_RANDOM_SEED = 1000000;
const defaultColor = "#FFF";

export const getPerlinFlowSketch = () => {
  return (p: P5Instance<PerlinFlowVars>) => {
    p.variables = initialPerlinFlowVars;
    let initOffset: number;
    let zOff = 0;
    const particleAmount = 1000;
    const particles: Array<Particle> = [];
    const vectorForceDivisor = 6;

    const refreshScreen = () => {
      if (p.variables?.clearScreen) {
        p.background(p.variables.bgColor);
      }
    };

    p.setup = () => {
      if (p.variables) {
        p.background(p.variables.bgColor);
      }

      if (particles.length) {
        particles.splice(0, particles.length);
      }

      Array(particleAmount)
        .fill(0)
        .forEach(() => {
          if (p.variables) {
            const randomLocation = p.createVector(
              p.random(0, p.windowWidth),
              p.random(0, p.windowHeight)
            );
            const particleColor = p.color(p.variables.particleColor);
            particleColor.setAlpha(50);
            const randomMass = p.random(1, 6);
            particles.push(
              createParticle({
                location: randomLocation,
                // width: randomMass / 3,
                // height: randomMass / 3,
                width: 1,
                height: 1,
                fill: particleColor,
                stroke: particleColor,
                mass: 1,
                maxVelocity: 7,
                drawTrails: true,
                maxTrailLength: 5,
              })
            );
          }
        });

      initOffset = p.random(0, MAX_RANDOM_SEED);
      p.frameRate(60);
      p.createCanvas(p.windowWidth, p.windowHeight);
      refreshScreen();
    };

    p.windowResized = () => {
      p.resizeCanvas(p.windowWidth, p.windowHeight);
      refreshScreen();
    };

    p.draw = () => {
      refreshScreen();
      checkForMismatchedSize(p);
      p.stroke(defaultColor);
      p.fill(defaultColor);
      if (p.variables) {
        // get variables
        const {
          vectorPadding,
          angleVariation,
          perlinXIncrementScale,
          perlinYIncrementScale,
          perlinZIncrementScale,
          viewForceVectors,
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

            const initialForceVector = getVectorFromAngle(
              x,
              y,
              angle,
              vectorPadding
            );
            const forceVector = relativelyPointVectorToCenter(
              p,
              x,
              y,
              initialForceVector,
              vectorPadding
            );

            // debug
            if (viewForceVectors) {
              p.stroke(100, 200, 120, 50);
              p.ellipse(forceVector.x, forceVector.y, 2, 2);
              p.line(x, y, forceVector.x, forceVector.y);
            }
            p.stroke(100, 200, 120, 150);

            // push the vector to the multiarray
            forceVectors[col].push(forceVector.sub(x, y).div(vectorPadding)); //todo chang;
            yOff += perlinYIncrementScale * BASE_INCREMENT;
          }
          yOff = initOffset;
          xOff += perlinXIncrementScale * BASE_INCREMENT;
        }

        // handle particles
        particles.forEach((particle) => {
          const col = Math.floor(particle.location.x / vectorPadding);
          const row = Math.floor(particle.location.y / vectorPadding);
          const maxCol = Math.floor(p.width / vectorPadding);
          const maxRow = Math.floor(p.height / vectorPadding);

          // if the particle is out of bounds, push it back towards the center, otherwise just access the force vector
          const forceVector =
            col > maxCol || row > maxRow || !col || !row
              ? relativelyPointVectorToCenter(
                  p,
                  particle.location.x,
                  particle.location.y,
                  new p5.Vector(),
                  vectorPadding
                )
              : forceVectors?.[col]?.[row];

          // apply force vector if it exists
          if (forceVector) {
            // particle.velocity.mult(0);
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
