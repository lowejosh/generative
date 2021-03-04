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
        title="Particle Amount"
        value={state.particleAmount}
        setValue={useCallback((val: number) => set.particleAmount(val), [set])}
        {...sliderParams}
        max={5000}
      />
      <MenuSlider
        title="Max Velocity"
        value={state.maxVelocity}
        setValue={useCallback((val: number) => set.maxVelocity(val), [set])}
        {...sliderParams}
        max={15}
      />
      <MenuSlider
        title="Mass"
        value={state.mass}
        setValue={useCallback((val: number) => set.mass(val), [set])}
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
        setValue={useCallback((val: number) => set.trailLength(val), [set])}
        disabled={!state.drawTrails}
        {...sliderParams}
        max={100}
      />
    </MenuItemWrapper>
    <MenuItemWrapper>
      <MenuCheckbox
        checked={state.drawTrails}
        setChecked={useCallback((val: boolean) => set.drawTrails(val), [set])}
        title="Draw Trails"
      />
      <MenuCheckbox
        checked={state.avoidBorders}
        setChecked={useCallback((val: boolean) => set.avoidBorders(val), [set])}
        title="Avoid Borders"
      />
      <MenuCheckbox
        disabled={state.avoidBorders}
        checked={state.swapSidesAtBorder}
        setChecked={useCallback((val: boolean) => set.swapSidesAtBorder(val), [
          set,
        ])}
        title="Swap Sides at Border"
      />
    </MenuItemWrapper>
    <MenuItemWrapper>
      <MenuCheckbox
        checked={state.randomColor}
        setChecked={useCallback((val: boolean) => set.randomColor(val), [set])}
        title="Random Color"
      />
      <MenuCheckbox
        checked={state.randomParticlePositions}
        setChecked={useCallback(
          (val: boolean) => set.randomParticlePositions(val),
          [set]
        )}
        title="Random Positions"
      />
    </MenuItemWrapper>
    <ColorPicker
      tooltip={state.randomColor ? "Disabled when showing random color" : ""}
      disabled={state.randomColor}
      setColor={useCallback((val: string) => set.particleColor(val), [set])}
      color={state.particleColor}
      title="Particle Color"
    />
  </Box>
);
