import { styled, Theme } from "@material-ui/core";

type Props = {
  theme: Theme;
  fullwidth?: number;
};

export const FlexColumn = styled("div")(({ fullwidth }: Props) => ({
  display: "flex",
  flexDirection: "column",
  ...(fullwidth && { width: "100%" }),
}));

export const FlexRow = styled("div")(({ fullwidth }: Props) => ({
  display: "flex",
  ...(fullwidth && { width: "100%" }),
}));

export const FlexRowCentered = styled("div")(({ fullwidth }: Props) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  ...(fullwidth && { width: "100%" }),
}));

export const FlexRowBetween = styled("div")(({ fullwidth }: Props) => ({
  display: "flex",
  justifyContent: "space-between",
  ...(fullwidth && { width: "100%" }),
}));

export const FlexRowAround = styled("div")(({ fullwidth }: Props) => ({
  display: "flex",
  justifyContent: "space-around",
  ...(fullwidth && { width: "100%" }),
}));

export const FlexRowPadded = styled("div")(
  ({ fullwidth, theme, spacing }: Props & { spacing?: number }) => ({
    display: "flex",
    alignItems: "center",
    "& > *:not(:last-child)": {
      marginRight: theme.spacing(spacing || 2),
    },
    ...(fullwidth && { width: "100%" }),
  })
);
