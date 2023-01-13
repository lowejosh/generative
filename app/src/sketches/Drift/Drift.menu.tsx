import React, { Fragment, useCallback } from "react";
import { useGenericReducer } from "utils/data/state";
import { TIME_TO_IDLE } from "constants/numbers";
import { useUpdateP5 } from "hooks/useUpdateP5";
import { P5Instance } from "types/p5";
import { useIdle } from "hooks";

import { StandardIconMenu } from "components/menu/IconMenu/StandardIconMenu/StandardIconMenu";
import { MenuWrapper } from "components/menu/MenuWrapper/MenuWrapper";
import { MenuSlider } from "components/menu/MenuSlider/MenuSlider";
import { BottomMenu } from "components/menu/BottomMenu";
import { MenuItemWrapper } from "components/generic";

import { initialDriftVars, DriftVars } from "./Drift.variables";

type Props = {
  p5Instance: P5Instance<DriftVars> | null;
};

const sliderParams = {
  min: 0,
  max: 100,
  step: 1,
};

export const DriftMenu = ({ p5Instance }: Props) => {
  const isIdle = useIdle(TIME_TO_IDLE);
  const { state, set, setState } =
    useGenericReducer<DriftVars>(initialDriftVars);

  useUpdateP5<DriftVars>(p5Instance, state);

  return (
    <MenuWrapper
      setState={setState}
      p5Instance={p5Instance}
      show={!isIdle}
      disableMenu
    >
      <StandardIconMenu initialLoopControl />
      <BottomMenu>
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
    </MenuWrapper>
  );
};
