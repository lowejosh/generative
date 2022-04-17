import React, { useCallback } from "react";
import { Box } from "@material-ui/core";

import { ColorPicker } from "components/menu/ColorPicker/ColorPicker";
import { MenuSlider } from "components/menu/MenuSlider/MenuSlider";
import { MenuItemWrapper } from "components/generic";

import { CityscapeMenuSectionProps } from "../Cityscape.types";

const sliderParams = {
  min: 0,
  max: 15,
  step: 1,
};

export const CityscapeStarsMenu = ({
  state,
  set,
}: CityscapeMenuSectionProps) => {
  return (
    <Box>
      <MenuItemWrapper>
        <ColorPicker
          setColor={useCallback((val: string) => set.starColor(val), [set])}
          color={state.starColor}
          title="Star color"
          refresh
        />
      </MenuItemWrapper>
      <MenuItemWrapper>
        <MenuSlider
          setValue={useCallback((val: number) => set.starAmount(val), [set])}
          value={state.starAmount}
          title="Star amount"
          {...sliderParams}
          max={15000}
          refresh
        />
        <MenuSlider
          setValue={useCallback((val: number) => set.minStarSize(val), [set])}
          value={state.minStarSize}
          title="Min star size"
          {...sliderParams}
          max={state.maxStarSize}
          refresh
        />
        <MenuSlider
          setValue={useCallback((val: number) => set.maxStarSize(val), [set])}
          value={state.maxStarSize}
          title="Max star size"
          {...sliderParams}
          refresh
        />
      </MenuItemWrapper>
    </Box>
  );
};
