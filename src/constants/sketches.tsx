import React from "react";
import {
  PsychedelicSpiral,
  PerlinField,
  RandomWalk,
  Epicycloid,
  PerlinFlow,
  Cityscape,
  QuantumHarmonics,
} from "sketches";

export type Tags =
  | "Noise"
  | "Geometry"
  | "Particles"
  | "Animation"
  | "Interactive"
  | "Mathematical"
  | "Organic"
  | "Simulation"
  | "Fractals";

export type SketchItem = {
  name: string;
  slug: string;
  component: JSX.Element;
  dateCompleted: Date;
  tags?: Array<Tags>;
};

export const sketches: Array<SketchItem> = [
  {
    name: "Random Walk",
    slug: "random-walk",
    component: <RandomWalk />,
    dateCompleted: new Date("2020-08-20"),
    tags: ["Simulation", "Organic"],
  },
  {
    name: "Multiplicative Epicycloid",
    slug: "multiplicative-epicycloid",
    component: <Epicycloid />,
    dateCompleted: new Date("2020-08-22"),
    tags: ["Geometry", "Mathematical", "Animation"],
  },
  {
    name: "Perlin Field",
    slug: "perlin-field",
    component: <PerlinField />,
    dateCompleted: new Date("2020-10-1"),
    tags: ["Noise", "Interactive"],
  },
  {
    name: "Perlin Flow",
    slug: "perlin-flow",
    component: <PerlinFlow />,
    dateCompleted: new Date("2021-09-24"),
    tags: ["Noise", "Particles", "Simulation"],
  },
  {
    name: "Cityscape",
    slug: "cityscape",
    component: <Cityscape />,
    dateCompleted: new Date("2022-10-15"),
    tags: ["Geometry", "Interactive", "Simulation"],
  },
  {
    name: "Psychedelic Spiral",
    slug: "psychedelic-spiral",
    component: <PsychedelicSpiral />,
    dateCompleted: new Date("2025-06-24"),
    tags: ["Noise", "Particles", "Animation", "Fractals"],
  },
  {
    name: "Quantum Harmonics",
    slug: "quantum-harmonics",
    component: <QuantumHarmonics />,
    dateCompleted: new Date("2025-08-06"),
    tags: ["Mathematical", "Particles", "Animation", "Interactive"],
  },
];
