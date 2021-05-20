import { PresetDatum } from "../IconMenu/Presets/Presets.types";
import { createContext, useContext } from "react";
import { P5Instance } from "types/p5";

export type MenuWrapperContext = {
  onPresetClick?: (preset: PresetDatum<any>) => void;
  p5Instance: P5Instance<any> | null;
  show: boolean;
};

export const MenuWrapperContext =
  createContext<MenuWrapperContext | undefined>(undefined);

export const useMenuWrapperContext = () => {
  const ctx = useContext(MenuWrapperContext);
  if (!ctx) {
    throw new Error(
      "useMenuWrapperContext must be used from within a MenuWrapperContext Provider"
    );
  }
  return ctx;
};
