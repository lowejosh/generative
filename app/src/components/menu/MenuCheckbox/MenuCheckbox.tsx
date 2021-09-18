import { Checkbox, Tooltip, Typography } from "@material-ui/core";
import { FlexRowPadded } from "components/generic";
import React, { useCallback } from "react";
import { useMenuWrapperContext } from "../MenuWrapper/MenuWrapper.provider";

type Props = {
  setChecked: Function;
  disabled?: boolean;
  refresh?: boolean;
  tooltip?: string;
  checked: boolean;
  title?: string;
};

export const MenuCheckbox = ({
  setChecked,
  disabled,
  refresh,
  tooltip,
  checked,
  title,
}: Props) => {
  const { refreshAnimation } = useMenuWrapperContext();

  const handleChange = useCallback(
    (e: React.ChangeEvent<{}>, val: boolean) => {
      if (val !== checked) {
        setChecked(Boolean(val));
        if (refresh) {
          refreshAnimation();
        }
      }
    },
    [checked, refreshAnimation, refresh, setChecked]
  );

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
