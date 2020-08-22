import React from "react";
import { BrowserRouter, Link, Switch, Route } from "react-router-dom";
import { sketches } from "constants/sketches";

export const App = () => {
  //temp
  return (
    <BrowserRouter>
      <div>
        <nav>
          <ul>
            {sketches.map((sketch) => (
              <li>
                <Link to={sketch.slug}>{sketch.name}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <Switch>
          {sketches.map((sketch) => (
            <Route path={`/${sketch.slug}`}>{sketch.component}</Route>
          ))}
        </Switch>
      </div>
    </BrowserRouter>
  );
};
