import { MenuSlider } from "components/MenuSlider/MenuSlider";
import { MenuItemWrapper } from "components/StyledUI";
import React, { Fragment, useState, useEffect } from "react";
import { Menu } from "components/Menu";
import p5 from "p5";
import { ExampleVariables } from "./Example.sketch";

type Props = {
  initialVariables: ExampleVariables;
  p5Instance: p5 | null;
};

export const ExampleMenu = ({ initialVariables, p5Instance }: Props) => {
  const [posVariance, setPosVariance] = useState(initialVariables.POS_VARIANCE);
  const [colorVariance, setColorVariance] = useState(
    initialVariables.COLOR_VARIANCE
  );
  const [radius, setRadius] = useState(initialVariables.ELLIPSE_RADIUS);
  const [opacity, setOpacity] = useState(initialVariables.ELLIPSE_OPACITY);

  const sliderParams = {
    min: 0,
    max: 100,
    step: 1,
  };

  // update the p5Instance items
  useEffect(() => {
    if (p5Instance) {
      p5Instance.storeItem("variables", {
        POS_VARIANCE: posVariance,
        COLOR_VARIANCE: colorVariance,
        ELLIPSE_RADIUS: radius,
        ELLIPSE_OPACITY: opacity,
      } as ExampleVariables);
    }
    return () => (p5Instance ? p5Instance.clearStorage() : undefined);
  }, [posVariance, colorVariance, radius, opacity]);

  return (
    <Menu>
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
            value={opacity}
            setValue={setOpacity}
            {...sliderParams}
          />
        </MenuItemWrapper>
      </Fragment>
    </Menu>
  );
};
