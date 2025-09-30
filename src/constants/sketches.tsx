import React from "react";
import {
  PsychedelicSpiral,
  PerlinField,
  RandomWalk,
  Epicycloid,
  PerlinFlow,
  Cityscape,
  QuantumHarmonics,
  RecursiveDivisions,
  MoireLattices,
  KaleidoscopeCaustics,
} from "sketches";

export type SketchItem = {
  name: string;
  slug: string;
  component: JSX.Element;
};

export const sketches: Array<SketchItem> = [
  {
    name: "Multiplicative Epicycloid",
    slug: "multiplicative-epicycloid",
    component: <Epicycloid />,
  },
  {
    name: "Perlin Field",
    slug: "perlin-field",
    component: <PerlinField />,
  },
  {
    name: "Perlin Flow",
    slug: "perlin-flow",
    component: <PerlinFlow />,
  },
  {
    name: "Random Walk",
    slug: "random-walk",
    component: <RandomWalk />,
  },
  {
    name: "Cityscape",
    slug: "cityscape",
    component: <Cityscape />,
  },
  {
    name: "Psychedelic Spiral",
    slug: "psychedelic-spiral",
    component: <PsychedelicSpiral />,
  },
  {
    name: "Quantum Harmonics",
    slug: "quantum-harmonics",
    component: <QuantumHarmonics />,
  },
  {
    name: "Recursive Divisions",
    slug: "recursive-divisions",
    component: <RecursiveDivisions />,
  },
  {
    name: "Moiré Lattices",
    slug: "moire-lattices",
    component: <MoireLattices />,
  },
  {
    name: "Kaleidoscope Caustics",
    slug: "kaleidoscope-caustics",
    component: <KaleidoscopeCaustics />,
  },
];
