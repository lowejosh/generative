import React, { Fragment, useCallback } from "react";
import { useGenericReducer } from "utils/data/state";
import { TIME_TO_IDLE } from "constants/numbers";
import { useUpdateP5 } from "hooks/useUpdateP5";
import { P5Instance } from "types/p5";
import { useIdle } from "hooks";

import { StandardIconMenu } from "components/menu/IconMenu/StandardIconMenu/StandardIconMenu";
import { MenuWrapper } from "components/menu/MenuWrapper/MenuWrapper";
import { MenuSlider } from "components/menu/MenuSlider/MenuSlider";
import { BottomMenu } from "components/menu/BottomMenu";
import { MenuItemWrapper } from "components/generic";

import {
  initialPsychedelicSpiralVars,
  PsychedelicSpiralVars,
} from "./PsychedelicSpiral.variables";

type Props = {
  p5Instance: P5Instance<PsychedelicSpiralVars> | null;
};

export const PsychedelicSpiralMenu = ({ p5Instance }: Props) => {
  const isIdle = useIdle(TIME_TO_IDLE);
  const { state, set, setState } = useGenericReducer<PsychedelicSpiralVars>(
    initialPsychedelicSpiralVars
  );

  useUpdateP5<PsychedelicSpiralVars>(p5Instance, state);

  return (
    <MenuWrapper setState={setState} p5Instance={p5Instance} show={!isIdle}>
      <StandardIconMenu initialLoopControl />
      <BottomMenu>
        <Fragment>
          <MenuItemWrapper>
            <MenuSlider
              title="Spiral Speed"
              value={state.spiralSpeed}
              setValue={useCallback(
                (val: number) => set.spiralSpeed(val),
                [set]
              )}
              min={0.001}
              max={0.1}
              step={0.001}
            />

            <MenuSlider
              title="Particle Count"
              value={state.particleCount}
              setValue={useCallback(
                (val: number) => set.particleCount(val),
                [set]
              )}
              min={50}
              max={500}
              step={10}
            />

            <MenuSlider
              title="Color Shift Speed"
              value={state.colorShiftSpeed}
              setValue={useCallback(
                (val: number) => set.colorShiftSpeed(val),
                [set]
              )}
              min={0.001}
              max={0.02}
              step={0.001}
            />
          </MenuItemWrapper>

          <MenuItemWrapper>
            <MenuSlider
              title="Morphing Intensity"
              value={state.morphingIntensity}
              setValue={useCallback(
                (val: number) => set.morphingIntensity(val),
                [set]
              )}
              min={0}
              max={150}
              step={5}
            />

            <MenuSlider
              title="Trail Length"
              value={state.trailLength}
              setValue={useCallback(
                (val: number) => set.trailLength(val),
                [set]
              )}
              min={5}
              max={100}
              step={1}
            />

            <MenuSlider
              title="Kaleidoscope Segments"
              value={state.kaleidoscopeSegments}
              setValue={useCallback(
                (val: number) => set.kaleidoscopeSegments(val),
                [set]
              )}
              min={3}
              max={16}
              step={1}
            />
          </MenuItemWrapper>
          <MenuItemWrapper>
            <MenuSlider
              title="Pulsation Intensity"
              value={state.pulsationIntensity}
              setValue={useCallback(
                (val: number) => set.pulsationIntensity(val),
                [set]
              )}
              min={0}
              max={100}
              step={5}
            />

            <MenuSlider
              title="Fractal Depth"
              value={state.fractalDepth}
              setValue={useCallback(
                (val: number) => set.fractalDepth(val),
                [set]
              )}
              min={1}
              max={6}
              step={1}
            />
          </MenuItemWrapper>
        </Fragment>
      </BottomMenu>
    </MenuWrapper>
  );
};
