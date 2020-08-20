import { styled, Theme } from "@material-ui/core";

type Props = {
  theme: Theme;
  fullWidth?: boolean;
};

export const FlexColumn = styled("div")(({ fullWidth }: Props) => ({
  display: "flex",
  flexDirection: "column",
  ...(fullWidth && { width: "100%" }),
}));

export const FlexRow = styled("div")(({ fullWidth }: Props) => ({
  display: "flex",
  ...(fullWidth && { width: "100%" }),
}));

export const FlexRowCentered = styled("div")(({ fullWidth }: Props) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  ...(fullWidth && { width: "100%" }),
}));

export const FlexRowBetween = styled("div")(({ fullWidth }: Props) => ({
  display: "flex",
  justifyContent: "space-between",
  ...(fullWidth && { width: "100%" }),
}));

export const FlexRowAround = styled("div")(({ fullWidth }: Props) => ({
  display: "flex",
  justifyContent: "space-around",
  ...(fullWidth && { width: "100%" }),
}));

export const FlexRowPadded = styled("div")(({ fullWidth, theme }: Props) => ({
  display: "flex",
  alignItems: "center",
  "& > *:not(:last-child)": {
    marginRight: theme.spacing(1),
  },
  ...(fullWidth && { width: "100%" }),
}));
