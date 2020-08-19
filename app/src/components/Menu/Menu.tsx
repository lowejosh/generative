import React from "react";
import { useIdle } from "utils/hooks/useIdle";
import { Fade } from "@material-ui/core";
import { MenuContainer } from "./Menu.styled";

type Props = {
  children: JSX.Element;
};

export const Menu = ({ children }: Props) => {
  const isIdle = useIdle(2000);
  console.log(isIdle);

  return (
    <MenuContainer>
      <Fade in>
        <div>{children}</div>
      </Fade>
    </MenuContainer>
  );
};
