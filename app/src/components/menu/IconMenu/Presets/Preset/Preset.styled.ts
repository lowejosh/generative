import { BACKGROUND_HEX_OPACITY } from "constants/strings";
import { MenuItem, styled } from "@material-ui/core";

export const PresetContainer = styled(MenuItem)(({ theme }) => ({
  backgroundColor: theme.palette.background.default + BACKGROUND_HEX_OPACITY,
  padding: theme.spacing(1),
  textAlign: "right",
  width: "200px",
}));
