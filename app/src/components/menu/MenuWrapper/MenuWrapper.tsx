import { MenuWrapperContext } from "./MenuWrapper.provider";
import React from "react";

type Props = MenuWrapperContext & {
  children: JSX.Element | JSX.Element[];
};

export const MenuWrapper = ({
  onPresetClick,
  p5Instance,
  children,
  show,
}: Props) => {
  const store = {
    onPresetClick,
    p5Instance,
    show,
  };

  return (
    <MenuWrapperContext.Provider value={store}>
      {children}
    </MenuWrapperContext.Provider>
  );
};
