import { Checkbox, Typography } from "@material-ui/core";
import { FlexRowPadded } from "components/generic";
import React from "react";

type Props = {
  setChecked: Function;
  disabled?: boolean;
  checked: boolean;
  title?: string;
};

export const MenuCheckbox = ({
  setChecked,
  disabled,
  checked,
  title,
}: Props) => {
  const handleChange = (e: React.ChangeEvent<{}>, val: boolean) => {
    setChecked(Boolean(val));
  };

  return (
    <FlexRowPadded spacing={0.5}>
      <Checkbox
        onChange={handleChange}
        disabled={disabled}
        checked={checked}
        color="primary"
        size="small"
      />
      {title && <Typography variant="caption">{title}</Typography>}
    </FlexRowPadded>
  );
};
