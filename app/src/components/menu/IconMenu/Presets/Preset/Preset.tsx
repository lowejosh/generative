import { useMenuWrapperContext } from "components/menu/MenuWrapper/MenuWrapper.provider";
import { PresetContainer } from "./Preset.styled";
import { PresetDatum } from "../Presets.types";
import React from "react";

type Props = {
  preset: PresetDatum<object>;
};

export const Preset = ({ preset }: Props) => {
  const { onPresetClick } = useMenuWrapperContext();
  const handleClick = () => onPresetClick && onPresetClick(preset);

  return <PresetContainer onClick={handleClick}>{preset.name}</PresetContainer>;
};
