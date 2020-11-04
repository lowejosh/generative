import { initialPerlinFlowVars, PerlinFlowVars } from "./PerlinFlow.variables";
import { checkForMismatchedSize } from "utils/misc/checkForMismatchedSize";
import { getVectorFromAngle } from "utils/data/vectors";
import { P5Instance } from "types/p5";
import { createParticle, Particle } from "factories/Particle";

const BASE_INCREMENT = 0.01;
const MAX_RANDOM_SEED = 1000000;

export const getPerlinFlowSketch = () => {
  return (p: P5Instance<PerlinFlowVars>) => {
    p.variables = initialPerlinFlowVars;
    let initOffset: number;
    let zOff = 0;
    const particleAmount = 200;
    const particles: Array<Particle> = [];

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
          particles.push(
            createParticle({
              location: randomLocation,
              width: 1,
              height: 1,
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
        const cols = Math.floor(p.width / vectorPadding);
        const rows = Math.floor(p.height / vectorPadding);

        // for (let x = vectorPadding / 3; x < p.width; x += vectorPadding) {
        //   for (let y = vectorPadding / 3; y < p.height; y += vectorPadding) {
        //     // use trig to find vector
        //     const angle =
        //       (p.noise(xOff, yOff, zOff) * p.TWO_PI * angleVariation) %
        //       p.TWO_PI;
        //     const forceVector = getVectorFromAngle(x, y, angle, vectorPadding);

        //     // debug
        // p.stroke(255, 255, 255);
        // p.line(x, y, forceVector.x, forceVector.y);

        //     yOff += perlinYIncrementScale * BASE_INCREMENT;
        //   }
        //   yOff = initOffset;
        //   xOff += perlinXIncrementScale * BASE_INCREMENT;
        // }

        // handle particles
        particles.forEach((particle) => {
          const angle =
            (p.noise(
              particle.location.x / 1000,
              particle.location.y / 1000,
              zOff
            ) *
              p.TWO_PI *
              angleVariation) %
            p.TWO_PI;
          const forceVector = getVectorFromAngle(
            particle.location.x,
            particle.location.y,
            angle,
            vectorPadding
          );

          // debug
          p.stroke(255, 255, 255);
          p.line(
            particle.location.x,
            particle.location.y,
            particle.location.x + particle.velocity.x,
            particle.location.y + particle.velocity.y
          );
          p.noStroke();

          particle.applyForce(forceVector.div(10000));
          particle.update(p);
          particle.display(p);
        });

        zOff += perlinZIncrementScale * BASE_INCREMENT;
      }
    };
  };
};
