import React, { useState, useEffect } from "react";
import { styled, Typography } from "@material-ui/core";
import { FlexRowPadded } from "components/StyledUI";
import { useDebounce } from "hooks";
import { DEBOUNCE_DELAY } from "constants/numbers";

const Input = styled("input")({
  WebkitAppearance: "none",
  borderRadius: "100%",
  cursor: "pointer",
  outline: "none",
  border: "none",
  height: "20px",
  width: "20px",

  "&::-webkit-color-swatch-wrapper": {
    padding: 0,
  },

  "&::-webkit-color-swatch": {
    borderRadius: "100%",
    border: "none",
  },
});

type Props = {
  setColor: Function;
  color: string;
  title?: string;
};

export const ColorPicker = ({ color, setColor, title }: Props) => {
  /*
   for chrome at-least the colorpicker is re-rendered a LOT during the color selection, so there is a local
  value which is debounced before the color value is updated
  */
  const [localColor, setLocalColor] = useState(color);
  const debouncedLocalColor = useDebounce(localColor, DEBOUNCE_DELAY);

  useEffect(() => {
    console.log("reached");
    setColor(debouncedLocalColor);
  }, [debouncedLocalColor]);

  return (
    <FlexRowPadded spacing={1}>
      <Input
        type="color"
        onChange={(e) => setLocalColor(e.target.value)}
        value={color}
      />
      {title && <Typography variant="caption">{title}</Typography>}
    </FlexRowPadded>
  );
};
