import { PresetDatum } from "../IconMenu/Presets/Presets.types";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { MenuWrapperContext } from "./MenuWrapper.provider";
import { DEBOUNCE_DELAY } from "constants/numbers";
import { P5Instance } from "types/p5";

type Props = {
  children: JSX.Element | JSX.Element[];
  p5Instance: P5Instance<any> | null;
  setState: (newState: any) => void;
  show: boolean;
};

export const MenuWrapper = ({
  p5Instance,
  setState,
  children,
  show,
}: Props) => {
  const [updateLocalStates, setUpdateLocalStates] = useState(false);

  useEffect(() => {
    if (updateLocalStates) {
      setUpdateLocalStates(false);
    }
  }, [updateLocalStates]);

  const refreshAnimation = useCallback(
    () =>
      setTimeout(
        () => p5Instance?.variables?.refresh(p5Instance),
        DEBOUNCE_DELAY * 15
      ), // timeout removes a bug
    [p5Instance]
  );

  const handlePresetClick = useCallback(
    (preset: PresetDatum<any>) => {
      setState(preset.vars);
      setUpdateLocalStates(true);
      refreshAnimation();
    },
    [refreshAnimation, setState]
  );

  const store: MenuWrapperContext = useMemo(
    () => ({
      setUpdateLocalStates,
      updateLocalStates,
      handlePresetClick,
      refreshAnimation,
      p5Instance,
      show,
    }),
    [handlePresetClick, refreshAnimation, p5Instance, show, updateLocalStates]
  );

  return (
    <MenuWrapperContext.Provider value={store}>
      {children}
    </MenuWrapperContext.Provider>
  );
};
