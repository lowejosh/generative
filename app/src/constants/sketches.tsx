import { RandomWalk, Epicycloid } from "sketches";
import React from "react";
import { PerlinField } from "sketches/PerlinField";
import { Vaporwave } from "sketches/Vaporwave";

export type SketchItem = {
  name: string;
  slug: string;
  component: JSX.Element;
  dateCompleted: Date;
  tags?: Array<string>;
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
    name: "Vaporwave",
    slug: "vaporwave",
    component: <Vaporwave />,
    dateCompleted: new Date("2020-10-2"),
  },
];
