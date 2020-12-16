import { ColorPicker } from "components/menu/ColorPicker/ColorPicker";
import { MenuSlider } from "components/menu/MenuSlider/MenuSlider";
import { PerlinFlowMenuSectionProps } from "../PerlinFlow.types";
import { formatPixelValue } from "utils/menu/formatting";
import { MenuItemWrapper } from "components/generic";
import React, { useCallback } from "react";
import { Box } from "@material-ui/core";

const sliderParams = {
  min: 1,
  max: 10,
  step: 1,
};

export const PerlinFlowParticleMenu = ({
  state,
  set,
}: PerlinFlowMenuSectionProps) => (
  <Box>
    <MenuItemWrapper>
      <MenuSlider
        title="Placeholder"
        value={state.vectorPadding}
        labelFormat={formatPixelValue}
        setValue={useCallback((val: number) => set.vectorPadding(val), [set])}
        {...sliderParams}
        min={5}
        max={50}
      />
    </MenuItemWrapper>
    <ColorPicker
      setColor={useCallback((val: string) => set.particleColor(val), [set])}
      color={state.particleColor}
      title="Particle Color"
    />
  </Box>
);