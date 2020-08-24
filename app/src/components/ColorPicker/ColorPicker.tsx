import React, { useState } from "react";
import { styled } from "@material-ui/core";

const Input = styled("input")({
  WebkitAppearance: "none",
  borderRadius: "100%",
  cursor: "pointer",
  outline: "none",
  border: "none",
  height: "20px",
  width: "20px",

  "&::-webkit-color-swatch-wrapper": {
    padding: 0,
  },

  "&::-webkit-color-swatch": {
    borderRadius: "100%",
    border: "none",
  },
});

type Props = {
  color: string;
  setColor: Function;
};

export const ColorPicker = ({ color, setColor }: Props) => (
  <Input
    type="color"
    onChange={(e) => setColor(e.target.value)}
    value={color}
  />
);
