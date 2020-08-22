
import { StandardIconMenu } from "components/IconMenu/StandardIconMenu";
import { MenuSlider } from "components/MenuSlider/MenuSlider";
import React, { Fragment, useState, useEffect } from "react";
import { CardioidVariables } from "./Cardioid.sketch";
import { MenuItemWrapper } from "components/StyledUI";
import { BottomMenu } from "components/BottomMenu";
import { TIME_TO_IDLE } from "constants/numbers";
import { P5Instance } from "types/p5";
import { useIdle } from "hooks";

type Props = {
  initialVariables: CardioidVariables;
  p5Instance: P5Instance<CardioidVariables> | null;
};

const sliderParams = {
  min: 0,
  max: 100,
  step: 1,
};

export const CardioidMenu = ({ initialVariables, p5Instance }: Props) => {
  const isIdle = useIdle(TIME_TO_IDLE);

  // variable state
  const [foo, setFoo] = useState(initialVariables.FOO);
  const [bar, setBar] = useState(initialVariables.BAR);

  // live update the p5Instance items
  useEffect(() => {
    if (p5Instance) {
      Object.assign(p5Instance.variables, {
        FOO: foo,
        BAR: bar,
      });
    }
  }, [foo, bar, p5Instance]);

  return (
    <Fragment>
      <StandardIconMenu
        show={!isIdle}
        onRefresh={() => p5Instance?.variables?.refresh(p5Instance)}
      />
      <BottomMenu show={!isIdle}>
        <Fragment>
          <MenuItemWrapper>
            <MenuSlider
              title="Foo"
              value={foo}
              setValue={setFoo}
              {...sliderParams}
            />
            <MenuSlider
              title="Bar"
              value={bar}
              setValue={setBar}
              {...sliderParams}
            />
          </MenuItemWrapper>
        </Fragment>
      </BottomMenu>
    </Fragment>
  );
};
