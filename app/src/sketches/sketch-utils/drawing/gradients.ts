import p5, { Color } from "p5";

/** draws a rectangle with a linear gradient line-by-line */
export const gradientRect = (
  p: p5,
  x: number,
  y: number,
  w: number,
  h: number,
  c1: Color,
  c2: Color,
  axis: "x" | "y"
) => {
  p.noFill();
  if (axis === "y") {
    // Top to bottom gradient
    for (let i = y; i <= y + h; i++) {
      let inter = p.map(i, y, y + h, 0, 1);
      let c = p.lerpColor(c1, c2, inter);
      p.stroke(c);
      p.line(x, i, x + w, i);
    }
  } else if (axis === "x") {
    // Left to right gradient
    for (let i = x; i <= x + w; i++) {
      let inter = p.map(i, x, x + w, 0, 1);
      let c = p.lerpColor(c1, c2, inter);
      p.stroke(c);
      p.line(i, y, i, y + h);
    }
  }
  // reset vars
  p.noFill();
  p.noStroke();
};

/** draws a circle with a linear gradient line-by-line with some fancy trig */
export const gradientCircle = (
  p: p5,
  x: number,
  y: number,
  r: number,
  c1: Color,
  c2: Color,
  axis: "y", //todo X when needed
  dontDrawOn?: (i: number) => boolean
) => {
  p.noFill();
  // fixes bug
  x = Math.round(x);
  y = Math.round(y);

  // for top down linear gradient
  if (axis === "y") {
    for (let i = 0; i <= r * 2; i++) {
      const angle = p.asin((r - i) / r);
      const cx = p.cos(angle) * r;
      const inter = p.map(i, 0, r * 2, 0, 1);
      const c = p.lerpColor(c1, c2, inter);
      p.stroke(c);
      if (!(dontDrawOn && dontDrawOn(i))) {
        p.line(x - cx, y + i, x + cx, y + i);
      }
    }
  }

  // reset vars
  p.noFill();
  p.noStroke();
};
