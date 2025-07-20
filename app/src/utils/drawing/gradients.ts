import p5, { Color } from "p5";

/* draws a rectangle with a linear gradient line-by-line */
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

/**
 * draws a circle with a linear gradient line-by-line with some fancy trig
 * @param p p5 Instance
 * @param x x position
 * @param y y position
 * @param r radius
 * @param c1 color 1
 * @param c2 color 2
 * @param axis axis
 * @param dontDrawOn optional function to stop drawing on certain condition
 */
export const gradientCircleLinear = (
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

/**
 * draws a circle with a radial gradient.
 * @param p p5 Instance
 * @param x x position
 * @param y y position
 * @param r radius
 * @param c1 color 1
 * @param c2 color 2
 * @param performanceFactor increase the increment to increase performance (colours wont be as smooth)
 * @param dontDrawOn optional function to stop drawing on certain condition
 */
export const gradientCircleRadial = (
  p: p5,
  x: number,
  y: number,
  r: number,
  c1: Color,
  c2: Color,
  performanceFactor?: number,
  dontDrawOn?: (i: number) => boolean
) => {
  p.noFill();
  // fixes bug
  x = Math.round(x);
  y = Math.round(y);

  for (let i = r; i > 0; i -= performanceFactor || 1) {
    const inter = p.map(i, 0, r, 0, 1);
    const c = p.lerpColor(c1, c2, inter);
    p.fill(c);
    if (!(dontDrawOn && dontDrawOn(i))) {
      p.ellipse(x, y, i * 2, i * 2);
    }
  }

  // reset vars
  p.noFill();
  p.noStroke();
};

export const gradientLine = (
  p: p5,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  color1: string,
  color2: string,
  steps = 10,
  size = 1
) => {
  const initialVector = p.createVector(x1, y1);
  const pColor1 = p.color(color1);
  const pColor2 = p.color(color2);
  p.stroke(pColor1);
  p.ellipse(initialVector.x, initialVector.y, size, size);

  const d = p.dist(x1, y2, x2, y2);

  for (let i = 0; i < d; i++) {
    const step = p.map(i, 0, d, 0, 1);
    const vector = initialVector.lerp(x2, y2, 0, step);
    const color = p.lerpColor(pColor1, pColor2, step);
    p.stroke(color);
    p.ellipse(vector.x, vector.y, 1, 1);
  }
};
