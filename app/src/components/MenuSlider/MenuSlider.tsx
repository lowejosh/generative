import { Slider, Typography } from "@material-ui/core";
import { FlexColumn } from "components/StyledUI";
import React from "react";

type Props = {
  setValue: Function;
  value: number;
  min: number;
  max: number;
  title?: string;
  step?: number;
};

export const MenuSlider = ({
  setValue,
  value,
  min,
  max,
  title,
  step,
}: Props) => {
  const handleChange = (e: React.ChangeEvent<{}>, val: number | number[]) => {
    setValue(Number(val));
  };

  return (
    <FlexColumn fullWidth>
      {title && <Typography variant="caption">{title}</Typography>}
      <Slider
        value={typeof value === "number" ? value : 0}
        onChange={handleChange}
        getAriaValueText={(val) => val.toString()}
        valueLabelDisplay="auto"
        step={step || 1}
        min={min}
        color="primary"
        max={max}
      />
    </FlexColumn>
  );
};