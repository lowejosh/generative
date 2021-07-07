import { IconMenuContainer } from "./IconMenu.styled";
import { Box, Fade } from "@material-ui/core";
import React from "react";

type Props = {
  show: boolean;
  children: JSX.Element;
};

export const IconMenu = ({ show, children }: Props) => (
  <IconMenuContainer>
    <Fade in={show}>
      <Box width="100%">{children}</Box>
    </Fade>
  </IconMenuContainer>
);
