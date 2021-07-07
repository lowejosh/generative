import { createStyles, Menu, styled, withStyles } from "@material-ui/core";

export const PresetsContainer = styled(
  withStyles((theme) =>
    createStyles({
      list: {
        padding: 0,
      },
    })
  )(Menu)
)({});
