import { BrowserRouter, Switch, Route } from "react-router-dom";
import { sketches } from "constants/sketches";
import { Home } from "components/Home";
import React from "react";

export const Routes = () => (
  <BrowserRouter>
    <Switch>
      {/* Home */}
      <Route exact path="/">
        <Home />
      </Route>

      {/* Sketches */}
      {sketches.map((sketch) => (
        <Route path={`/${sketch.slug}`}>{sketch.component}</Route>
      ))}
    </Switch>
  </BrowserRouter>
);
