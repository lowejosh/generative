import React, { useCallback } from "react";
import { Box } from "@material-ui/core";

import { ColorPicker } from "components/menu/ColorPicker/ColorPicker";
import { MenuSlider } from "components/menu/MenuSlider/MenuSlider";
import { MenuItemWrapper } from "components/generic";

import { CityscapeMenuSectionProps } from "../Cityscape.types";

const sliderParams = {
  min: 0,
  max: 1,
  step: 0.01,
};

export const CityscapeColorMenu = ({
  state,
  set,
}: CityscapeMenuSectionProps) => {
  return (
    <Box>
      <MenuItemWrapper>
        <ColorPicker
          setColor={useCallback((val: string) => set.topSkyColor(val), [set])}
          color={state.topSkyColor}
          title="Top sky color"
          refresh
        />
        <ColorPicker
          color={state.bottomSkyColor}
          title="Bottom sky color"
          refresh
          setColor={useCallback(
            (val: string) => set.bottomSkyColor(val),
            [set]
          )}
        />
        <ColorPicker
          setColor={useCallback((val: string) => set.buildingColor(val), [set])}
          color={state.buildingColor}
          title="Building color"
          refresh
        />
        <ColorPicker
          setColor={useCallback((val: string) => set.windowColor(val), [set])}
          color={state.windowColor}
          title="Window color"
          refresh
        />
      </MenuItemWrapper>
      <MenuItemWrapper>
        <MenuSlider
          setValue={useCallback((val: number) => set.colorVariance(val), [set])}
          value={state.colorVariance}
          title="Color variance"
          {...sliderParams}
          min={0.01}
          refresh
        />
        <MenuSlider
          setValue={useCallback((val: number) => set.fogIncrement(val), [set])}
          value={state.fogIncrement}
          title="Fog increment"
          {...sliderParams}
          refresh
        />
      </MenuItemWrapper>
    </Box>
  );
};
