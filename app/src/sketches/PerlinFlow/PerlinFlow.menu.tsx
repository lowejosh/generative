import { initialPerlinFlowVars, PerlinFlowVars } from "./PerlinFlow.variables";
import { StandardIconMenu } from "components/menu/IconMenu/StandardIconMenu";
import { formatPixelValue, formatTimesValue } from "utils/menu/formatting";
import { MenuSlider } from "components/menu/MenuSlider/MenuSlider";
import { BottomMenu } from "components/menu/BottomMenu";
import React, { Fragment, useCallback } from "react";
import { MenuItemWrapper } from "components/generic";
import { useGenericReducer } from "utils/data/state";
import { TIME_TO_IDLE } from "constants/numbers";
import { useUpdateP5 } from "hooks/useUpdateP5";
import { P5Instance } from "types/p5";
import { useIdle } from "hooks";

type Props = {
  p5Instance: P5Instance<PerlinFlowVars> | null;
};

const sliderParams = {
  min: 1,
  max: 10,
  step: 1,
};

export const PerlinFlowMenu = ({ p5Instance }: Props) => {
  const isIdle = useIdle(TIME_TO_IDLE);
  const { state, set } = useGenericReducer<PerlinFlowVars>(
    initialPerlinFlowVars
  );

  useUpdateP5<PerlinFlowVars>(p5Instance, state);

  return (
    <Fragment>
      <StandardIconMenu
        initialLoopControl={true}
        show={!isIdle}
        p5Instance={p5Instance}
      />
      <BottomMenu show={!isIdle}>
        <Fragment>
          <MenuItemWrapper>
            <MenuSlider
              title="Vector Padding"
              value={state.vectorPadding}
              labelFormat={formatPixelValue}
              setValue={useCallback((val: number) => set.vectorPadding(val), [
                set,
              ])}
              {...sliderParams}
              min={5}
              max={50}
            />
            <MenuSlider
              title="Angle Variation"
              value={state.angleVariation}
              setValue={useCallback((val: number) => set.angleVariation(val), [
                set,
              ])}
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
              setValue={useCallback(
                (val: number) => set.perlinXIncrementScale(val),
                [set]
              )}
              {...sliderParams}
            />
            <MenuSlider
              title="Perlin Y Increment Scale"
              value={state.perlinYIncrementScale}
              labelFormat={formatTimesValue}
              setValue={useCallback(
                (val: number) => set.perlinYIncrementScale(val),
                [set]
              )}
              {...sliderParams}
            />
            <MenuSlider
              title="Speed"
              value={state.perlinZIncrementScale}
              setValue={useCallback(
                (val: number) => set.perlinZIncrementScale(val),
                [set]
              )}
              {...sliderParams}
              min={0}
              step={0.1}
            />
          </MenuItemWrapper>
        </Fragment>
      </BottomMenu>
    </Fragment>
  );
};
