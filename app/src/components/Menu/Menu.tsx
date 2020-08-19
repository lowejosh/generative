import React from "react";
import { Fade } from "@material-ui/core";

type Props = {
  children: Element;
};

export const Menu = ({ children }: Props) => {
  return (
    <Fade in>
      <div>{children}</div>
    </Fade>
  );
};
