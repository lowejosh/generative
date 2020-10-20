import p5, { Color } from "p5";

/**
 * Fading star (used in Vaporwave.sketch)
 */
type Params = {
  p: p5;
  id: number;
  x: number;
  y: number;
  color?: string;
  onDeath?: (id: number) => void;
};

export class Star {
  id: number;
  x: number;
  y: number;
  size: number;
  lifeTick = 0;
  lifeTickIncrement = 0.5;
  lifeSpan = 200;
  color: Color;
  p: p5;
  onDeath?: Function;

  constructor({ p, id, x, y, color, onDeath }: Params) {
    this.id = id;
    this.p = p;
    this.size = p.random(1, 3);
    this.color = p.color(color ? color : "#FFFFFF");
    this.onDeath = onDeath;
    this.x = x;
    this.y = y;
  }

  /* gets the current fill color of the star */
  getFill() {
    // fade in and then out over it's lifespan
    const opacity = this.p.map(
      this.lifeTick < this.lifeSpan / 2
        ? this.lifeTick
        : this.lifeSpan / 2 - (this.lifeTick - this.lifeSpan / 2),
      0,
      this.lifeSpan / 2,
      0,
      255
    );
    const colorBuff = this.color;
    colorBuff.setAlpha(opacity);
    return colorBuff;
  }

  /* draws to canvas */
  draw() {
    this.p.noStroke();
    this.p.fill(this.getFill());
    this.p.ellipse(this.x, this.y, this.size, this.size);

    //experiment
    this.x += 0.15;
    this.y += 0.05;

    // tick to lifespan if alive -- otherwise call death function :)
    if (this.lifeTick < this.lifeSpan) {
      this.lifeTick += this.lifeTickIncrement;
    } else {
      this.onDeath && this.onDeath(this.id);
    }
  }
}
