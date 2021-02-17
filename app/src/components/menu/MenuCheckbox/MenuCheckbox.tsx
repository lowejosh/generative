import { Checkbox, Tooltip, Typography } from "@material-ui/core";
import { FlexRowPadded } from "components/generic";
import React from "react";

type Props = {
  setChecked: Function;
  disabled?: boolean;
  tooltip?: string;
  checked: boolean;
  title?: string;
};

export const MenuCheckbox = ({
  setChecked,
  disabled,
  tooltip,
  checked,
  title,
}: Props) => {
  const handleChange = (e: React.ChangeEvent<{}>, val: boolean) => {
    setChecked(Boolean(val));
  };

  return (
    <Tooltip title={tooltip || ""}>
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
    </Tooltip>
  );
};
