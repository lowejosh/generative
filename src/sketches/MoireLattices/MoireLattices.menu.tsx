import { StandardIconMenu } from "components/menu/IconMenu/StandardIconMenu/StandardIconMenu";
import { formatPixelValue } from "utils/menu/formatting";
import { MenuWrapper } from "components/menu/MenuWrapper/MenuWrapper";
import { MenuSlider } from "components/menu/MenuSlider/MenuSlider";
import { BottomMenu } from "components/menu/BottomMenu";
import React, { Fragment, useCallback } from "react";
import { MenuItemWrapper } from "components/generic";
import { useGenericReducer } from "utils/data/state";
import { TIME_TO_IDLE } from "constants/numbers";
import { useUpdateP5 } from "hooks/useUpdateP5";
import { P5Instance } from "types/p5";
import { useIdle } from "hooks";
import { MenuCheckbox } from "components/menu/MenuCheckbox/MenuCheckbox";
import { ColorPicker } from "components/menu/ColorPicker/ColorPicker";
import {
  initialMoireLatticesVars,
  MoireLatticesVars,
} from "./MoireLattices.variables";

type Props = {
  p5Instance: P5Instance<MoireLatticesVars> | null;
};

const sliderParams = {
  min: 1,
  max: 10,
  step: 1,
};

export const MoireLatticesMenu = ({ p5Instance }: Props) => {
  const isIdle = useIdle(TIME_TO_IDLE);
  const { state, set, setState } = useGenericReducer<MoireLatticesVars>(
    initialMoireLatticesVars
  );

  useUpdateP5<MoireLatticesVars>(p5Instance, state);

  return (
    <MenuWrapper setState={setState} p5Instance={p5Instance} show={!isIdle}>
      <StandardIconMenu initialLoopControl={true} />
      <BottomMenu>
        <Fragment>
          <MenuItemWrapper>
            <MenuSlider
              title="Line Spacing"
              value={state.lineSpacing}
              labelFormat={formatPixelValue}
              setValue={useCallback((v: number) => set.lineSpacing(v), [set])}
              {...sliderParams}
              min={2}
              max={100}
            />
            <MenuSlider
              title="Line Width"
              value={state.lineWidth}
              labelFormat={formatPixelValue}
              setValue={useCallback((v: number) => set.lineWidth(v), [set])}
              {...sliderParams}
              min={1}
              max={20}
              step={0.5}
            />
          </MenuItemWrapper>
          <MenuItemWrapper>
            <MenuSlider
              title="Angle Offset (deg)"
              value={state.angleOffsetDeg}
              setValue={useCallback((v: number) => set.angleOffsetDeg(v), [set])}
              {...sliderParams}
              min={0}
              max={45}
              step={0.5}
            />
            <MenuSlider
              title="Layers"
              value={state.layerCount}
              setValue={useCallback((v: number) => set.layerCount(v), [set])}
              {...sliderParams}
              min={1}
              max={12}
              step={1}
            />
            <MenuSlider
              title="Rotation Speed (deg/s)"
              value={state.rotationSpeedDeg}
              setValue={useCallback((v: number) => set.rotationSpeedDeg(v), [set])}
              {...sliderParams}
              min={0}
              max={60}
              step={0.5}
            />
          </MenuItemWrapper>
          <MenuItemWrapper>
            <MenuCheckbox
              title="Animate"
              checked={state.animate}
              setChecked={useCallback((v: boolean) => set.animate(v), [set])}
            />
          </MenuItemWrapper>
          <MenuItemWrapper>
            <ColorPicker
              title="Foreground"
              color={state.fgColor}
              setColor={useCallback((v: string) => set.fgColor(v), [set])}
              refresh
            />
            <ColorPicker
              title="Background"
              color={state.bgColor}
              setColor={useCallback((v: string) => set.bgColor(v), [set])}
              refresh
            />
          </MenuItemWrapper>
        </Fragment>
      </BottomMenu>
    </MenuWrapper>
  );
};
