import { FlexRowPadded } from "components/generic/Flex";
import React, { useState, useEffect, useCallback } from "react";
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

  const onRefresh = useCallback(
    () => p5Instance?.variables?.refresh(p5Instance),
    [p5Instance]
  );

  const onSave = useCallback(() => p5Instance?.save("image"), [p5Instance]);

  const onPlay = useCallback(() => {
    setIsLooping(true);
  }, []);

  const onPause = useCallback(() => {
    setIsLooping(false);
  }, []);

  const onBack = useCallback(() => {
    history.push("/");
  }, [history]);

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
          <IconWrapper onClick={isLooping ? onPause : onPlay}>
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
