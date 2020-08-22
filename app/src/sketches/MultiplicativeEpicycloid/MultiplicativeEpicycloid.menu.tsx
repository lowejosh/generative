import { MultiplicativeEpicycloidVariables } from "./MultiplicativeEpicycloid";
import { StandardIconMenu } from "components/IconMenu/StandardIconMenu";
import { MenuCheckbox } from "components/MenuCheckbox/MenuCheckbox";
import { MenuSlider } from "components/MenuSlider/MenuSlider";
import React, { Fragment, useState, useEffect } from "react";
import { MenuItemWrapper } from "components/StyledUI";
import { BottomMenu } from "components/BottomMenu";
import { TIME_TO_IDLE } from "constants/numbers";
import { P5Instance } from "types/p5";
import { useIdle } from "hooks";
import { formatTimesValue, formatPixelValue } from "utils/menu";

type Props = {
  initialVariables: MultiplicativeEpicycloidVariables;
  p5Instance: P5Instance<MultiplicativeEpicycloidVariables> | null;
};

const sliderParams = {
  min: 0,
  max: 100,
  step: 1,
};

export const MultiplicativeEpicycloidMenu = ({
  initialVariables,
  p5Instance,
}: Props) => {
  const isIdle = useIdle(TIME_TO_IDLE);

  // variable state
  const [totalVertices, setTotalVertices] = useState(
    initialVariables.TOTAL_VERTICES
  );
  const [radius, setRadius] = useState(initialVariables.RADIUS);
  const [factor, setFactor] = useState(initialVariables.FACTOR); // override
  const [isAutoplaying, setIsAutoplaying] = useState(
    initialVariables.IS_AUTOPLAYING
  );
  const [autoplaySpeed, setAutoplaySpeed] = useState(
    initialVariables.AUTOPLAY_SPEED
  );

  // live update the p5Instance items
  useEffect(() => {
    if (p5Instance) {
      Object.assign(p5Instance.variables, {
        TOTAL_VERTICES: totalVertices,
        FACTOR: factor,
        RADIUS: radius,
        IS_AUTOPLAYING: isAutoplaying,
        AUTOPLAY_SPEED: autoplaySpeed,
      });
    }
  }, [totalVertices, autoplaySpeed, isAutoplaying, factor, radius, p5Instance]);

  return (
    <Fragment>
      <StandardIconMenu show={!isIdle} p5Instance={p5Instance} />
      <BottomMenu show={!isIdle}>
        <Fragment>
          <MenuItemWrapper>
            <MenuSlider
              title="Total Vertices"
              value={totalVertices}
              setValue={setTotalVertices}
              {...sliderParams}
              min={0}
              max={1000}
            />
            <MenuSlider
              disabled={isAutoplaying}
              title={`Factor${
                isAutoplaying ? " (Disabled when autoplaying)" : ""
              }`}
              labelFormat={formatTimesValue}
              value={factor}
              setValue={setFactor}
              {...sliderParams}
            />
          </MenuItemWrapper>
          <MenuItemWrapper>
            <MenuSlider
              title="Radius"
              value={radius}
              setValue={setRadius}
              {...sliderParams}
              min={100}
              max={800}
            />
            <MenuSlider
              disabled={!isAutoplaying}
              title={`Autoplay Speed${
                !isAutoplaying ? " (Disabled when not autoplaying)" : ""
              }`}
              labelFormat={formatTimesValue}
              value={autoplaySpeed * 100}
              setValue={(newVal: number) => setAutoplaySpeed(newVal / 100)}
              {...sliderParams}
              max={10}
              step={0.1}
            />
          </MenuItemWrapper>
          <MenuCheckbox
            checked={isAutoplaying}
            setChecked={setIsAutoplaying}
            title="Autoplay"
          />
        </Fragment>
      </BottomMenu>
    </Fragment>
  );
};
