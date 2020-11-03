const getMenuTemplate = (sketchName) => `
import { initial${sketchName}Vars, ${sketchName}Vars } from "./${sketchName}.variables";
import { StandardIconMenu } from "components/IconMenu/StandardIconMenu";
import { MenuSlider } from "components/MenuSlider/MenuSlider";
import { MenuItemWrapper } from "components/StyledUI";
import React, { Fragment, useCallback } from "react";
import { BottomMenu } from "components/BottomMenu";
import { TIME_TO_IDLE } from "constants/numbers";
import { useGenericReducer } from "utils/state";
import { useUpdateP5 } from "hooks/useUpdateP5";
import { P5Instance } from "types/p5";
import { useIdle } from "hooks";

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
  const { state, set } = useGenericReducer<${sketchName}Vars>(
    initial${sketchName}Vars
  );

  useUpdateP5<${sketchName}Vars>(p5Instance, state);

  return (
    <Fragment>
      <StandardIconMenu
        show={!isIdle}
        initialLoopControl
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
`;

module.exports = getMenuTemplate;
