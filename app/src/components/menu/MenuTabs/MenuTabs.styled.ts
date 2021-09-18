import { styled, Tab } from "@material-ui/core";

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
  left: 0,
  top: 0,
}));
