import {
  initialLorenzSystemVars,
  LorenzSystemVars,
} from "./LorenzSystem.variables";
import { P5Instance } from "types/p5";
import p5 from "p5";

export const getLorenzSystemSketch = () => {
  return (p: P5Instance<LorenzSystemVars>) => {
    p.variables = initialLorenzSystemVars;
    let x = 0.01;
    let y = 0;
    let z = 0;
    const a = 10;
    const b = 28;
    const c = 8 / 3;
    const points: Array<p5.Vector> = [];

    const drawBackground = () => {
      p.background(0);
    };

    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
      p.colorMode(p.HSB);
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

        // calculate integrals
        const dt = 0.01;
        const dx = a * (y - x) * dt;
        const dy = (x * (b - z) - y) * dt;
        const dz = (x * y - c * z) * dt;
        x = x + dx;
        y = y + dy;
        z = z + dz;

        points.push(p.createVector(x, y, z));

        p.translate(0, 0, -80);
        let camX = p.map(p.mouseX, 0, p.width, -200, 200);
        let camY = p.map(p.mouseY, 0, p.height, -200, 200);
        p.camera(
          camX,
          camY,
          p.height / 2.0 / p.tan((p.PI * 30.0) / 180.0),
          0,
          0,
          0,
          0,
          1,
          0
        );
        //translate(width/2, height/2);
        p.scale(5);
        p.stroke(255);
        p.noFill();

        let hu = 0;
        p.beginShape();

        for (let v of points) {
          p.stroke(hu, 255, 255);
          p.vertex(v.x, v.y, v.z);
          //var offset = p5.Vector.random3D();
          //offset.mult(0.1);
          //v.add(offset);

          hu += 1;
          if (hu > 255) {
            hu = 0;
          }
        }
        p.endShape();
      }
    };
  };
};
