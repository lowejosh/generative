import p5, { Color } from "p5";

// local p5 instance to access p5 utilities and since some of the p5 constructor types are broken
const p = new p5(() => {});

// type safed props
type Props = {
  color?: Color | null;
  height?: number;
  width?: number;
};

export type Particle = {
  color: Color | null;
  windowColor: Color | null;
  height: number;
  width: number;
  display: (this: Particle, p: p5) => void;
};

/**
 * Factory for creating a particle when given a location vector object
 * basically a port from the Nature of Code with a few modifications (processing to p5.js and typescript) so credit to Daniel Shiffman
 * @param params
 */
export function createBuilding({
  color = p.color("000"),
  height = 1,
  width = 1,
}: Props): Particle {
  return {
    height,
    width,
    color,
    display(p) {},
  };
}
