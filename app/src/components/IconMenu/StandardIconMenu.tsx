import { FlexRowPadded } from "components/StyledUI/Flex";
import { Refresh, ArrowBack } from "@material-ui/icons/";
import { IconWrapper } from "./IconMenu.styled";
import { useHistory } from "react-router-dom";
import React, { MouseEvent } from "react";
import { IconMenu } from "./IconMenu";

type Props = {
  show: boolean;
  onRefresh: (event: MouseEvent) => void;
};

/**
 *  Prebuilt icon menu for standard use case
 */
export const StandardIconMenu = ({ show, onRefresh }: Props) => {
  const history = useHistory();

  const onBack = () => {
    history.push("/");
  };

  return (
    <IconMenu show={show}>
      <FlexRowPadded>
        <IconWrapper onClick={onBack}>
          <ArrowBack color="primary" />
        </IconWrapper>
        <IconWrapper onClick={onRefresh}>
          <Refresh color="primary" />
        </IconWrapper>
      </FlexRowPadded>
    </IconMenu>
  );
};
