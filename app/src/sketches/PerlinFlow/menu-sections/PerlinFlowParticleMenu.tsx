import { ColorPicker } from "components/menu/ColorPicker/ColorPicker";
import { MenuSlider } from "components/menu/MenuSlider/MenuSlider";
import { PerlinFlowMenuSectionProps } from "../PerlinFlow.types";
import { formatPercentValue, formatPixelValue } from "utils/menu/formatting";
import { MenuItemWrapper } from "components/generic";
import React, { useCallback } from "react";
import { Box } from "@material-ui/core";
import { MenuCheckbox } from "components/menu/MenuCheckbox/MenuCheckbox";

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
      <MenuSlider
        title="Particle Size"
        value={state.particleSize}
        labelFormat={formatPixelValue}
        setValue={useCallback((val: number) => set.particleSize(val), [set])}
        {...sliderParams}
      />
      <MenuSlider
        tooltip={!state.drawTrails ? "Disabled when not drawing trails" : ""}
        title="Trail Length"
        value={state.trailLength}
        labelFormat={formatPixelValue}
        setValue={useCallback((val: number) => set.trailLength(val), [set])}
        disabled={!state.drawTrails}
        {...sliderParams}
      />
    </MenuItemWrapper>
    <MenuItemWrapper>
      <MenuCheckbox
        checked={state.drawTrails}
        setChecked={useCallback((val: boolean) => set.drawTrails(val), [set])}
        title="Draw Trails"
      />
    </MenuItemWrapper>
    <ColorPicker
      setColor={useCallback((val: string) => set.particleColor(val), [set])}
      color={state.particleColor}
      title="Particle Color"
    />
  </Box>
);
