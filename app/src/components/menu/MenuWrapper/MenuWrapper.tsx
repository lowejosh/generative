import React, { useCallback, useEffect, useMemo, useState } from "react";

import { P5Instance } from "types/p5";

import { PresetDatum } from "../IconMenu/Presets/Presets.types";
import { MenuWrapperContext } from "./MenuWrapper.provider";

type Props = {
  debounceDelay?: number;
  children: JSX.Element | JSX.Element[];
  p5Instance: P5Instance<any> | null;
  setState: (newState: any) => void;
  show: boolean;
};

const REFRESH_DELAY = 75;

export const MenuWrapper = ({
  debounceDelay,
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
        REFRESH_DELAY
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
      debounceDelay,
      p5Instance,
      show,
    }),
    [
      handlePresetClick,
      updateLocalStates,
      refreshAnimation,
      debounceDelay,
      p5Instance,
      show,
    ]
  );

  return (
    <MenuWrapperContext.Provider value={store}>
      {children}
    </MenuWrapperContext.Provider>
  );
};
