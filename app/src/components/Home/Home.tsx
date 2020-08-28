import { sketches } from "constants/sketches";
import { Link } from "react-router-dom";
import React from "react";

export const Home = () => (
  <nav>
    <ul>
      {sketches.map((sketch, index) => (
        <li key={index}>
          <Link to={sketch.slug}>{sketch.name}</Link>
        </li>
      ))}
    </ul>
  </nav>
);
