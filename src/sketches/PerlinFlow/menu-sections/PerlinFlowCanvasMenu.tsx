import { MenuCheckbox } from "components/menu/MenuCheckbox/MenuCheckbox";
import { MenuItemWrapper } from "components/generic";
import React, { useCallback } from "react";
import { Box } from "@material-ui/core";
import {
  PerlinFlowMenuSectionProps,
  PerlinFlowMenuProps,
} from "../PerlinFlow.types";
import { ColorPicker } from "components/menu/ColorPicker/ColorPicker";

export const PerlinFlowCanvasMenu = ({
  p5Instance,
  state,
  set,
}: PerlinFlowMenuSectionProps & PerlinFlowMenuProps) => (
  <Box>
    <MenuItemWrapper>
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
        title="Show Force Vectors"
        tooltip={
          !state.clearScreen ? "Disabled when not refreshing screen" : ""
        }
        setChecked={useCallback(
          (val: boolean) => set.viewForceVectors(val),
          [set]
        )}
      />
    </MenuItemWrapper>
    <ColorPicker
      title="Background Color"
      color={state.bgColor}
      setColor={useCallback((val: string) => set.bgColor(val), [set])}
    />
  </Box>
);
