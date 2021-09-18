import { IconButton, styled, Tooltip, Typography } from "@material-ui/core";
import { useUpdateLocalStateWhenChanged } from "hooks/useUpdateIfChanged";
import React, { useState, useEffect } from "react";
import { FlexRowPadded } from "components/generic";
import { DEBOUNCE_DELAY } from "constants/numbers";
import { useDebounce } from "hooks";

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
  disabled?: boolean;
  tooltip?: string;
  title?: string;
  color: string;
};

/**
 * Returns a debounced color value from a colorpicker to limit full re-renders
 */
export const ColorPicker = ({
  setColor,
  disabled,
  tooltip,
  color,
  title,
}: Props) => {
  const [localColor, setLocalColor] = useState(color);
  const debouncedLocalColor = useDebounce(localColor, DEBOUNCE_DELAY);

  // if the debounce delay triggers, set the higher scoped variable
  useEffect(() => {
    setColor(debouncedLocalColor);
  }, [debouncedLocalColor, setColor]);

  useUpdateLocalStateWhenChanged(color, setLocalColor);

  // set the state locally upon every change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setLocalColor(e.target.value);

  return (
    <Tooltip title={tooltip || ""}>
      <FlexRowPadded spacing={1} style={{ padding: "6px" }}>
        <IconButton size="small" disabled={disabled}>
          <Input type="color" onChange={handleChange} value={color} />
        </IconButton>
        {title && <Typography variant="caption">{title}</Typography>}
      </FlexRowPadded>
    </Tooltip>
  );
};
