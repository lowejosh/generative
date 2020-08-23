import { BrowserRouter, Switch, Route } from "react-router-dom";
import { sketches } from "constants/sketches";
import { Fade } from "@material-ui/core";
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
        <Route path={`/${sketch.slug}`}>
          <Fade in timeout={{ enter: 500 }}>
            <div>{sketch.component}</div>
          </Fade>
        </Route>
      ))}
    </Switch>
  </BrowserRouter>
);
