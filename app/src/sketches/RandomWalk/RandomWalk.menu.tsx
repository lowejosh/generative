import { StandardIconMenu } from "components/IconMenu/StandardIconMenu";
import { MenuSlider } from "components/MenuSlider/MenuSlider";
import React, { Fragment, useState, useEffect } from "react";
import { MenuItemWrapper } from "components/StyledUI";
import { BottomMenu } from "components/BottomMenu";
import { RandomWalkVariables } from "./RandomWalk";
import { TIME_TO_IDLE } from "constants/numbers";
import { formatPercentValue } from "utils/menu";
import { P5Instance } from "types/p5";
import { useIdle } from "hooks";

type Props = {
  initialVariables: RandomWalkVariables;
  p5Instance: P5Instance<RandomWalkVariables> | null;
};

const sliderParams = {
  min: 0,
  max: 100,
  step: 1,
};

export const RandomWalkMenu = ({ initialVariables, p5Instance }: Props) => {
  const isIdle = useIdle(TIME_TO_IDLE);

  // variable state
  const [posVariance, setPosVariance] = useState(initialVariables.POS_VARIANCE);
  const [radius, setRadius] = useState(initialVariables.ELLIPSE_RADIUS);
  const [opacity, setOpacity] = useState(initialVariables.ELLIPSE_OPACITY);
  const [colorVariance, setColorVariance] = useState(
    initialVariables.COLOR_VARIANCE
  );

  // live update the p5Instance items
  useEffect(() => {
    if (p5Instance) {
      Object.assign(p5Instance.variables, {
        POS_VARIANCE: posVariance,
        COLOR_VARIANCE: colorVariance,
        ELLIPSE_RADIUS: radius,
        ELLIPSE_OPACITY: opacity,
      });
    }
  }, [posVariance, colorVariance, radius, opacity, p5Instance]);

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
              value={posVariance}
              setValue={setPosVariance}
              {...sliderParams}
            />
            <MenuSlider
              title="Color Variance"
              value={colorVariance}
              setValue={setColorVariance}
              {...sliderParams}
            />
          </MenuItemWrapper>
          <MenuItemWrapper>
            <MenuSlider
              title="Circle Radius"
              value={radius}
              setValue={setRadius}
              {...sliderParams}
            />
            <MenuSlider
              title="Circle Opacity"
              labelFormat={formatPercentValue}
              value={opacity}
              setValue={setOpacity}
              {...sliderParams}
            />
          </MenuItemWrapper>
        </Fragment>
      </BottomMenu>
    </Fragment>
  );
};
