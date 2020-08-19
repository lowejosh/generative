import { getExampleSketch, ExampleConstants } from "./Example.sketch";
import React, { useMemo, Fragment, useState } from "react";
import { Sketch } from "components/Sketch";
import { Menu } from "components/Menu";
import { Box } from "@material-ui/core";
import { MenuSlider } from "components/MenuSlider/MenuSlider";
import { FlexRowAround } from "components/StyledUI";
import { MenuItemWrapper } from "components/StyledUI/Menu";
import { ExampleMenu } from "./Example.menu";

export const Example = () => {
  const [posVariance, setPosVariance] = useState(20);
  const [colorVariance, setColorVariance] = useState(60);
  const [radius, setRadius] = useState(30);
  const [opacity, setOpacity] = useState(60);

  const constants: ExampleConstants = useMemo(
    () => ({
      POS_VARIANCE: posVariance,
      COLOR_VARIANCE: colorVariance,
      ELLIPSE_RADIUS: radius,
      ELLIPSE_OPACITY: opacity,
    }),
    [posVariance, colorVariance, radius, opacity]
  );

  console.log(posVariance);
  return (
    <Fragment>
      <Sketch sketch={getExampleSketch(constants)} />
      <ExampleMenu
        posVariance={posVariance}
        setPosVariance={setPosVariance}
        colorVariance={colorVariance}
        setColorVariance={setColorVariance}
        radius={radius}
        setRadius={setRadius}
        opacity={opacity}
        setOpacity={setOpacity}
      />
    </Fragment>
  );
};
