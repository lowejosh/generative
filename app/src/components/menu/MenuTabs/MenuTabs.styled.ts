import { darken, lighten, rgbToHex, styled, Tab } from "@material-ui/core";
import { BACKGROUND_HEX_OPACITY } from "constants/strings";

export const StyledTab = styled(Tab)(({ theme }) => ({
  //   backgroundColor: rgbToHex(lighten(theme.palette.background.default, 0.1)),
  "&:first-child": {
    borderTopLeftRadius: theme.spacing(2),
  },
}));

export const MenuTabsWrapper = styled("div")(({ theme }) => ({
  position: "absolute",
  display: "flex",
  width: "100%",
  top: 0,
  left: 0,
}));
