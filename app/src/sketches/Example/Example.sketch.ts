import p5 from "p5";

const POS_VARIANCE = 50;
const COLOR_VARIANCE = 20;
const ELLIPSE_RADIUS = 20;
const ELLIPSE_OPACITY = 20;

export const exampleSketch = (p: p5) => {
  let x = 0;
  let y = 0;
  let r = 255;
  let g = 255;
  let b = 255;

  const drawBackground = () => {
    p.background(0);
  };

  const setupPosition = () => {
    x = p.windowWidth / 2;
    y = p.windowHeight / 2;
  };

  const incrementRandomlyMinMaxed = (
    current: number,
    variance: number,
    min: number,
    max: number
  ) => {
    if (current + variance > max) {
      current = current + p.random(-variance, 0);
    } else if (current - variance < min) {
      current = current + p.random(0, variance);
    } else {
      current = current + p.random(-variance, variance);
    }
    return current;
  };

  p.setup = () => {
    p.createCanvas(window.innerWidth, window.innerHeight);
    drawBackground();
    setupPosition();
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
    drawBackground();
    setupPosition();
  };

  p.draw = () => {
    // draw an ellipse
    p.fill(r, g, b, ELLIPSE_OPACITY);
    p.noStroke();
    p.ellipse(x, y, ELLIPSE_RADIUS, ELLIPSE_RADIUS);

    //increment pos randomly (max at end of screen - diameter)
    x = incrementRandomlyMinMaxed(x, POS_VARIANCE, 0, p.windowWidth);
    y = incrementRandomlyMinMaxed(y, POS_VARIANCE, 0, p.windowHeight);

    //increment color randomly (max at 255)
    r = incrementRandomlyMinMaxed(r, COLOR_VARIANCE, 0, 255);
    g = incrementRandomlyMinMaxed(g, COLOR_VARIANCE, 0, 255);
    b = incrementRandomlyMinMaxed(b, COLOR_VARIANCE, 0, 255);
  };
};
