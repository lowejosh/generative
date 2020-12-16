import { Box } from "@material-ui/core";
import { MenuItemWrapper } from "components/generic";
import { MenuSlider } from "components/menu/MenuSlider/MenuSlider";
import React, { useCallback } from "react";
import { formatPixelValue, formatTimesValue } from "utils/menu/formatting";
import {
  PerlinFlowMenuProps,
  PerlinFlowMenuSectionProps,
} from "../PerlinFlow.types";

const sliderParams = {
  min: 1,
  max: 10,
  step: 1,
};

export const PerlinFlowNoiseMenu = ({
  state,
  set,
}: PerlinFlowMenuSectionProps) => (
  <Box>
    <MenuItemWrapper>
      <MenuSlider
        title="Vector Padding"
        value={state.vectorPadding}
        labelFormat={formatPixelValue}
        setValue={useCallback((val: number) => set.vectorPadding(val), [set])}
        {...sliderParams}
        min={5}
        max={50}
      />
      <MenuSlider
        title="Angle Variation"
        value={state.angleVariation}
        setValue={useCallback((val: number) => set.angleVariation(val), [set])}
        {...sliderParams}
        min={1}
        max={50}
      />
    </MenuItemWrapper>
    <MenuItemWrapper>
      <MenuSlider
        title="Perlin X Increment Scale"
        value={state.perlinXIncrementScale}
        labelFormat={formatTimesValue}
        setValue={useCallback((val: number) => set.perlinXIncrementScale(val), [
          set,
        ])}
        {...sliderParams}
      />
      <MenuSlider
        title="Perlin Y Increment Scale"
        value={state.perlinYIncrementScale}
        labelFormat={formatTimesValue}
        setValue={useCallback((val: number) => set.perlinYIncrementScale(val), [
          set,
        ])}
        {...sliderParams}
      />
      <MenuSlider
        title="Noise Speed"
        value={state.perlinZIncrementScale}
        setValue={useCallback((val: number) => set.perlinZIncrementScale(val), [
          set,
        ])}
        {...sliderParams}
        min={0}
        step={0.1}
      />
    </MenuItemWrapper>
  </Box>
);