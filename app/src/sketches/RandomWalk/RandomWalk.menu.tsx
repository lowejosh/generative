import { initialRandomWalkVars, RandomWalkVars } from "./RandomWalk.variables";
import { StandardIconMenu } from "components/IconMenu/StandardIconMenu";
import { formatPercentValue, formatTimesValue } from "utils/menu";
import React, { Fragment, useEffect, useCallback } from "react";
import { MenuSlider } from "components/MenuSlider/MenuSlider";
import { MenuItemWrapper } from "components/StyledUI";
import { BottomMenu } from "components/BottomMenu";
import { TIME_TO_IDLE } from "constants/numbers";
import { useGenericReducer } from "utils/state";
import { P5Instance } from "types/p5";
import { useIdle } from "hooks";

type Props = {
  p5Instance: P5Instance<RandomWalkVars> | null;
};

const sliderParams = {
  min: 0,
  max: 100,
  step: 1,
};

export const RandomWalkMenu = ({ p5Instance }: Props) => {
  const isIdle = useIdle(TIME_TO_IDLE);
  const { state, set } = useGenericReducer<RandomWalkVars>(
    initialRandomWalkVars
  );

  // live update the p5Instance items
  useEffect(() => {
    if (p5Instance) {
      Object.assign(p5Instance.variables, {
        posVariance: state.posVariance,
        colorVariance: state.colorVariance,
        radius: state.radius,
        opacity: state.opacity,
        speed: state.speed,
      });
    }
  }, [p5Instance, state]);

  return (
    <Fragment>
      <StandardIconMenu
        show={!isIdle}
        p5Instance={p5Instance}
        initialLoopControl
      />
      <BottomMenu show={!isIdle}>
        <Fragment>
          <MenuItemWrapper>
            <MenuSlider
              title="Position Variance"
              value={state.posVariance}
              setValue={useCallback((val: number) => set.posVariance(val), [
                set,
              ])}
              {...sliderParams}
            />
            <MenuSlider
              title="Color Variance"
              value={state.colorVariance}
              setValue={useCallback((val: number) => set.colorVariance(val), [
                set,
              ])}
              {...sliderParams}
            />
          </MenuItemWrapper>
          <MenuItemWrapper>
            <MenuSlider
              title="Circle Radius"
              value={state.radius}
              setValue={useCallback((val: number) => set.radius(val), [set])}
              {...sliderParams}
            />
            <MenuSlider
              title="Circle Opacity"
              labelFormat={formatPercentValue}
              value={state.opacity}
              setValue={useCallback((val: number) => set.opacity(val), [set])}
              {...sliderParams}
            />
          </MenuItemWrapper>
          <MenuSlider
            title="Speed"
            labelFormat={formatTimesValue}
            value={state.speed}
            setValue={useCallback((val: number) => set.speed(val), [set])}
            {...sliderParams}
          />
        </Fragment>
      </BottomMenu>
    </Fragment>
  );
};
