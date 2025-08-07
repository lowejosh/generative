import { P5Defaults } from "types/p5";
import p5 from "p5";

export interface MoireLatticesVars extends P5Defaults {
  lineSpacing: number;
  lineWidth: number;
  angleOffsetDeg: number;
  layerCount: number;
  rotationSpeedDeg: number;
  animate: boolean;
  fgColor: string;
  bgColor: string;
}

export const initialMoireLatticesVars: MoireLatticesVars = {
  lineSpacing: 12,
  lineWidth: 1.5,
  angleOffsetDeg: 6,
  layerCount: 3,
  rotationSpeedDeg: 5,
  animate: true,
  fgColor: "#ffffff",
  bgColor: "#0b0b0b",
  refresh: (p: p5) => {
    p.setup();
    p.draw();
  },
};
