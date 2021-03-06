import { P5Defaults } from "types/p5";
import p5 from "p5";

// Type
export interface EpicycloidVars extends P5Defaults {
  isAutoplaying: boolean;
  totalVertices: number;
  strokeOpacity: number;
  autoplaySpeed: number;
  strokeWidth: number;
  radius: number;
  factor: number;
  strokeColor: string;
  bgColor: string;
}

// Initial
export const initialEpicycloidVars: EpicycloidVars = {
  isAutoplaying: false,
  totalVertices: 150,
  strokeOpacity: 70,
  autoplaySpeed: 0.01,
  strokeWidth: 1,
  radius: 300,
  strokeColor: "#FFFFFF",
  bgColor: "#000000",
  factor: 2,
  refresh: (p: p5) => {
    p.setup();
    p.draw();
  },
};
