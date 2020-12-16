import { MenuCheckbox } from "components/menu/MenuCheckbox/MenuCheckbox";
import { MenuSlider } from "components/menu/MenuSlider/MenuSlider";
import { formatPixelValue } from "utils/menu/formatting";
import { MenuItemWrapper } from "components/generic";
import React, { useCallback } from "react";
import { Box } from "@material-ui/core";
import {
  PerlinFlowMenuSectionProps,
  PerlinFlowMenuProps,
} from "../PerlinFlow.types";
import { ColorPicker } from "components/menu/ColorPicker/ColorPicker";

const sliderParams = {
  min: 1,
  max: 10,
  step: 1,
};

export const PerlinFlowCanvasMenu = ({
  p5Instance,
  state,
  set,
}: PerlinFlowMenuSectionProps & PerlinFlowMenuProps) => (
  <Box>
    <MenuItemWrapper>
      <MenuSlider
        setValue={useCallback((val: number) => set.vectorPadding(val), [set])}
        labelFormat={formatPixelValue}
        value={state.vectorPadding}
        title="Placeholder"
        {...sliderParams}
        max={50}
        min={5}
      />
    </MenuItemWrapper>
    <MenuCheckbox
      checked={state.clearScreen}
      title="Refresh Background"
      setChecked={useCallback(
        (val: boolean) => {
          p5Instance?.background(state.bgColor);
          set.viewForceVectors(false);
          set.clearScreen(val);
        },
        [set, p5Instance, state.bgColor]
      )}
    />
    <MenuCheckbox
      checked={state.clearScreen && state.viewForceVectors}
      disabled={!state.clearScreen}
      setChecked={useCallback((val: boolean) => set.viewForceVectors(val), [
        set,
      ])}
      title={`Show Force Vectors${
        !state.clearScreen ? " (Disabled when not refreshing screen)" : ""
      }`}
    />
    <ColorPicker
      color={state.bgColor}
      setColor={useCallback((val: string) => set.bgColor(val), [set])}
      title="Background Color"
    />
  </Box>
);
