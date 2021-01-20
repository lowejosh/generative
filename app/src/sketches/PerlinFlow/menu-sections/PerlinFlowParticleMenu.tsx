import { ColorPicker } from "components/menu/ColorPicker/ColorPicker";
import { MenuSlider } from "components/menu/MenuSlider/MenuSlider";
import { PerlinFlowMenuSectionProps } from "../PerlinFlow.types";
import { formatPercentValue, formatPixelValue } from "utils/menu/formatting";
import { MenuItemWrapper } from "components/generic";
import React, { useCallback } from "react";
import { Box } from "@material-ui/core";

const sliderParams = {
  max: 10,
  step: 1,
  min: 1,
};

export const PerlinFlowParticleMenu = ({
  state,
  set,
}: PerlinFlowMenuSectionProps) => (
  <Box>
    <MenuItemWrapper>
      <MenuSlider
        title="Max Velocity"
        value={state.maxVelocity}
        setValue={useCallback((val: number) => set.maxVelocity(val), [set])}
        {...sliderParams}
        max={15}
      />
    </MenuItemWrapper>
    <MenuItemWrapper>
      <MenuSlider
        title="Opacity"
        value={state.particleOpacity}
        labelFormat={formatPercentValue}
        setValue={useCallback((val: number) => set.particleOpacity(val), [set])}
        min={0.1}
        step={0.1}
        max={100}
      />
    </MenuItemWrapper>
    <ColorPicker
      setColor={useCallback((val: string) => set.particleColor(val), [set])}
      color={state.particleColor}
      title="Particle Color"
    />
  </Box>
);
