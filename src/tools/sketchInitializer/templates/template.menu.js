const getMenuTemplate = (sketchName) => `import React, { Fragment, useCallback } from "react";
import { useIdle } from "hooks";
import { useUpdateP5 } from "hooks/useUpdateP5";

import { BottomMenu } from "components/menu/BottomMenu";
import { MenuWrapper } from "components/menu/MenuWrapper/MenuWrapper";
import { StandardIconMenu } from "components/menu/IconMenu/StandardIconMenu/StandardIconMenu";
import { MenuSlider } from "components/menu/MenuSlider/MenuSlider";
import { MenuItemWrapper } from "components/generic";

import { TIME_TO_IDLE } from "constants/numbers";
import { useGenericReducer } from "utils/data/state";
import { P5Instance } from "types/p5";

import { initial${sketchName}Vars, ${sketchName}Vars } from "./${sketchName}.variables";

type Props = {
  p5Instance: P5Instance<${sketchName}Vars> | null;
};

const sliderParams = {
  min: 0,
  max: 100,
  step: 1,
};

export const ${sketchName}Menu = ({ p5Instance }: Props) => {
  const isIdle = useIdle(TIME_TO_IDLE);
  const { state, set, setState } = useGenericReducer<${sketchName}Vars>(
    initial${sketchName}Vars
  );

  useUpdateP5<${sketchName}Vars>(p5Instance, state);

  return (
    <MenuWrapper setState={setState} p5Instance={p5Instance} show={!isIdle}>
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
};`;

module.exports = getMenuTemplate;
