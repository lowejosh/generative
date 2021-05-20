import { useMenuWrapperContext } from "components/menu/MenuWrapper/MenuWrapper.provider";
import React, { Fragment, MouseEvent, useCallback, useState } from "react";
import { PresetsContainer } from "./Presets.styled";
import { IconWrapper } from "../IconMenu.styled";
import { Bookmarks } from "@material-ui/icons";
import { PresetData } from "./Presets.types";
import { Preset } from "./Preset/Preset";

type Props = { presets: PresetData<object> };

export const Presets = ({ presets }: Props) => {
  const { show } = useMenuWrapperContext();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event?.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  return (
    <Fragment>
      <IconWrapper onClick={handleClick}>
        <Bookmarks color="primary" />
      </IconWrapper>
      <PresetsContainer
        transformOrigin={{ horizontal: "center", vertical: -60 }}
        open={Boolean(anchorEl && show)}
        onClose={handleClose}
        anchorEl={anchorEl}
      >
        {presets.map((preset, index) => (
          <Preset key={index} preset={preset} />
        ))}
      </PresetsContainer>
    </Fragment>
  );
};
