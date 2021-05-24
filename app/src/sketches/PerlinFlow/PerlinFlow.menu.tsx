import { StandardIconMenu } from "components/menu/IconMenu/StandardIconMenu/StandardIconMenu";
import { PerlinFlowParticleMenu } from "./menu-sections/PerlinFlowParticleMenu";
import { PerlinFlowCanvasMenu } from "./menu-sections/PerlinFlowCanvasMenu";
import { PerlinFlowNoiseMenu } from "./menu-sections/PerlinFlowNoiseMenu";
import { MenuWrapper } from "components/menu/MenuWrapper/MenuWrapper";
import { MenuTabs } from "components/menu/MenuTabs/MenuTabs";
import { PerlinFlowMenuProps } from "./PerlinFlow.types";
import { BottomMenu } from "components/menu/BottomMenu";
import { useGenericReducer } from "utils/data/state";
import { TIME_TO_IDLE } from "constants/numbers";
import { useUpdateP5 } from "hooks/useUpdateP5";
import React, { useCallback } from "react";
import { useIdle } from "hooks";
import {
  initialPerlinFlowVars,
  perlinFlowPresets,
  PerlinFlowVars,
} from "./PerlinFlow.variables";
import { PresetDatum } from "components/menu/IconMenu/Presets/Presets.types";

export const PerlinFlowMenu = ({ p5Instance }: PerlinFlowMenuProps) => {
  const isIdle = useIdle(TIME_TO_IDLE);
  const { state, set, setState } = useGenericReducer<PerlinFlowVars>(
    initialPerlinFlowVars
  );

  useUpdateP5<PerlinFlowVars>(p5Instance, state);

  const refreshAnimation = useCallback(
    () => p5Instance?.variables?.refresh(p5Instance),
    [p5Instance]
  );

  const handlePresetClick = useCallback(
    (preset: PresetDatum<PerlinFlowVars>) => {
      setState(preset.vars);
      setTimeout(() => {
        refreshAnimation();
      }, 5); // Removes a bug
    },
    [refreshAnimation, setState]
  );

  return (
    <MenuWrapper
      onPresetClick={handlePresetClick}
      p5Instance={p5Instance}
      show={!isIdle}
    >
      <StandardIconMenu initialLoopControl={true} presets={perlinFlowPresets} />
      <BottomMenu>
        <MenuTabs labels={["Noise", "Particle", "Canvas"]}>
          <PerlinFlowNoiseMenu state={state} set={set} />
          <PerlinFlowParticleMenu
            state={state}
            set={set}
            refreshAnimation={refreshAnimation}
          />
          <PerlinFlowCanvasMenu
            p5Instance={p5Instance}
            state={state}
            set={set}
          />
        </MenuTabs>
      </BottomMenu>
    </MenuWrapper>
  );
};
