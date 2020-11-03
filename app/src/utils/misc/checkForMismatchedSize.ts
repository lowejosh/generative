import p5 from "p5";

export const checkForMismatchedSize = (p: p5) => {
  if (p.windowHeight !== p.height || p.windowWidth !== p.width) {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  }
};
