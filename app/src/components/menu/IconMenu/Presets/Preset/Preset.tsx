import { useMenuWrapperContext } from "components/menu/MenuWrapper/MenuWrapper.provider";
import { PresetContainer } from "./Preset.styled";
import { PresetDatum } from "../Presets.types";
import React from "react";

type Props = {
  preset: PresetDatum<object>;
};

export const Preset = ({ preset }: Props) => {
  const { handlePresetClick } = useMenuWrapperContext();
  const handleClick = () => handlePresetClick && handlePresetClick(preset);

  return <PresetContainer onClick={handleClick}>{preset.name}</PresetContainer>;
};
