import { styled, IconButton, darken, lighten } from "@material-ui/core";
import { BACKGROUND_HEX_OPACITY } from "constants/strings";

export const IconMenuContainer = styled("div")(({ theme }) => ({
  paddingRight: theme.spacing(5),
  paddingLeft: theme.spacing(5),
  top: theme.spacing(5),
  position: "absolute",
  display: "flex",
  width: "100%",
}));

export const IconWrapper = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.background.default + BACKGROUND_HEX_OPACITY,
  boxShadow: theme.shadows[2],
  "&:hover": {
    backgroundColor: darken(
      theme.palette.background.default + BACKGROUND_HEX_OPACITY,
      0.3
    ),
  },
  "&:active": {
    backgroundColor: lighten(
      theme.palette.background.default + BACKGROUND_HEX_OPACITY,
      0.1
    ),
  },
}));
