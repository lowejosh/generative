import { initialVaporwaveVars, VaporwaveVars } from "./Vaporwave.variables";
import { P5Instance } from "types/p5";
import { NEON_PINK, NEON_RED, NEON_YELLOW, NIGHT_SKY } from "constants/colors";
import { darken } from "@material-ui/core";
import {
  gradientCircle,
  gradientRect,
} from "sketches/sketch-utils/drawing/gradients";

export const getVaporwaveSketch = () => {
  return (p: P5Instance<VaporwaveVars>) => {
    p.variables = initialVaporwaveVars;
    const sunRadius = 100;
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

    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight);
      drawBackground();
    };

    p.windowResized = () => {
      p.resizeCanvas(p.windowWidth, p.windowHeight);
      drawBackground();
    };

    p.draw = () => {
      drawBackground();
      // p.smooth();
      // p.fill(NEON_PINK);
      // p.filter(p.BLUR, 6);
      // p.stroke(0);

      p.smooth();
      p.noStroke();

      if (p.variables) {
        // get variables
        const { foo, bar } = p.variables;

        // Draw sun
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
          p.height / 10,
          sunRadius,
          p.color(NEON_YELLOW),
          p.color(NEON_PINK),
          "y",
          (i) => i > sunRadius && i % 20 > 5 && i % 20 < 15 // add those vaporwave aesthetic slices in the sun
        );
      }
    };
  };
};
