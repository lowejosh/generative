import { useMenuWrapperContext } from "components/menu/MenuWrapper/MenuWrapper.provider";
import { StandardIconMenuSeparator } from "./StandardIconMenu.styled";
import React, { useState, useEffect, useCallback } from "react";
import { FlexRowPadded } from "components/generic/Flex";
import { PresetData } from "../Presets/Presets.types";
import { IconWrapper } from "../IconMenu.styled";
import { useHistory } from "react-router-dom";
import { Presets } from "../Presets/Presets";
import { IconMenu } from "../IconMenu";
import {
  ArrowBack,
  CameraAlt,
  PlayArrow,
  Refresh,
  Pause,
} from "@material-ui/icons/";

type Props = {
  disableLoopControl?: boolean;
  initialLoopControl?: boolean;
  presets?: PresetData<object>;
};

const icons = {
  SCREENSHOT: <CameraAlt color="primary" />,
  REFRESH: <Refresh color="primary" />,
  BACK: <ArrowBack color="primary" />,
  PLAY: <PlayArrow color="primary" />,
  PAUSE: <Pause color="primary" />,
};

/**
 *  Prebuilt icon menu for standard use case
 */
export const StandardIconMenu = ({
  disableLoopControl,
  initialLoopControl,
  presets,
}: Props) => {
  const [isLooping, setIsLooping] = useState(initialLoopControl);
  const { show, p5Instance } = useMenuWrapperContext();
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
      <StandardIconMenuSeparator>
        <FlexRowPadded>
          <IconWrapper onClick={onBack}>{icons.BACK}</IconWrapper>
          {!disableLoopControl && (
            <IconWrapper onClick={isLooping ? onPause : onPlay}>
              {isLooping ? icons.PAUSE : icons.PLAY}
            </IconWrapper>
          )}
          <IconWrapper onClick={onRefresh}>{icons.REFRESH}</IconWrapper>
          <IconWrapper onClick={onSave}>{icons.SCREENSHOT}</IconWrapper>
        </FlexRowPadded>
        {presets ? <Presets presets={presets} /> : null}
      </StandardIconMenuSeparator>
    </IconMenu>
  );
};
