import { PerlinFlowParticleMenu } from "./menu-sections/PerlinFlowParticleMenu";
import { initialPerlinFlowVars, PerlinFlowVars } from "./PerlinFlow.variables";
import { StandardIconMenu } from "components/menu/IconMenu/StandardIconMenu";
import { PerlinFlowCanvasMenu } from "./menu-sections/PerlinFlowCanvasMenu";
import { PerlinFlowNoiseMenu } from "./menu-sections/PerlinFlowNoiseMenu";
import { MenuTabs } from "components/menu/MenuTabs/MenuTabs";
import { PerlinFlowMenuProps } from "./PerlinFlow.types";
import { BottomMenu } from "components/menu/BottomMenu";
import { useGenericReducer } from "utils/data/state";
import { TIME_TO_IDLE } from "constants/numbers";
import { useUpdateP5 } from "hooks/useUpdateP5";
import React, { Fragment, useCallback } from "react";
import { useIdle } from "hooks";

export const PerlinFlowMenu = ({ p5Instance }: PerlinFlowMenuProps) => {
  const isIdle = useIdle(TIME_TO_IDLE);
  const { state, set } = useGenericReducer<PerlinFlowVars>(
    initialPerlinFlowVars
  );

  useUpdateP5<PerlinFlowVars>(p5Instance, state);

  const refreshAnimation = useCallback(
    () => p5Instance?.variables?.refresh(p5Instance),
    [p5Instance]
  );

  return (
    <Fragment>
      <StandardIconMenu
        initialLoopControl={true}
        p5Instance={p5Instance}
        show={!isIdle}
      />
      <BottomMenu show={!isIdle}>
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
    </Fragment>
  );
};
