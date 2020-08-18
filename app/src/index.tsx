import { ThemeProvider, CssBaseline } from "@material-ui/core";
import * as serviceWorker from "./serviceWorker";
import { theme } from "utils/constants/theme";
import ReactDOM from "react-dom";
import { App } from "./App";
import React from "react";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
