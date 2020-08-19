import { MenuContainer, MenuCard } from "./Menu.styled";
import { useIdle } from "utils/hooks/useIdle";
import { Fade } from "@material-ui/core";
import React from "react";

type Props = {
  children: JSX.Element;
};

export const Menu = ({ children }: Props) => {
  const isIdle = useIdle(2000);

  return (
    <MenuContainer>
      <Fade in={!isIdle}>
        <MenuCard>{children}</MenuCard>
      </Fade>
    </MenuContainer>
  );
};
