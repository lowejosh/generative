import React, { MouseEvent } from "react";
import { IconMenu } from "./IconMenu";
import { FlexRow } from "components/StyledUI";
import { IconButton } from "@material-ui/core";
import { Refresh } from "@material-ui/icons/";

type Props = {
  show: boolean;
  onRefresh: (event: MouseEvent) => void;
};

const params = {
  size: "small",
};

/**
 *  Prebuilt icon menu for standard use case
 */
export const StandardIconMenu = ({ show, onRefresh }: Props) => {
  return (
    <IconMenu show={show}>
      <FlexRow>
        <IconButton onClick={onRefresh}>
          <Refresh color="primary" />
        </IconButton>
      </FlexRow>
    </IconMenu>
  );
};
