import { IconMenuContainer } from "./IconMenu.styled";
import { Fade } from "@material-ui/core";
import React from "react";

type Props = {
  show: boolean;
  children: JSX.Element;
};

export const IconMenu = ({ show, children }: Props) => (
  <IconMenuContainer>
    <Fade in={show}>
      <div>{children}</div>
    </Fade>
  </IconMenuContainer>
);
