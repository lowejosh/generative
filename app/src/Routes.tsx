import { BrowserRouter, Switch, Route } from "react-router-dom";
import { TRANSITION_DELAY } from "constants/numbers";
import { sketches } from "constants/sketches";
import { Fade } from "@material-ui/core";
import { Home } from "components/Home";
import React from "react";

export const Routes = () => (
  <BrowserRouter>
    <Switch>
      {/* Home */}
      <Route exact path="/">
        <Fade in timeout={{ enter: TRANSITION_DELAY }}>
          <div>
            <Home />
          </div>
        </Fade>
      </Route>

      {/* Sketches */}
      {sketches.map((sketch, index) => (
        <Route key={index} path={`/${sketch.slug}`}>
          <Fade in timeout={{ enter: TRANSITION_DELAY }}>
            <div>{sketch.component}</div>
          </Fade>
        </Route>
      ))}
    </Switch>
  </BrowserRouter>
);
