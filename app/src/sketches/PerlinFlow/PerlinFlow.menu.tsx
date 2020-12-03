import { initialPerlinFlowVars, PerlinFlowVars } from "./PerlinFlow.variables";
import { StandardIconMenu } from "components/menu/IconMenu/StandardIconMenu";
import { PerlinFlowNoiseMenu } from "./menu-sections/PerlinFlowNoiseMenu";
import { MenuTabs } from "components/menu/MenuTabs/MenuTabs";
import { BottomMenu } from "components/menu/BottomMenu";
import { useGenericReducer } from "utils/data/state";
import { TIME_TO_IDLE } from "constants/numbers";
import { useUpdateP5 } from "hooks/useUpdateP5";
import React, { Fragment } from "react";
import { P5Instance } from "types/p5";
import { useIdle } from "hooks";
import { PerlinFlowParticleMenu } from "./menu-sections/PerlinFlowParticleMenu";

type Props = {
  p5Instance: P5Instance<PerlinFlowVars> | null;
};

export const PerlinFlowMenu = ({ p5Instance }: Props) => {
  const isIdle = useIdle(TIME_TO_IDLE);
  const { state, set } = useGenericReducer<PerlinFlowVars>(
    initialPerlinFlowVars
  );

  useUpdateP5<PerlinFlowVars>(p5Instance, state);

  return (
    <Fragment>
      <StandardIconMenu
        initialLoopControl={true}
        p5Instance={p5Instance}
        show={!isIdle}
      />
      <BottomMenu show={!isIdle}>
        <Fragment>
          <MenuTabs labels={["Noise", "Particle"]}>
            <PerlinFlowNoiseMenu state={state} set={set} />
            <PerlinFlowParticleMenu state={state} set={set} />
          </MenuTabs>
        </Fragment>
      </BottomMenu>
    </Fragment>
  );
};
