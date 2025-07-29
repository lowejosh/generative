import p5 from "p5";

import { PresetData } from "components/menu/IconMenu/Presets/Presets.types";
import { LIGHT, METAL, NIGHT_SKY, SUNSET_ORANGE } from "constants/colors";
import { P5Defaults } from "types/p5";

export interface CityscapeVars extends P5Defaults {
  increaseMaxHeightAmount: number;
  minXIncrement: number;
  maxXIncrement: number;
  colorVariance: number;
  fogIncrement: number;
  minStarSize: number;
  maxStarSize: number;
  starAmount: number;
  maxHeight: number;
  minHeight: number;
  rowAmount: number;
  maxWidth: number;
  minWidth: number;
  bottomSkyColor: string;
  buildingColor: string;
  windowColor: string;
  topSkyColor: string;
  starColor: string;
}

/* -------------------------------------------------------------------------- */
/*                                  DEFAULTS                                  */
/* -------------------------------------------------------------------------- */

export const initialCityscapeVars: CityscapeVars = {
  increaseMaxHeightAmount: 90,
  colorVariance: 0.025,
  fogIncrement: 0.2,
  maxXIncrement: 40,
  minXIncrement: 15,
  starAmount: 3000,
  minHeight: 100,
  maxHeight: 350,
  minStarSize: 1,
  maxStarSize: 2,
  maxWidth: 200,
  minWidth: 100,
  rowAmount: 3,
  bottomSkyColor: SUNSET_ORANGE,
  topSkyColor: NIGHT_SKY,
  buildingColor: METAL,
  starColor: "#FFFFFF",
  windowColor: LIGHT,
  refresh: (p: p5) => {
    p.setup();
  },
};

/* -------------------------------------------------------------------------- */
/*                                   PRESETS                                  */
/* -------------------------------------------------------------------------- */

export const hellscape: CityscapeVars = {
  increaseMaxHeightAmount: 45,
  bottomSkyColor: "#590903",
  buildingColor: "#0A0000",
  topSkyColor: "#000000",
  windowColor: "#FF1A1A",
  colorVariance: 0.025,
  starColor: "#ff0000",
  fogIncrement: 0.1,
  maxXIncrement: 40,
  minXIncrement: 15,
  starAmount: 6500,
  minHeight: 100,
  maxHeight: 175,
  minStarSize: 1,
  maxStarSize: 1,
  rowAmount: 12,
  maxWidth: 65,
  minWidth: 35,
  refresh: (p: p5) => {
    p.setup();
  },
};

export const neonCity: CityscapeVars = {
  bottomSkyColor: "#210240",
  increaseMaxHeightAmount: 30,
  buildingColor: "#25052e",
  topSkyColor: "#ff00ea",
  windowColor: "#e17af5",
  colorVariance: 0.025,
  starColor: "#e6e6e6",
  fogIncrement: 0.05,
  maxXIncrement: 40,
  minXIncrement: 15,
  starAmount: 15000,
  maxHeight: 350,
  maxStarSize: 3,
  minHeight: 100,
  minStarSize: 1,
  maxWidth: 133,
  rowAmount: 12,
  minWidth: 69,
  refresh: (p: p5) => {
    p.setup();
  },
};

export const cityscapePresets: PresetData<CityscapeVars> = [
  {
    name: "Default",
    vars: initialCityscapeVars,
  },
  {
    name: "Hellscape",
    vars: hellscape,
  },
  {
    name: "Neon city",
    vars: neonCity,
  },
];
