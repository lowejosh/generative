import { initialVaporwaveVars, VaporwaveVars } from "./Vaporwave.variables";
import { P5Instance } from "types/p5";
import { NEON_PINK, NEON_YELLOW, NIGHT_SKY } from "constants/colors";
import {
  gradientCircle,
  gradientRect,
} from "sketches/sketch-utils/drawing/gradients";
import { Star } from "sketches/sketch-utils/classes/Star";

export const getVaporwaveSketch = () => {
  return (p: P5Instance<VaporwaveVars>) => {
    p.variables = initialVaporwaveVars;
    const sunRadius = 150;
    const sunSlices = 10;
    const sliceThickness = 4;
    const horizon = p.windowHeight / 2 + p.windowHeight / 15; // temp
    const stars: Array<Star> = [];
    const starFrequency = 1;
    let starIdIncrement = 4;
    // const sunGlow = 10;

    const drawBackground = () => {
      gradientRect(
        p,
        0,
        0,
        p.width,
        p.height,
        p.color(NIGHT_SKY),
        p.color("#000"),
        "y"
      );
    };

    const handleStars = () => {
      // see if star will be created (1 out of starFrequency)
      if (Math.round(p.random(1, starFrequency)) === starFrequency) {
        console.log("starCreated");
        const x = p.random(0, p.width);
        const y = p.random(0, horizon);
        stars.push(
          new Star({
            p,
            id: starIdIncrement,
            x,
            y,
            onDeath: (id) =>
              stars.splice(
                stars.findIndex((star) => star.id === id),
                1
              ),
          })
        );
        starIdIncrement++;
      }

      // draw current stars
      console.log(stars);
      stars.forEach((star) => star.draw());
    };

    const drawSun = () => {
      // glow outline -- WAY TOO EXPENSIVE TO RENDER (but it does look cool)
      // p.fill(NEON_PINK);
      // p.ellipse(
      //   p.width / 2,
      //   p.height / 10 + sunRadius,
      //   sunRadius * 2 + sunGlow,
      //   sunRadius * 2 + sunGlow
      // );
      // p.filter(p.BLUR, 12);
      gradientCircle(
        p,
        p.width / 2,
        horizon - sunRadius * 2 - sunRadius / 8,
        sunRadius,
        p.color(NEON_YELLOW),
        p.color(NEON_PINK),
        "y",
        (i) =>
          i > sunRadius + sliceThickness &&
          i % (sunRadius / sunSlices) < sliceThickness // add those vaporwave aesthetic slices in the sun
      );
    };

    const drawGrid = () => {};

    p.setup = () => {
      p.frameRate(50);
      p.createCanvas(p.windowWidth, p.windowHeight);
      drawBackground();
    };

    p.windowResized = () => {
      p.resizeCanvas(p.windowWidth, p.windowHeight);
      drawBackground();
    };

    p.draw = () => {
      p.smooth();
      p.noStroke();
      drawBackground();
      handleStars();

      if (p.variables) {
        // get variables
        const { foo, bar } = p.variables;
        drawSun();

        // debug
        p.stroke("#EA7324");
        p.strokeWeight(2);
        p.line(0, horizon, p.width, horizon);
        p.noStroke();

        drawGrid();
      }
    };
  };
};
