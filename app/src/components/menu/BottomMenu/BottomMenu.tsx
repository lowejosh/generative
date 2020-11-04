import { MenuCard, BottomMenuContainer } from "./BottomMenu.styled";
import { Fade } from "@material-ui/core";
import React from "react";

type Props = {
  show: boolean;
  children: JSX.Element;
};

export const BottomMenu = ({ show, children }: Props) => {
  return (
    <BottomMenuContainer>
      <Fade in={show}>
        <MenuCard>{children}</MenuCard>
      </Fade>
    </BottomMenuContainer>
  );
};
