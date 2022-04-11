import { StandardIconMenu } from "components/menu/IconMenu/StandardIconMenu/StandardIconMenu";
import { initialCityscapeVars, CityscapeVars } from "./Cityscape.variables";
import { MenuWrapper } from "components/menu/MenuWrapper/MenuWrapper";
import { MenuSlider } from "components/menu/MenuSlider/MenuSlider";
import { BottomMenu } from "components/menu/BottomMenu";
import React, { Fragment, useCallback } from "react";
import { useGenericReducer } from "utils/data/state";
import { MenuItemWrapper } from "components/generic";
import { TIME_TO_IDLE } from "constants/numbers";
import { useUpdateP5 } from "hooks/useUpdateP5";
import { P5Instance } from "types/p5";
import { useIdle } from "hooks";
import { MenuTabs } from "components/menu/MenuTabs/MenuTabs";
import { CityScapeBuildingMenu } from "./menu-sections/CityscapeBuildingMenu";

type Props = {
  p5Instance: P5Instance<CityscapeVars> | null;
};

const sliderParams = {
  min: 0,
  max: 100,
  step: 1,
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
      <StandardIconMenu initialLoopControl />
      <BottomMenu>
        <MenuTabs labels={["Building", "Color"]}>
          <CityScapeBuildingMenu set={set} state={state} />
          <MenuItemWrapper>
            <MenuSlider
              setValue={useCallback(
                (val: number) => set.colorVariance(val),
                [set]
              )}
              value={state.colorVariance}
              title="Color variance"
              {...sliderParams}
              step={0.01}
              min={0.01}
              max={1}
              refresh
            />
            <MenuSlider
              setValue={useCallback(
                (val: number) => set.fogIncrement(val),
                [set]
              )}
              value={state.fogIncrement}
              title="Fog increment"
              {...sliderParams}
              step={0.01}
              min={0}
              max={1}
              refresh
            />
          </MenuItemWrapper>
        </MenuTabs>
      </BottomMenu>
    </MenuWrapper>
  );
};
