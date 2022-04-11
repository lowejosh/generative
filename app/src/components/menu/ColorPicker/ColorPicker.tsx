import { IconButton, styled, Tooltip, Typography } from "@material-ui/core";
import { useMenuWrapperContext } from "../MenuWrapper/MenuWrapper.provider";
import { useUpdateLocalStateWhenChanged } from "hooks/useUpdateIfChanged";
import React, { useState, useEffect, useCallback } from "react";
import { FlexRowPadded } from "components/generic";
import { DEFAULT_DEBOUNCE_DELAY } from "constants/numbers";
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
  refresh?: boolean;
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
  refresh,
  tooltip,
  color,
  title,
}: Props) => {
  const [localColor, setLocalColor] = useState(color);
  const debouncedLocalColor = useDebounce(localColor, DEFAULT_DEBOUNCE_DELAY);
  const { refreshAnimation } = useMenuWrapperContext();

  // if the debounce delay triggers, set the higher scoped variable
  useEffect(() => {
    if (debouncedLocalColor !== color) {
      setColor(debouncedLocalColor);
      if (refresh) {
        refreshAnimation();
      }
    }
  }, [debouncedLocalColor, setColor, refresh, refreshAnimation, color]);

  useUpdateLocalStateWhenChanged(color, setLocalColor);

  // set the state locally upon every change
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val: string = e.target.value;
      if (val !== color) {
        setLocalColor(val);
      }
    },
    [color]
  );

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
