import { FormControlLabel, Checkbox, Typography } from "@material-ui/core";
import { FlexColumn, FlexRow, FlexRowPadded } from "components/StyledUI";
import React from "react";

type Props = {
  setChecked: Function;
  checked: boolean;
  title?: string;
};

export const MenuCheckbox = ({ setChecked, checked, title }: Props) => {
  const handleChange = (e: React.ChangeEvent<{}>, val: boolean) => {
    setChecked(Boolean(val));
  };

  return (
    <FlexRowPadded spacing={0.5}>
      <Checkbox
        checked={checked}
        onChange={handleChange}
        color="primary"
        size="small"
      />
      {title && <Typography variant="caption">{title}</Typography>}
    </FlexRowPadded>
  );
};
