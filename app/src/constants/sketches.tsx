import React from "react";
import {
  PerlinField,
  RandomWalk,
  Epicycloid,
  PerlinFlow,
  Cityscape,
} from "sketches";

export type Tags = "Experiment" | "Noise";

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
    tags: ["Experiment"],
  },
  {
    name: "Multiplicative Epicycloid",
    slug: "multiplicative-epicycloid",
    component: <Epicycloid />,
    dateCompleted: new Date("2020-08-22"),
  },
  {
    name: "Perlin Field",
    slug: "perlin-field",
    component: <PerlinField />,
    dateCompleted: new Date("2020-10-1"),
    tags: ["Experiment"],
  },
  {
    name: "Perlin Flow",
    slug: "perlin-flow",
    component: <PerlinFlow />,
    dateCompleted: new Date("2021-09-24"),
    tags: ["Experiment", "Noise"],
  },
  {
    name: "Cityscape",
    slug: "cityscape",
    component: <Cityscape />,
    dateCompleted: new Date(), // WIP
  },
];
