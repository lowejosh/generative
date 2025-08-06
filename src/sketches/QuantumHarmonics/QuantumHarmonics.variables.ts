import { P5Defaults } from "types/p5";
import p5 from "p5";

export interface QuantumHarmonicsVars extends P5Defaults {
  // wave source stuff
  numSources: number;
  sourceFrequency: number;
  sourceAmplitude: number;
  phaseOffset: number;

  // visual settings
  colorCycleSpeed: number; // how fast colors shift through spectrum
  waveDecay: number;
  interferenceThreshold: number; // minimum amplitude to show colors
  backgroundAlpha: number;

  // animation speed
  timeScale: number;
  rotationSpeed: number; // how fast sources rotate around center

  // what to show
  showWaveSources: boolean;
  showInterferenceField: boolean;
  
  // drag state
  isDragging: boolean;
  draggedSourceIndex: number;
}

export const initialQuantumHarmonicsVars: QuantumHarmonicsVars = {
  // wave sources
  numSources: 4,
  sourceFrequency: 0.02,
  sourceAmplitude: 100,
  phaseOffset: 0,

  // colors and visuals
  colorCycleSpeed: 0.02,
  waveDecay: 0.8,
  interferenceThreshold: 0.3,
  backgroundAlpha: 20,

  // timing
  timeScale: 0.4,
  rotationSpeed: 0.005,

  // toggles
  showWaveSources: true,
  showInterferenceField: true,

  // interaction state
  isDragging: false,
  draggedSourceIndex: -1,

  refresh: (p: p5) => {
    p.setup();
  },
};
