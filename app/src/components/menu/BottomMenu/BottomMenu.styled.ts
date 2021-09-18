import { BACKGROUND_HEX_OPACITY } from "constants/strings";
import { styled } from "@material-ui/core";

export const BottomMenuContainer = styled("div")(({ theme }) => ({
  paddingRight: theme.spacing(5),
  paddingLeft: theme.spacing(5),
  bottom: theme.spacing(5),
  justifyContent: "center",
  position: "absolute",
  display: "flex",
  width: "100%",
}));

export const MenuCard = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.default + BACKGROUND_HEX_OPACITY,
  borderRadius: theme.spacing(2),
  boxShadow: theme.shadows[2],
  padding: theme.spacing(2),
  position: "relative",
  width: "100%",
  opacity: 0.3,
}));
