import { Box } from "@material-ui/core";
import React, { Fragment, useState } from "react";
import { MenuTabsWrapper, StyledTab } from "./MenuTabs.styled";

const TOP_MARGIN = "48px";

export type MenuTabsProps = {
  children: Array<JSX.Element>;
  labels: Array<string>;
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
            onClick={() => setSelectedIndex(index)}
            selected={selectedIndex === index}
            label={label}
            key={index}
          />
        ))}
      </MenuTabsWrapper>
      <Box marginTop={TOP_MARGIN}>{children[selectedIndex]}</Box>
    </Fragment>
  );
};
