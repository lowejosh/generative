import { theme } from "utils/constants/theme";
import { styled } from "@material-ui/core";

export const MenuContainer = styled("div")({
  paddingRight: theme.spacing(5),
  paddingLeft: theme.spacing(5),
  bottom: theme.spacing(5),
  justifyContent: "center",
  position: "absolute",
  display: "flex",
  width: "100%",
});

export const MenuCard = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.default + "AA",
  borderRadius: theme.spacing(2),
  padding: theme.spacing(3),
  width: "100%",
  opacity: 0.3,
}));
