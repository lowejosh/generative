import React from "react";

import { useGenericReducer } from "utils/data/state";
import { TIME_TO_IDLE } from "constants/numbers";
import { useUpdateP5 } from "hooks/useUpdateP5";
import { P5Instance } from "types/p5";
import { useIdle } from "hooks";

import { StandardIconMenu } from "components/menu/IconMenu/StandardIconMenu/StandardIconMenu";
import { MenuWrapper } from "components/menu/MenuWrapper/MenuWrapper";
import { MenuTabs } from "components/menu/MenuTabs/MenuTabs";
import { BottomMenu } from "components/menu/BottomMenu";

import {
  initialCityscapeVars,
  CityscapeVars,
  cityscapePresets,
} from "./Cityscape.variables";
import { CityscapeBuildingMenu } from "./menu-sections/CityscapeBuildingMenu";
import { CityscapeColorMenu } from "./menu-sections/CityscapeColorMenu";
import { CityscapeStarsMenu } from "./menu-sections/CityscapeStarsMenu";

type Props = {
  p5Instance: P5Instance<CityscapeVars> | null;
};

const DEBOUNCE_DELAY = 500;

export const CityscapeMenu = ({ p5Instance }: Props) => {
  const isIdle = useIdle(TIME_TO_IDLE);
  const { state, set, setState } =
    useGenericReducer<CityscapeVars>(initialCityscapeVars);

  useUpdateP5<CityscapeVars>(p5Instance, state);

  return (
    <MenuWrapper
      debounceDelay={DEBOUNCE_DELAY}
      p5Instance={p5Instance}
      setState={setState}
      show={!isIdle}
    >
      <StandardIconMenu initialLoopControl presets={cityscapePresets} />
      <BottomMenu>
        <MenuTabs labels={["Building", "Color", "Stars"]}>
          <CityscapeBuildingMenu set={set} state={state} />
          <CityscapeColorMenu set={set} state={state} />
          <CityscapeStarsMenu set={set} state={state} />
        </MenuTabs>
      </BottomMenu>
    </MenuWrapper>
  );
};
