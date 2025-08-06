import React, { Fragment, useCallback } from "react";
import { useIdle } from "hooks";
import { useUpdateP5 } from "hooks/useUpdateP5";

import { BottomMenu } from "components/menu/BottomMenu";
import { MenuWrapper } from "components/menu/MenuWrapper/MenuWrapper";
import { StandardIconMenu } from "components/menu/IconMenu/StandardIconMenu/StandardIconMenu";
import { MenuSlider } from "components/menu/MenuSlider/MenuSlider";
import { MenuCheckbox } from "components/menu/MenuCheckbox/MenuCheckbox";
import { MenuItemWrapper } from "components/generic";

import { TIME_TO_IDLE } from "constants/numbers";
import { useGenericReducer } from "utils/data/state";
import { P5Instance } from "types/p5";

import {
  initialQuantumHarmonicsVars,
  QuantumHarmonicsVars,
} from "./QuantumHarmonics.variables";

type Props = {
  p5Instance: P5Instance<QuantumHarmonicsVars> | null;
};

export const QuantumHarmonicsMenu = ({ p5Instance }: Props) => {
  const isIdle = useIdle(TIME_TO_IDLE);
  const { state, set, setState } = useGenericReducer<QuantumHarmonicsVars>(
    initialQuantumHarmonicsVars
  );

  useUpdateP5<QuantumHarmonicsVars>(p5Instance, state);

  return (
    <MenuWrapper setState={setState} p5Instance={p5Instance} show={!isIdle}>
      <StandardIconMenu initialLoopControl />
      <BottomMenu>
        <Fragment>
          {/* wave controls */}
          <MenuItemWrapper>
            <MenuSlider
              title="Wave Sources"
              value={state.numSources}
              setValue={useCallback(
                (val: number) => set.numSources(val),
                [set]
              )}
              min={1}
              max={8}
              step={1}
            />
            <MenuSlider
              title="Frequency"
              value={state.sourceFrequency}
              setValue={useCallback(
                (val: number) => set.sourceFrequency(val),
                [set]
              )}
              min={0.005}
              max={0.1}
              step={0.005}
            />
            <MenuSlider
              title="Amplitude"
              value={state.sourceAmplitude}
              setValue={useCallback(
                (val: number) => set.sourceAmplitude(val),
                [set]
              )}
              min={20}
              max={200}
              step={5}
            />
            <MenuSlider
              title="Phase Offset"
              value={state.phaseOffset}
              setValue={useCallback(
                (val: number) => set.phaseOffset(val),
                [set]
              )}
              min={0}
              max={6.28}
              step={0.1}
            />
          </MenuItemWrapper>

          {/* visual stuff */}
          <MenuItemWrapper>
            <MenuSlider
              title="Color Cycle Speed"
              value={state.colorCycleSpeed}
              setValue={useCallback(
                (val: number) => set.colorCycleSpeed(val),
                [set]
              )}
              min={0.001}
              max={0.1}
              step={0.001}
            />
            <MenuSlider
              title="Wave Decay"
              value={state.waveDecay}
              setValue={useCallback((val: number) => set.waveDecay(val), [set])}
              min={0.1}
              max={2}
              step={0.1}
            />
            <MenuSlider
              title="Interference Threshold"
              value={state.interferenceThreshold}
              setValue={useCallback(
                (val: number) => set.interferenceThreshold(val),
                [set]
              )}
              min={0.1}
              max={1}
              step={0.05}
            />
            <MenuSlider
              title="Background Alpha"
              value={state.backgroundAlpha}
              setValue={useCallback(
                (val: number) => set.backgroundAlpha(val),
                [set]
              )}
              min={5}
              max={100}
              step={5}
            />
          </MenuItemWrapper>

          {/* timing and toggles */}
          <MenuItemWrapper>
            <MenuSlider
              title="Time Scale"
              value={state.timeScale}
              setValue={useCallback((val: number) => set.timeScale(val), [set])}
              min={0.1}
              max={3}
              step={0.1}
            />
            <MenuSlider
              title="Rotation Speed"
              value={state.rotationSpeed}
              setValue={useCallback(
                (val: number) => set.rotationSpeed(val),
                [set]
              )}
              min={0}
              max={0.02}
              step={0.001}
            />
            <MenuCheckbox
              title="Show Wave Sources"
              checked={state.showWaveSources}
              setChecked={useCallback(
                (val: boolean) => set.showWaveSources(val),
                [set]
              )}
            />
            <MenuCheckbox
              title="Show Interference Field"
              checked={state.showInterferenceField}
              setChecked={useCallback(
                (val: boolean) => set.showInterferenceField(val),
                [set]
              )}
            />
          </MenuItemWrapper>
        </Fragment>
      </BottomMenu>
    </MenuWrapper>
  );
};
