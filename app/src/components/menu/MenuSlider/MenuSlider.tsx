import { Slider, Tooltip, Typography } from "@material-ui/core";
import { FlexColumn } from "components/generic";
import React, { useState, useEffect } from "react";
import { useDebounce } from "hooks";
import { DEBOUNCE_DELAY } from "constants/numbers";

type Props = {
  setValue: Function;
  value: number;
  min: number;
  max: number;
  labelFormat?: string | ((value: number, index: number) => string) | undefined;
  disabled?: boolean;
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
  tooltip,
  title,
  step,
}: Props) => {
  const [localValue, setLocalValue] = useState(value);
  const debouncedLocalValue = useDebounce(localValue, DEBOUNCE_DELAY);

  useEffect(() => {
    setValue(debouncedLocalValue);
  }, [debouncedLocalValue, setValue]);

  const handleChange = (e: React.ChangeEvent<{}>, val: number | number[]) => {
    setLocalValue(Number(val));
  };

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
