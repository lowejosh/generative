import { styled } from "@material-ui/core";
import { FlexRowBetween } from "./Flex";

export const MenuItemWrapper = styled(FlexRowBetween)(({ theme }) => ({
  "& > div:not(:last-child)": {
    marginRight: theme.spacing(2),
  },
}));
