import {
  initialMoireLatticesVars,
  MoireLatticesVars,
} from "./MoireLattices.variables";
import { checkForMismatchedSize } from "utils/misc/checkForMismatchedSize";
import { P5Instance } from "types/p5";

const DEG2RAD = Math.PI / 180;

export const moireLatticesSketch = (p: P5Instance<MoireLatticesVars>) => {
  p.variables = initialMoireLatticesVars;

  let timeAngle = 0;

  const drawBackground = () => {
    if (p.variables) {
      p.background(p.variables.bgColor);
    }
  };

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.pixelDensity(1);
    drawBackground();
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
    drawBackground();
  };

  const drawLayer = (angleRad: number) => {
    if (!p.variables) return;
    const { lineSpacing, lineWidth, fgColor } = p.variables;

    p.push();
    p.translate(p.width / 2, p.height / 2);
    p.rotate(angleRad);
    p.stroke(fgColor);
    p.strokeWeight(lineWidth);
    p.noFill();

    const diag = Math.sqrt(p.width * p.width + p.height * p.height);
    const half = diag / 2;

    for (let y = -half; y <= half; y += lineSpacing) {
      p.line(-half, y, half, y);
    }

    p.pop();
  };

  p.draw = () => {
    checkForMismatchedSize(p);
    if (!p.variables) return;

    const { angleOffsetDeg, layerCount, animate, rotationSpeedDeg } =
      p.variables;

    if (animate) {
      timeAngle += rotationSpeedDeg * DEG2RAD * (p.deltaTime / 1000);
    }

    drawBackground();

    const offsetRad = angleOffsetDeg * DEG2RAD;

    for (let i = 0; i < layerCount; i++) {
      const a = timeAngle + i * offsetRad;
      drawLayer(a);
    }
  };
};
