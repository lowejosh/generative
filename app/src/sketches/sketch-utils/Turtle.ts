import p5 from "p5";

// WIP
export class Turtle {
  position = {
    x: 0,
    y: 0,
  };
  angle = 0;
  fill = "#000000";
  stroke = "#000000";
  strokeWeight = 1;
  isPenDown = false;
  p: p5;
  constructor(p: p5) {
    this.p = p;
  }
  penDown() {
    this.isPenDown = true;
  }
  penUp() {
    this.isPenDown = false;
  }
  prepareDrawing() {
    p.stroke(this.stroke);
    p.strokeWeight(this.strokeWeight);
    p.fill(this.fill);
  }
  forward() {
    if (this.isPenDown) {
    }
  }
}