import React, { useState, useEffect } from "react";
import { IconButton, styled, Typography } from "@material-ui/core";
import { FlexRowPadded } from "components/generic";
import { useDebounce } from "hooks";
import { DEBOUNCE_DELAY } from "constants/numbers";

const Input = styled("input")({
  backgroundColor: "transparent",
  WebkitAppearance: "none",
  borderRadius: "100%",
  cursor: "pointer",
  outline: "none",
  border: "none",
  height: "18px",
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
 * Returns a debounced color value from a colorpicker to limit full re-renders
 */
export const ColorPicker = ({ color, setColor, title }: Props) => {
  const [localColor, setLocalColor] = useState(color);
  const debouncedLocalColor = useDebounce(localColor, DEBOUNCE_DELAY);

  // if the debounce delay triggers, set the higher scoped variable
  useEffect(() => {
    setColor(debouncedLocalColor);
  }, [debouncedLocalColor, setColor]);

  // set the state locally upon every change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setLocalColor(e.target.value);

  return (
    <FlexRowPadded spacing={1} style={{ padding: "6px" }}>
      <IconButton size="small">
        <Input type="color" onChange={handleChange} value={color} />
      </IconButton>
      {title && <Typography variant="caption">{title}</Typography>}
    </FlexRowPadded>
  );
};
