import { useMenuWrapperContext } from "../MenuWrapper/MenuWrapper.provider";
import { Slider, Tooltip, Typography } from "@material-ui/core";
import React, { useState, useEffect, useCallback } from "react";
import { DEFAULT_DEBOUNCE_DELAY } from "constants/numbers";
import { FlexColumn } from "components/generic";
import { useDebounce } from "hooks";
import { useUpdateLocalStateWhenChanged } from "hooks/useUpdateIfChanged";

type Props = {
  setValue: Function;
  value: number;
  min: number;
  max: number;
  labelFormat?: string | ((value: number, index: number) => string) | undefined;
  disabled?: boolean;
  refresh?: boolean;
  tooltip?: string;
  title?: string;
  step?: number;
};

export const MenuSlider = ({
  setValue,
  value,
  min,
  max,
  labelFormat,
  disabled,
  refresh,
  tooltip,
  title,
  step,
}: Props) => {
  const [localValue, setLocalValue] = useState(value);
  const { refreshAnimation, debounceDelay } = useMenuWrapperContext();
  const debouncedLocalValue = useDebounce(
    localValue,
    debounceDelay || DEFAULT_DEBOUNCE_DELAY
  );

  useEffect(() => {
    if (debouncedLocalValue !== value) {
      setValue(debouncedLocalValue);
      if (refresh) {
        refreshAnimation();
      }
    }
  }, [debouncedLocalValue, setValue, refresh, refreshAnimation, value]);

  useUpdateLocalStateWhenChanged(value, setLocalValue);

  const handleChange = useCallback(
    (e: React.ChangeEvent<{}>, val: number | number[]) => {
      if (val !== value) {
        setLocalValue(Number(val));
      }
    },
    [value]
  );

  return (
    <Tooltip title={tooltip || ""}>
      <FlexColumn fullwidth={1}>
        {title && <Typography variant="caption">{title}</Typography>}
        <Slider
          disabled={disabled}
          valueLabelFormat={labelFormat}
          value={typeof localValue === "number" ? localValue : 0}
          onChange={handleChange}
          getAriaValueText={(val) => val.toString()}
          valueLabelDisplay="auto"
          step={step || 1}
          min={min}
          color={localValue === debouncedLocalValue ? "primary" : "secondary"} // shows a different color if still debouncing
          style={{ transition: "0.3s" }}
          max={max}
        />
      </FlexColumn>
    </Tooltip>
  );
};
