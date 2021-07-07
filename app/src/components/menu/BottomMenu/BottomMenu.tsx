import { useMenuWrapperContext } from "../MenuWrapper/MenuWrapper.provider";
import { MenuCard, BottomMenuContainer } from "./BottomMenu.styled";
import { Fade } from "@material-ui/core";
import React from "react";

type Props = {
  children: JSX.Element;
};

export const BottomMenu = ({ children }: Props) => {
  const { show } = useMenuWrapperContext();
  return (
    <BottomMenuContainer>
      <Fade in={show}>
        <MenuCard>{children}</MenuCard>
      </Fade>
    </BottomMenuContainer>
  );
};
