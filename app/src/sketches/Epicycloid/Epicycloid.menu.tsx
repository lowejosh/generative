import { initialEpicycloidVars, EpicycloidVars } from "./Epicycloid.variables";
import { StandardIconMenu } from "components/IconMenu/StandardIconMenu";
import { MenuItemWrapper, FlexRowPadded } from "components/StyledUI";
import { MenuCheckbox } from "components/MenuCheckbox/MenuCheckbox";
import { ColorPicker } from "components/ColorPicker/ColorPicker";
import React, {
  Fragment,
  useEffect,
  useReducer,
  useMemo,
  useCallback,
} from "react";
import { MenuSlider } from "components/MenuSlider/MenuSlider";
import { createGenericReducer, useGenericReducer } from "utils/state";
import { BottomMenu } from "components/BottomMenu";
import { TIME_TO_IDLE } from "constants/numbers";
import { P5Instance } from "types/p5";
import { useIdle } from "hooks";
import {
  formatTimesValue,
  formatPixelValue,
  formatPercentValue,
} from "utils/menu";

type Props = {
  p5Instance: P5Instance<EpicycloidVars> | null;
};

const sliderParams = {
  min: 0,
  max: 100,
  step: 1,
};

export const EpicycloidMenu = ({ p5Instance }: Props) => {
  const reducer = useMemo(() => createGenericReducer<EpicycloidVars>(), []);
  const [state, dispatch] = useReducer(reducer, { ...initialEpicycloidVars });
  const isIdle = useIdle(TIME_TO_IDLE);

  const test = useGenericReducer<EpicycloidVars>(initialEpicycloidVars);
  console.log(test);

  // live update the p5Instance items
  useEffect(() => {
    if (p5Instance) {
      Object.assign(p5Instance.variables, {
        totalVertices: state.totalVertices,
        factor: state.factor,
        radius: state.radius,
        isAutoplaying: state.isAutoplaying,
        strokeOpacity: state.strokeOpacity,
        strokeWidth: state.strokeWidth,
        autoplaySpeed: state.autoplaySpeed,
        color: state.color,
      });
    }
  }, [p5Instance, state]);

  return (
    <Fragment>
      <StandardIconMenu
        show={!isIdle}
        p5Instance={p5Instance}
        disableLoopControl={!state.isAutoplaying}
        initialLoopControl
      />
      <BottomMenu show={!isIdle}>
        <Fragment>
          <MenuItemWrapper>
            <MenuSlider
              title="Radius"
              value={state.radius}
              setValue={(val: number) =>
                dispatch({ type: "radius", payload: val })
              }
              {...sliderParams}
              min={100}
              max={800}
            />
            <MenuSlider
              title="Stroke Width"
              labelFormat={formatPixelValue}
              value={state.strokeWidth}
              setValue={(val: number) =>
                dispatch({ type: "strokeWidth", payload: val })
              }
              step={1}
              min={1}
              max={5}
            />
            <MenuSlider
              title="Stroke Opacity"
              labelFormat={formatPercentValue}
              value={state.strokeOpacity}
              setValue={(val: number) =>
                dispatch({ type: "strokeOpacity", payload: val })
              }
              {...sliderParams}
            />
          </MenuItemWrapper>
          <MenuItemWrapper>
            <MenuSlider
              title="Total Vertices"
              value={state.totalVertices}
              setValue={(val: number) =>
                dispatch({ type: "totalVertices", payload: val })
              }
              {...sliderParams}
              min={0}
              max={1000}
            />
            <MenuSlider
              disabled={state.isAutoplaying}
              title={`Factor${
                state.isAutoplaying ? " (Disabled when autoplaying)" : ""
              }`}
              labelFormat={formatTimesValue}
              value={state.factor}
              setValue={(val: number) =>
                dispatch({ type: "factor", payload: val })
              }
              {...sliderParams}
            />
            <MenuSlider
              disabled={!state.isAutoplaying}
              title={`Autoplay Speed${
                !state.isAutoplaying ? " (Disabled when not autoplaying)" : ""
              }`}
              labelFormat={formatTimesValue}
              value={state.autoplaySpeed * 100}
              setValue={(val: number) =>
                dispatch({ type: "autoplaySpeed", payload: val / 100 })
              }
              {...sliderParams}
              max={10}
              step={0.1}
            />
          </MenuItemWrapper>
          <FlexRowPadded spacing={3}>
            <MenuCheckbox
              checked={state.isAutoplaying}
              setChecked={(val: boolean) => {
                dispatch({ type: "isAutoplaying", payload: val });
              }}
              title="Autoplay"
            />
            <ColorPicker
              color={state.color}
              setColor={(val: string) =>
                dispatch({ type: "color", payload: val })
              }
              title="Color"
            />
          </FlexRowPadded>
        </Fragment>
      </BottomMenu>
    </Fragment>
  );
};
