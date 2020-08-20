import { FlexRowPadded } from "components/StyledUI/Flex";
import { Refresh, ArrowBack } from "@material-ui/icons/";
import { IconWrapper } from "./IconMenu.styled";
import React, { MouseEvent } from "react";
import { IconMenu } from "./IconMenu";

type Props = {
  show: boolean;
  onRefresh: (event: MouseEvent) => void;
};

/**
 *  Prebuilt icon menu for standard use case
 */
export const StandardIconMenu = ({ show, onRefresh }: Props) => (
  <IconMenu show={show}>
    <FlexRowPadded>
      <IconWrapper>
        <ArrowBack color="primary" />
      </IconWrapper>
      <IconWrapper onClick={onRefresh}>
        <Refresh color="primary" />
      </IconWrapper>
    </FlexRowPadded>
  </IconMenu>
);
