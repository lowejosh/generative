import { ThemeProvider, CssBaseline } from "@material-ui/core";
import * as serviceWorker from "./serviceWorker";
import { theme } from "constants/theme";
import * as ReactDOMClient from "react-dom/client";
import { App } from "./App";
import React from "react";

const domNode = document.getElementById("root") as Element;
const root = ReactDOMClient.createRoot(domNode);
root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>
);

serviceWorker.unregister();
