
import { P5Defaults } from "types/p5";
import p5 from "p5";

export interface RecursiveDivisionsVars extends P5Defaults {
  maxDepth: number;
  minSize: number;
  splitChance: number;
  solidFillChance: number;
  patternChance: number;
  strokeWeight: number;
  strokeColor: string;
  bgColor: string;
  fillColor: string;
  accentColor: string;
  lineSpacing: number;
  dotSize: number;
  noiseScale: number;
  seed: number;
}

export const initialRecursiveDivisionsVars: RecursiveDivisionsVars = {
  maxDepth: 7,
  minSize: 30,
  splitChance: 0.85,
  solidFillChance: 0.4,
  patternChance: 0.3,
  strokeWeight: 1.5,
  seed: 1,
  strokeColor: "#8B5A6B", // dusty rose
  fillColor: "#C8A2C8", // soft lavender
  bgColor: "#F5F1EB", // warm cream
  accentColor: "#B8860B", // muted gold
  lineSpacing: 8,
  dotSize: 3,
  noiseScale: 0.02,
  refresh: (p: p5) => {
    p.setup();
    p.draw();
  }
};