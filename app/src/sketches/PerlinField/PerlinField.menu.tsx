import {
  initialPerlinFieldVars,
  PerlinFieldVars,
} from "./PerlinField.variables";
import { StandardIconMenu } from "components/IconMenu/StandardIconMenu";
import { MenuSlider } from "components/MenuSlider/MenuSlider";
import React, { Fragment, useEffect, useCallback } from "react";
import { MenuItemWrapper } from "components/StyledUI";
import { BottomMenu } from "components/BottomMenu";
import { TIME_TO_IDLE } from "constants/numbers";
import { useGenericReducer } from "utils/state";
import { P5Instance } from "types/p5";
import { useIdle } from "hooks";

type Props = {
  p5Instance: P5Instance<PerlinFieldVars> | null;
};

const sliderParams = {
  min: 0,
  max: 100,
  step: 1,
};

export const PerlinFieldMenu = ({ p5Instance }: Props) => {
  const isIdle = useIdle(TIME_TO_IDLE);
  const { state, set } = useGenericReducer<PerlinFieldVars>(
    initialPerlinFieldVars
  );

  // live update the p5Instance items
  useEffect(() => {
    if (p5Instance) {
      Object.assign(p5Instance.variables, {
        foo: state.foo,
        bar: state.bar,
      });
    }
  }, [p5Instance, state]);

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
              title="Foo"
              value={state.foo}
              setValue={useCallback((val: number) => set.foo(val), [set])}
              {...sliderParams}
            />
            <MenuSlider
              title="Bar"
              value={state.bar}
              setValue={useCallback((val: number) => set.bar(val), [set])}
              {...sliderParams}
            />
          </MenuItemWrapper>
        </Fragment>
      </BottomMenu>
    </Fragment>
  );
};
