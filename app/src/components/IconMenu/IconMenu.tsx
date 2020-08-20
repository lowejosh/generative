import { IconMenuContainer } from "./IconMenu.styled";
import { Fade } from "@material-ui/core";
import React, { Fragment } from "react";

type Props = {
  show: boolean;
  children: JSX.Element;
};

export const IconMenu = ({ show, children }: Props) => {
  return (
    <IconMenuContainer>
      <Fade in={show}>
        <Fragment>{children}</Fragment>
      </Fade>
    </IconMenuContainer>
  );
};
