import { Refresh, ArrowBack, CameraAlt } from "@material-ui/icons/";
import { FlexRowPadded } from "components/StyledUI/Flex";
import { IconWrapper } from "./IconMenu.styled";
import { useHistory } from "react-router-dom";
import { IconMenu } from "./IconMenu";
import { P5Instance } from "types/p5";
import React from "react";

type Props = {
  show: boolean;
  p5Instance: P5Instance<any> | null;
};

/**
 *  Prebuilt icon menu for standard use case
 */
export const StandardIconMenu = ({ show, p5Instance }: Props) => {
  const history = useHistory();

  const onRefresh = () => p5Instance?.variables?.refresh(p5Instance);

  const onSave = () => p5Instance?.save("image");

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
        <IconWrapper onClick={onSave}>
          <CameraAlt color="primary" />
        </IconWrapper>
      </FlexRowPadded>
    </IconMenu>
  );
};
