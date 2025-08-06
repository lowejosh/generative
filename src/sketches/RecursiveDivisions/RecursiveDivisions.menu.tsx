import React, { Fragment, useCallback } from "react";
import { useIdle } from "hooks";
import { useUpdateP5 } from "hooks/useUpdateP5";

import { BottomMenu } from "components/menu/BottomMenu";
import { MenuWrapper } from "components/menu/MenuWrapper/MenuWrapper";
import { StandardIconMenu } from "components/menu/IconMenu/StandardIconMenu/StandardIconMenu";
import { MenuSlider } from "components/menu/MenuSlider/MenuSlider";
import { ColorPicker } from "components/menu/ColorPicker/ColorPicker";
import { MenuItemWrapper } from "components/generic";

import { TIME_TO_IDLE } from "constants/numbers";
import { useGenericReducer } from "utils/data/state";
import { P5Instance } from "types/p5";

import {
  initialRecursiveDivisionsVars,
  RecursiveDivisionsVars,
} from "./RecursiveDivisions.variables";

type Props = {
  p5Instance: P5Instance<RecursiveDivisionsVars> | null;
};

export const RecursiveDivisionsMenu = ({ p5Instance }: Props) => {
  const isIdle = useIdle(TIME_TO_IDLE);
  const { state, set, setState } = useGenericReducer<RecursiveDivisionsVars>(
    initialRecursiveDivisionsVars
  );

  useUpdateP5<RecursiveDivisionsVars>(p5Instance, state);

  return (
    <MenuWrapper setState={setState} p5Instance={p5Instance} show={!isIdle}>
      <StandardIconMenu initialLoopControl />
      <BottomMenu>
        <Fragment>
          <MenuItemWrapper title="Structure">
            <MenuSlider
              title="Max Depth"
              value={state.maxDepth}
              setValue={useCallback((val: number) => set.maxDepth(val), [set])}
              min={3}
              max={12}
              step={1}
            />

            <MenuSlider
              title="Min Size"
              value={state.minSize}
              setValue={useCallback((val: number) => set.minSize(val), [set])}
              min={15}
              max={80}
              step={5}
            />

            <MenuSlider
              title="Split Chance"
              value={state.splitChance}
              setValue={useCallback(
                (val: number) => set.splitChance(val),
                [set]
              )}
              min={0.3}
              max={1}
              step={0.05}
            />
          </MenuItemWrapper>

          <MenuItemWrapper title="Fill & Patterns">
            <MenuSlider
              title="Solid Fill %"
              value={state.solidFillChance}
              setValue={useCallback(
                (val: number) => set.solidFillChance(val),
                [set]
              )}
              min={0}
              max={1}
              step={0.05}
            />

            <MenuSlider
              title="Pattern %"
              value={state.patternChance}
              setValue={useCallback(
                (val: number) => set.patternChance(val),
                [set]
              )}
              min={0}
              max={1}
              step={0.05}
            />

            <MenuSlider
              title="Line Spacing"
              value={state.lineSpacing}
              setValue={useCallback(
                (val: number) => set.lineSpacing(val),
                [set]
              )}
              min={4}
              max={20}
              step={1}
            />

            <MenuSlider
              title="Dot Size"
              value={state.dotSize}
              setValue={useCallback((val: number) => set.dotSize(val), [set])}
              min={1}
              max={8}
              step={0.5}
            />

            <MenuSlider
              title="Noise Scale"
              value={state.noiseScale}
              setValue={useCallback(
                (val: number) => set.noiseScale(val),
                [set]
              )}
              min={0.005}
              max={0.05}
              step={0.005}
            />
          </MenuItemWrapper>

          <MenuItemWrapper title="Style">
            <MenuSlider
              title="Stroke Weight"
              value={state.strokeWeight}
              setValue={useCallback(
                (val: number) => set.strokeWeight(val),
                [set]
              )}
              min={0.5}
              max={4}
              step={0.5}
            />

            <ColorPicker
              title="Background"
              color={state.bgColor}
              setColor={useCallback((val: string) => set.bgColor(val), [set])}
            />

            <ColorPicker
              title="Stroke"
              color={state.strokeColor}
              setColor={useCallback(
                (val: string) => set.strokeColor(val),
                [set]
              )}
            />

            <ColorPicker
              title="Fill"
              color={state.fillColor}
              setColor={useCallback((val: string) => set.fillColor(val), [set])}
            />

            <ColorPicker
              title="Pattern"
              color={state.accentColor}
              setColor={useCallback(
                (val: string) => set.accentColor(val),
                [set]
              )}
            />

            <MenuSlider
              title="Seed"
              value={state.seed}
              setValue={useCallback((val: number) => set.seed(val), [set])}
              min={1}
              max={1000}
              step={1}
            />
          </MenuItemWrapper>
        </Fragment>
      </BottomMenu>
    </MenuWrapper>
  );
};
