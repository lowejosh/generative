import { formatPixelValue, formatTimesValue } from "utils/menu/formatting";
import { StandardIconMenu } from "components/IconMenu/StandardIconMenu";
import React, { Fragment, useCallback } from "react";
import { MenuSlider } from "components/MenuSlider/MenuSlider";
import { MenuItemWrapper } from "components/StyledUI";
import { useGenericReducer } from "utils/data/state";
import { BottomMenu } from "components/BottomMenu";
import { TIME_TO_IDLE } from "constants/numbers";
import { useUpdateP5 } from "hooks/useUpdateP5";
import { P5Instance } from "types/p5";
import { useIdle } from "hooks";
import {
  initialPerlinFieldVars,
  PerlinFieldVars,
} from "./PerlinField.variables";

type Props = {
  p5Instance: P5Instance<PerlinFieldVars> | null;
};

const sliderParams = {
  min: 1,
  max: 10,
  step: 1,
};

export const PerlinFieldMenu = ({ p5Instance }: Props) => {
  const isIdle = useIdle(TIME_TO_IDLE);
  const { state, set } = useGenericReducer<PerlinFieldVars>(
    initialPerlinFieldVars
  );

  useUpdateP5<PerlinFieldVars>(p5Instance, state);

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
