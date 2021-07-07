import { styled } from "@material-ui/core";
import { FlexRow } from "./Flex";

export const MenuItemWrapper = styled(FlexRow)(({ theme }) => ({
  "& > div:not(:last-child)": {
    marginRight: theme.spacing(2),
  },
}));

export const SketchDiv = styled("div")({});
