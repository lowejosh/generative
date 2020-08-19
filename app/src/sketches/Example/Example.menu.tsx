import { MenuSlider } from "components/MenuSlider/MenuSlider";
import { MenuItemWrapper } from "components/StyledUI/Menu";
import React, { Fragment } from "react";
import { Menu } from "components/Menu";

export const ExampleMenu = ({
  posVariance,
  setPosVariance,
  colorVariance,
  setColorVariance,
  radius,
  setRadius,
  opacity,
  setOpacity,
}: any) => {
  const sliderParams = {
    min: 0,
    max: 100,
    step: 1,
  };

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
