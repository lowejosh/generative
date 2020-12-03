import { Box } from "@material-ui/core";
import React, { Fragment, useState } from "react";
import { MenuTabsWrapper, StyledTab } from "./MenuTabs.styled";

export type MenuTabsProps = {
  labels: Array<string>;
  children: Array<JSX.Element>;
};

/**
 * Simple abstraction of the material-ui tab components
 * @param labels Array of strings used to build the tabs
 * @param onSelected Callback that passes the selected index as the parameter
 */
export const MenuTabs = ({ children, labels }: MenuTabsProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  /* errors */
  if (!labels.length || !children.length) {
    throw new Error(
      "MenuTabs: Please provide an array of atleast one item for the labels/children props"
    );
  }

  if (labels.length !== children.length) {
    throw new Error(
      "MenuTabs: Please have matching lengths for child components and labels"
    );
  }

  return (
    <Fragment>
      <MenuTabsWrapper>
        {labels.map((label, index) => (
          <StyledTab
            label={label}
            selected={selectedIndex === index}
            onClick={() => setSelectedIndex(index)}
          />
        ))}
      </MenuTabsWrapper>
      <Box marginTop="48px">{children[selectedIndex]}</Box>
    </Fragment>
  );
};
