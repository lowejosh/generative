import { P5Defaults } from "types/p5";
import p5 from "p5";
import { PresetData } from "components/menu/IconMenu/Presets/Presets.types";

export interface KaleidoscopeCausticsVars extends P5Defaults {
  wedgeCount: number;
  noiseScale: number; // world-to-noise scale
  warp: number; // domain warp amplitude
  sharpness: number; // ridged power
  timeSpeed: number; // animation speed
  resolution: number; // radial step in pixels
  hueBase: number; // base hue
  hueRange: number; // hue range driven by intensity
  saturation: number; // saturation in HSB
  gain: number; // brightness multiplier
  decay: number; // trail fade (alpha of black rect per frame)
  bgColor: string;
}

export const initialKaleidoscopeCausticsVars: KaleidoscopeCausticsVars = {
  wedgeCount: 12,
  noiseScale: 0.0025,
  warp: 0.8,
  sharpness: 3,
  timeSpeed: 0.15,
  resolution: 2.5,
  hueBase: 200,
  hueRange: 120,
  saturation: 80,
  gain: 1.2,
  decay: 0.08,
  bgColor: "#000000",
  refresh: (p: p5) => {
    p.setup();
    p.draw();
  },
};

// Fewer, more distinct presets
const prismBurst: KaleidoscopeCausticsVars = {
  ...initialKaleidoscopeCausticsVars,
  ...{
    wedgeCount: 18,
    noiseScale: 0.002,
    warp: 1.6,
    sharpness: 2.0,
    timeSpeed: 0.25,
    resolution: 2,
    hueBase: 0,
    hueRange: 300, // full-spectrum burst
    saturation: 95,
    gain: 1.8,
    decay: 0.045,
    bgColor: "#040208",
  },
};

const deepOcean: KaleidoscopeCausticsVars = {
  ...initialKaleidoscopeCausticsVars,
  ...{
    wedgeCount: 6,
    noiseScale: 0.0032,
    warp: 0.9,
    sharpness: 4.5,
    timeSpeed: 0.08,
    resolution: 3.5,
    hueBase: 190,
    hueRange: 35, // tight blue-green band
    saturation: 70,
    gain: 1.15,
    decay: 0.12,
    bgColor: "#000611",
  },
};

const emberMirror: KaleidoscopeCausticsVars = {
  ...initialKaleidoscopeCausticsVars,
  ...{
    wedgeCount: 8,
    noiseScale: 0.0023,
    warp: 0.7,
    sharpness: 3.3,
    timeSpeed: 0.18,
    resolution: 2.2,
    hueBase: 18,
    hueRange: 48, // warm ember tones
    saturation: 92,
    gain: 2.0,
    decay: 0.07,
    bgColor: "#0a0400",
  },
};

export const kaleidoscopeCausticsPresets: PresetData<KaleidoscopeCausticsVars> = [
  { name: "Default", vars: initialKaleidoscopeCausticsVars },
  { name: "Prism Burst", vars: prismBurst },
  { name: "Deep Ocean", vars: deepOcean },
  { name: "Ember Mirror", vars: emberMirror },
];
