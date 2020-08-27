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

/**
 * Returns a debounced color value from a colorpicker
 */
export const ColorPicker = ({ color, setColor, title }: Props) => {
  const [localColor, setLocalColor] = useState(color);
  const debouncedLocalColor = useDebounce(localColor, DEBOUNCE_DELAY);

  useEffect(() => {
    setColor(debouncedLocalColor);
  }, [debouncedLocalColor, setColor]);

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
