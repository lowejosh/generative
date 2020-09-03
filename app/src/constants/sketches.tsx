import { RandomWalk, Epicycloid } from "sketches";
import React from "react";

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
  },
  {
    name: "Multiplicative Epicycloid",
    slug: "multiplicative-epicycloid",
    component: <Epicycloid />,
    dateCompleted: new Date("2020-08-22"),
  },
];
