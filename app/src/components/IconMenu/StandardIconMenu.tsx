import { FlexRowPadded } from "components/StyledUI/Flex";
import React, { useState, useEffect } from "react";
import { IconWrapper } from "./IconMenu.styled";
import { useHistory } from "react-router-dom";
import { IconMenu } from "./IconMenu";
import { P5Instance } from "types/p5";
import {
  ArrowBack,
  CameraAlt,
  PlayArrow,
  Refresh,
  Pause,
} from "@material-ui/icons/";

type Props = {
  p5Instance: P5Instance<any> | null;
  disableLoopControl?: boolean;
  initialLoopControl?: boolean;
  show: boolean;
};

/**
 *  Prebuilt icon menu for standard use case
 */
export const StandardIconMenu = ({
  disableLoopControl,
  initialLoopControl,
  p5Instance,
  show,
}: Props) => {
  const [isLooping, setIsLooping] = useState(initialLoopControl);
  const history = useHistory();

  const onRefresh = () => p5Instance?.variables?.refresh(p5Instance);

  const onSave = () => p5Instance?.save("image");

  const onPlay = () => {
    setIsLooping(true);
  };

  const onPause = () => {
    setIsLooping(false);
  };

  const onBack = () => {
    history.push("/");
  };

  useEffect(() => {
    // Re-enable looping when loop control is disabled
    if (disableLoopControl) {
      p5Instance?.loop();
    } else {
      // Control the instance looping if loop control isnt disabled
      if (!isLooping) {
        p5Instance?.noLoop();
      } else {
        p5Instance?.loop();
      }
    }
  }, [isLooping, disableLoopControl, p5Instance]);

  return (
    <IconMenu show={show}>
      <FlexRowPadded>
        <IconWrapper onClick={onBack}>
          <ArrowBack color="primary" />
        </IconWrapper>
        {!disableLoopControl && (
          <IconWrapper
            onClick={isLooping ? onPause : onPlay}
            // disabled={disableLoopControl}
          >
            {isLooping ? (
              <Pause color="primary" />
            ) : (
              <PlayArrow color="primary" />
            )}
          </IconWrapper>
        )}
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
