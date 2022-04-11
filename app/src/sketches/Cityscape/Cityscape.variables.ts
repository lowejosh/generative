import { P5Defaults } from "types/p5";
import p5 from "p5";

export interface CityscapeVars extends P5Defaults {
  increaseMaxHeightAmount: number;
  minXIncrement: number;
  maxXIncrement: number;
  fogIncrement: number;
  colorVariance: number;
  maxHeight: number;
  minHeight: number;
  rowAmount: number;
  maxWidth: number;
  minWidth: number;
}

export const initialCityscapeVars: CityscapeVars = {
  increaseMaxHeightAmount: 90,
  colorVariance: 0.025,
  fogIncrement: 0.2,
  maxXIncrement: 40,
  minXIncrement: 15,
  minHeight: 100,
  maxHeight: 350,
  maxWidth: 200,
  minWidth: 100,
  rowAmount: 3,

  refresh: (p: p5) => {
    p.setup();
  },
};
