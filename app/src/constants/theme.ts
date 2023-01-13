import { createTheme } from "@material-ui/core";
import { teal } from "@material-ui/core/colors";

export const theme = createTheme({
  palette: {
    type: "dark",
    primary: teal,
    secondary: {
      main: "#004d40",
    },
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
