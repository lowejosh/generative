import p5, { Color, Vector } from "p5";

// local p5 instance to access p5 utilities and since some of the p5 constructor types are broken
const p = new p5(() => {});

// type safed props
type Props = {
  maxVelocity?: number | null;
  swapSidesAtBorder?: boolean;
  maxTrailLength?: number;
  acceleration?: Vector;
  stroke?: Color | null;
  drawTrails?: boolean;
  fill?: Color | null;
  velocity?: Vector;
  location: Vector;
  height?: number;
  width?: number;
  mass?: number;
};

export type Particle = {
  prevLocation: Vector | null;
  maxVelocity: number | null;
  swapSidesAtBorder: boolean;
  prevPoints: Array<Vector>;
  maxTrailLength: number;
  acceleration: Vector;
  stroke: Color | null;
  drawTrails: boolean;
  fill: Color | null;
  lifeTick: number;
  location: Vector;
  velocity: Vector;
  height: number;
  width: number;
  mass: number;
  applyForce: (this: Particle, force: Vector) => void;
  display: (this: Particle, p: p5) => void;
  update: (this: Particle, p: p5) => void;
};

/**
 * Factory for creating a particle when given a location vector object
 * basically a port from the Nature of Code with a few modifications (processing to p5.js and typescript) so credit to Daniel Shiffman
 * @param params
 */
export function createParticle({
  acceleration = p.createVector(0, 0),
  velocity = p.createVector(0, 0),
  swapSidesAtBorder = false,
  fill = p.color("FFF"),
  maxTrailLength = 20,
  drawTrails = false,
  maxVelocity = null,
  stroke = null,
  height = 1,
  width = 1,
  location,
  mass = 1,
}: Props): Particle {
  // non-prop defaults
  const prevLocation: Vector | null = null;
  const prevPoints: Array<Vector> = [];
  const lifeTick = 0;

  return {
    swapSidesAtBorder,
    maxTrailLength,
    acceleration,
    prevLocation,
    maxVelocity,
    prevPoints,
    drawTrails,
    lifeTick,
    location,
    velocity,
    stroke,
    height,
    width,
    fill,
    mass,
    /**
     *  Updates the particles properties
        note: this is a single "time tick", so time can be eliminated from the equations
     */
    update(p) {
      // record point if we are drawing trails
      if (
        this.drawTrails &&
        this.prevLocation &&
        !this.location.equals(this.prevLocation)
      ) {
        if (this.prevPoints.length === this.maxTrailLength) {
          this.prevPoints.shift();
        }
        this.prevPoints.push(this.location.copy());
      }

      // movement calculations
      // v1 = v0 + a*t so v1 = v0 + a
      this.velocity.add(this.acceleration);
      this.maxVelocity && this.velocity.limit(this.maxVelocity);
      // v = d/t so d = v*t, so d = v
      this.prevLocation = this.location.copy();
      this.location.add(this.velocity);
      this.acceleration.mult(0);

      // handle collision with bounds if we are swapping sides when the particle hits the border
      if (this.swapSidesAtBorder) {
        if (this.location.x >= p.windowWidth) {
          this.location.x = 1;
        } else if (this.location.x <= 0) {
          this.location.x = p.windowWidth - 1;
        }
        if (this.location.y >= p.windowHeight) {
          this.location.y = 1;
        } else if (this.location.y <= 0) {
          this.location.y = p.windowHeight - 1;
        }
      }

      this.lifeTick++;
    },

    /**
     *  Displays the particle on a given sketch instance
     */
    display(p) {
      this.stroke && p.stroke(this.stroke);
      this.fill && p.fill(this.fill);
      p.ellipse(this.location.x, this.location.y, this.width, this.height);

      // draw line between all previous points if we are drawing trails
      if (this.prevPoints.length && this.drawTrails) {
        p.noFill();
        p.beginShape();
        p.curveVertex(this.prevPoints[0].x, this.prevPoints[0].y);
        this.prevPoints.forEach((point) => {
          p.curveVertex(point.x, point.y);
        });
        p.curveVertex(this.location.x, this.location.y);
        p.curveVertex(this.location.x, this.location.y);
        p.endShape();
      }
    },

    /**
     *  Applies a force to the acceleration of the particle
     *  @param force Force Vector
     */
    applyForce(force) {
      // F = ma so a = F/m
      const forceBuffer = force.copy();

      forceBuffer.div(this.mass);
      this.acceleration.add(forceBuffer);
    },
  };
}
