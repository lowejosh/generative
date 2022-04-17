import { styled, Tab, Theme } from "@material-ui/core";

export const StyledTab = styled(Tab)<Theme, { selected?: boolean }>(
  ({ theme, selected }) => ({
    ...(!selected
      ? {
          color: theme.palette.text.disabled,
        }
      : {}),
    "&:first-child": {
      borderTopLeftRadius: theme.spacing(2),
    },
  })
);

export const MenuTabsWrapper = styled("div")(({ theme }) => ({
  position: "absolute",
  display: "flex",
  width: "100%",
  left: 0,
  top: 0,
}));
