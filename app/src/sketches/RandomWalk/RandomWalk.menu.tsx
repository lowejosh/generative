import { StandardIconMenu } from "components/IconMenu/StandardIconMenu";
import { MenuSlider } from "components/MenuSlider/MenuSlider";
import React, { Fragment, useState, useEffect } from "react";
import { MenuItemWrapper } from "components/StyledUI";
import { BottomMenu } from "components/BottomMenu";
import { RandomWalkVars } from "./RandomWalk";
import { TIME_TO_IDLE } from "constants/numbers";
import { formatPercentValue, formatTimesValue } from "utils/menu";
import { P5Instance } from "types/p5";
import { useIdle } from "hooks";

type Props = {
  initialVars: RandomWalkVars;
  p5Instance: P5Instance<RandomWalkVars> | null;
};

const sliderParams = {
  min: 0,
  max: 100,
  step: 1,
};

export const RandomWalkMenu = ({ initialVars, p5Instance }: Props) => {
  const isIdle = useIdle(TIME_TO_IDLE);

  // variable state
  const [posVariance, setPosVariance] = useState(initialVars.POS_VARIANCE);
  const [radius, setRadius] = useState(initialVars.ELLIPSE_radius);
  const [opacity, setOpacity] = useState(initialVars.ELLIPSE_OPACITY);
  const [speed, setSpeed] = useState(initialVars.SPEED);
  const [colorVariance, setColorVariance] = useState(
    initialVars.COLOR_VARIANCE
  );

  // live update the p5Instance items
  useEffect(() => {
    if (p5Instance) {
      Object.assign(p5Instance.variables, {
        POS_VARIANCE: posVariance,
        COLOR_VARIANCE: colorVariance,
        ELLIPSE_radius: radius,
        ELLIPSE_OPACITY: opacity,
        SPEED: speed,
      } as RandomWalkVars);
    }
  }, [speed, posVariance, colorVariance, radius, opacity, p5Instance]);

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
          <MenuSlider
            title="Speed"
            labelFormat={formatTimesValue}
            value={speed}
            setValue={setSpeed}
            {...sliderParams}
          />
        </Fragment>
      </BottomMenu>
    </Fragment>
  );
};
