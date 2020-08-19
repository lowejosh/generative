import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
  palette: {
    type: "dark",
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        html: {
          overflow: "hidden",
        },
      },
    },
  },
});
