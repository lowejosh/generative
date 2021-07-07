import { initialEpicycloidVars, EpicycloidVars } from "./Epicycloid.variables";
import { StandardIconMenu } from "components/menu/IconMenu/StandardIconMenu/StandardIconMenu";
import { MenuCheckbox } from "components/menu/MenuCheckbox/MenuCheckbox";
import { ColorPicker } from "components/menu/ColorPicker/ColorPicker";
import { MenuItemWrapper, FlexRowPadded } from "components/generic";
import { MenuSlider } from "components/menu/MenuSlider/MenuSlider";
import { BottomMenu } from "components/menu/BottomMenu";
import React, { Fragment, useCallback } from "react";
import { useGenericReducer } from "utils/data/state";
import { TIME_TO_IDLE } from "constants/numbers";
import { useUpdateP5 } from "hooks/useUpdateP5";
import { P5Instance } from "types/p5";
import { useIdle } from "hooks";
import {
  formatPercentValue,
  formatTimesValue,
  formatPixelValue,
} from "utils/menu/formatting";
import { MenuWrapper } from "components/menu/MenuWrapper/MenuWrapper";

type Props = {
  p5Instance: P5Instance<EpicycloidVars> | null;
};

const sliderParams = {
  min: 0,
  max: 100,
  step: 1,
};

export const EpicycloidMenu = ({ p5Instance }: Props) => {
  const isIdle = useIdle(TIME_TO_IDLE);
  const { state, set, setState } = useGenericReducer<EpicycloidVars>(
    initialEpicycloidVars
  );
  useUpdateP5<EpicycloidVars>(p5Instance, state);

  return (
    <MenuWrapper setState={setState} p5Instance={p5Instance} show={!isIdle}>
      <StandardIconMenu
        disableLoopControl={!state.isAutoplaying}
        initialLoopControl
      />
      <BottomMenu>
        <Fragment>
          <MenuItemWrapper>
            <MenuSlider
              title="Radius"
              value={state.radius}
              setValue={useCallback((val: number) => set.radius(val), [set])}
              {...sliderParams}
              min={100}
              max={800}
            />
            <MenuSlider
              title="Stroke Width"
              labelFormat={formatPixelValue}
              value={state.strokeWidth}
              setValue={useCallback(
                (val: number) => set.strokeWidth(val),
                [set]
              )}
              step={1}
              min={1}
              max={5}
            />
            <MenuSlider
              title="Stroke Opacity"
              labelFormat={formatPercentValue}
              value={state.strokeOpacity}
              setValue={useCallback(
                (val: number) => set.strokeOpacity(val),
                [set]
              )}
              {...sliderParams}
            />
          </MenuItemWrapper>
          <MenuItemWrapper>
            <MenuSlider
              title="Total Vertices"
              value={state.totalVertices}
              setValue={useCallback(
                (val: number) => set.totalVertices(val),
                [set]
              )}
              {...sliderParams}
              min={0}
              max={1000}
            />
            <MenuSlider
              disabled={state.isAutoplaying}
              title={`Factor${
                state.isAutoplaying ? " (Disabled when autoplaying)" : ""
              }`}
              labelFormat={formatTimesValue}
              value={state.factor}
              setValue={useCallback((val: number) => set.factor(val), [set])}
              {...sliderParams}
            />
            <MenuSlider
              disabled={!state.isAutoplaying}
              title={`Autoplay Speed${
                !state.isAutoplaying ? " (Disabled when not autoplaying)" : ""
              }`}
              labelFormat={formatTimesValue}
              value={state.autoplaySpeed * 100}
              setValue={useCallback(
                (val: number) => set.autoplaySpeed(val / 100),
                [set]
              )}
              {...sliderParams}
              max={10}
              step={0.1}
            />
          </MenuItemWrapper>
          <FlexRowPadded spacing={3}>
            <MenuCheckbox
              checked={state.isAutoplaying}
              setChecked={useCallback(
                (val: boolean) => set.isAutoplaying(val),
                [set]
              )}
              title="Autoplay"
            />
            <ColorPicker
              color={state.strokeColor}
              setColor={useCallback(
                (val: string) => set.strokeColor(val),
                [set]
              )}
              title="Stroke Color"
            />
            <ColorPicker
              color={state.bgColor}
              setColor={useCallback((val: string) => set.bgColor(val), [set])}
              title="Background Color"
            />
          </FlexRowPadded>
        </Fragment>
      </BottomMenu>
    </MenuWrapper>
  );
};
