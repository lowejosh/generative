import { theme } from "utils/constants/theme";
import { styled } from "@material-ui/core";

export const IconMenuContainer = styled("div")({
  paddingRight: theme.spacing(5),
  paddingLeft: theme.spacing(5),
  top: theme.spacing(5),
  position: "absolute",
  display: "flex",
  width: "100%",
});
