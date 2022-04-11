import React, { useCallback } from "react";
import { Box } from "@material-ui/core";

import { MenuSlider } from "components/menu/MenuSlider/MenuSlider";
import { MenuItemWrapper } from "components/generic";

import { CityscapeMenuSectionProps } from "../Cityscape.types";

const sliderParams = {
  min: 0,
  max: 750,
  step: 1,
};

export const CityScapeBuildingMenu = ({
  state,
  set,
}: CityscapeMenuSectionProps) => {
  return (
    <Box>
      <MenuItemWrapper>
        <MenuSlider
          setValue={useCallback((val: number) => set.fogIncrement(val), [set])}
          value={state.minHeight}
          title="Min height"
          {...sliderParams}
          step={0.01}
          refresh
        />
        <MenuSlider
          setValue={useCallback((val: number) => set.colorVariance(val), [set])}
          value={state.maxHeight}
          title="Max height"
          {...sliderParams}
          refresh
        />
      </MenuItemWrapper>
      <MenuItemWrapper>
        <MenuSlider
          setValue={useCallback((val: number) => set.minWidth(val), [set])}
          value={state.minWidth}
          title="Min width"
          {...sliderParams}
          refresh
        />
        <MenuSlider
          setValue={useCallback((val: number) => set.maxWidth(val), [set])}
          value={state.maxWidth}
          title="Max width"
          {...sliderParams}
        />
      </MenuItemWrapper>
      <MenuItemWrapper>
        <MenuSlider
          setValue={useCallback((val: number) => set.rowAmount(val), [set])}
          value={state.rowAmount}
          title="Row amount"
          {...sliderParams}
          max={25}
          min={1}
          refresh
        />
        <MenuSlider
          value={state.increaseMaxHeightAmount}
          title="Max height increase from new row"
          {...sliderParams}
          max={200}
          refresh
          setValue={useCallback(
            (val: number) => set.increaseMaxHeightAmount(val),
            [set]
          )}
        />
      </MenuItemWrapper>
    </Box>
  );
};
