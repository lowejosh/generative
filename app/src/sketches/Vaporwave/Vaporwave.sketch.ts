import { initialVaporwaveVars, VaporwaveVars } from "./Vaporwave.variables";
import { P5Instance } from "types/p5";
import { NEON_PINK, NEON_YELLOW, NIGHT_SKY } from "constants/colors";
import {
  gradientCircleLinear,
  gradientCircleRadial,
  gradientRect,
} from "sketches/sketch-utils/drawing/gradients";
import { Star } from "sketches/sketch-utils/classes/Star";

export const getVaporwaveSketch = () => {
  return (p: P5Instance<VaporwaveVars>) => {
    p.variables = initialVaporwaveVars;
    const sunRadius = 150;
    const sunOffset = 250;
    const sunSlices = 8;
    const sliceThickness = 7;
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
        horizon,
        p.color(NIGHT_SKY),
        p.color("#000"),
        "y"
      );
    };

    const handleStars = () => {
      // see if star will be created (1 out of starFrequency)
      if (Math.round(p.random(1, starFrequency)) === starFrequency) {
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
      stars.forEach((star) => star.draw());
    };

    //     function drawGradient(x: number, y: number) {
    //   let h = p.random(0, 360);
    //   for (let r = sunRadius; r > 0; --r) {
    //       const inter = p.map(r, 0, r * 2, 0, 1);
    //       const c = p.lerpColor(c1, c2, inter);
    //     p.ellipse(x, y, r, r);
    //     h = (h + 1) % 360;
    //   }
    // }

    const drawSun = () => {
      // glow
      const sunGlowColorGrad1 = p.color("rgba(255, 255, 255, 0.002)");
      const sunGlowColorGrad2 = p.color("rgba(255, 255, 255, 0)");
      gradientCircleRadial(
        p,
        p.width / 2,
        horizon - sunOffset + sunRadius,
        sunRadius * 3,
        sunGlowColorGrad1,
        sunGlowColorGrad2,
        4
      );
      // sun
      gradientCircleLinear(
        p,
        p.width / 2,
        horizon - sunOffset,
        sunRadius,
        p.color(NEON_YELLOW),
        p.color(NEON_PINK),
        "y",
        (i) =>
          i > sunRadius + sliceThickness &&
          i % (sunRadius / sunSlices) < sliceThickness // add those vaporwave aesthetic slices in the sun
      );
    };

    const drawGrid = () => {
      p.fill(0);
      p.rect(0, horizon, p.width, horizon);
    };

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
        p.noStroke();

        drawGrid();
      }
    };
  };
};
