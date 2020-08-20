import { theme } from "utils/constants/theme";
import { styled } from "@material-ui/core";
import { BACKGROUND_HEX_OPACITY } from "utils/constants/strings";

export const BottomMenuContainer = styled("div")({
  paddingRight: theme.spacing(5),
  paddingLeft: theme.spacing(5),
  bottom: theme.spacing(5),
  justifyContent: "center",
  position: "absolute",
  display: "flex",
  width: "100%",
});

export const MenuCard = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.default + BACKGROUND_HEX_OPACITY,
  borderRadius: theme.spacing(2),
  boxShadow: theme.shadows[2],
  padding: theme.spacing(3),
  width: "100%",
  opacity: 0.3,
}));
