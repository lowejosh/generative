import { MenuSlider } from "components/menu/MenuSlider/MenuSlider";
import { PerlinFlowMenuSectionProps } from "../PerlinFlow.types";
import { formatPixelValue } from "utils/menu/formatting";
import { MenuItemWrapper } from "components/generic";
import React, { useCallback } from "react";
import { Box } from "@material-ui/core";
import { MenuCheckbox } from "components/menu/MenuCheckbox/MenuCheckbox";

const sliderParams = {
  min: 1,
  max: 10,
  step: 1,
};

export const PerlinFlowCanvasMenu = ({
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
    <MenuCheckbox
      checked={state.viewForceVectors}
      setChecked={useCallback((val: boolean) => set.viewForceVectors(val), [
        set,
      ])}
      title="Show Force Vectors"
    />
  </Box>
);
