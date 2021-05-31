import { PresetDatum } from "../IconMenu/Presets/Presets.types";
import { MenuWrapperContext } from "./MenuWrapper.provider";
import React, { useCallback } from "react";
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
  const refreshAnimation = useCallback(
    () => setTimeout(() => p5Instance?.variables?.refresh(p5Instance), 5), // timeout removes a bug
    [p5Instance]
  );

  const handlePresetClick = useCallback(
    (preset: PresetDatum<any>) => {
      setState(preset.vars);
      refreshAnimation();
    },
    [refreshAnimation, setState]
  );

  const store = {
    handlePresetClick,
    refreshAnimation,
    p5Instance,
    show,
  };

  return (
    <MenuWrapperContext.Provider value={store}>
      {children}
    </MenuWrapperContext.Provider>
  );
};
