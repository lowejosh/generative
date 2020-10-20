import { initialVaporwaveVars, VaporwaveVars } from "./Vaporwave.variables";
import { P5Instance } from "types/p5";
import { NEON_PINK, NEON_YELLOW, NIGHT_SKY } from "constants/colors";
import {
  gradientCircleLinear,
  gradientCircleRadial,
  gradientRect,
} from "sketches/sketch-utils/drawing/gradients";
import { Star } from "sketches/sketch-utils/classes/Star";
import { Graphics } from "p5";

export const getVaporwaveSketch = () => {
  return (p: P5Instance<VaporwaveVars>) => {
    p.variables = initialVaporwaveVars;

    /* 2D & 3D */
    const horizon = p.windowHeight / 2 + p.windowHeight / 15; // temp

    /* 2D */
    const sunRadius = 150;
    const sunOffset = 250;
    const sunSlices = 8;
    const sliceThickness = 7;
    const stars: Array<Star> = [];
    const starFrequency = 1;
    let starIdIncrement = 4;

    /* 3D */
    let pg: Graphics;
    let flying = 0;
    const scale = 20;
    const w = 1400;
    const h = 1000;
    const rows = Math.round(h / scale);
    const cols = Math.round(w / scale);
    const terrain = Array(rows)
      .fill(0)
      .map(() => Array(cols).fill(0));
    console.log(terrain);

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

    const drawSun = () => {
      p.strokeWeight(2);

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

      flying -= 0.1;
      let yoff = flying;
      for (var y = 0; y < rows; y++) {
        var xoff = 0;
        for (var x = 0; x < cols; x++) {
          terrain[x][y] = p.map(p.noise(xoff, yoff), 0, 1, -20, 20);
          xoff += 0.2;
        }
        yoff += 0.2;
      }

      pg.translate(0, 50);
      pg.rotateX(p.PI / 3);
      pg.fill(0, 0, 0, 0);
      pg.stroke(NEON_PINK);
      pg.translate(-w / 2, -h / 2);
      for (var y = 0; y < rows - 1; y++) {
        pg.beginShape(p.TRIANGLE_STRIP);
        for (var x = 0; x < cols; x++) {
          pg.vertex(x * scale, y * scale, terrain[x][y]);
          pg.vertex(x * scale, (y + 1) * scale, terrain[x][y + 1]);
        }
        pg.endShape();
      }
    };

    p.setup = () => {
      pg = p.createGraphics(p.windowWidth, p.windowHeight, p.WEBGL);
      pg.resetMatrix();
      p.createCanvas(p.windowWidth, p.windowHeight);

      p.smooth();
      p.noStroke();
      p.frameRate(50);
      drawBackground();
    };

    p.windowResized = () => {
      p.resizeCanvas(p.windowWidth, p.windowHeight);
      drawBackground();
    };

    p.draw = () => {
      drawBackground();

      if (p.variables) {
        // get variables
        const { foo, bar } = p.variables;
        handleStars();
        drawSun();

        // debug
        p.noStroke();

        drawGrid();
        p.image(pg, 0, 0);
      }
    };
  };
};
