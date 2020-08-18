import * as serviceWorker from "./serviceWorker";
import ReactDOM from "react-dom";
import { App } from "./App";
import React from "react";
import "./index.css";
import { ThemeProvider, CssBaseline } from "@material-ui/core";
import { theme } from "utils/constants/theme";

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
