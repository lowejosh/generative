import { StandardIconMenu } from "components/menu/IconMenu/StandardIconMenu/StandardIconMenu";
import { MenuWrapper } from "components/menu/MenuWrapper/MenuWrapper";
import { MenuSlider } from "components/menu/MenuSlider/MenuSlider";
import { BottomMenu } from "components/menu/BottomMenu";
import React, { Fragment, useMemo } from "react";
import { MenuItemWrapper } from "components/generic";
import { useGenericReducer } from "utils/data/state";
import { TIME_TO_IDLE } from "constants/numbers";
import { useUpdateP5 } from "hooks/useUpdateP5";
import { P5Instance } from "types/p5";
import { useIdle } from "hooks";
import {
  KaleidoscopeCausticsVars,
  initialKaleidoscopeCausticsVars,
  kaleidoscopeCausticsPresets,
} from "./KaleidoscopeCaustics.variables";

type Props = { p5Instance: P5Instance<KaleidoscopeCausticsVars> | null };

type NumberKeys<T> = { [K in keyof T]-?: T[K] extends number ? K : never }[keyof T];
type NumKey = NumberKeys<KaleidoscopeCausticsVars>;

type SliderDef = { title: string; key: NumKey; min: number; max: number; step?: number };
const mkSlider = (title: string, key: NumKey, min: number, max: number, step = 1): SliderDef => ({
  title, key, min, max, step
});

const sliders: SliderDef[] = [
  mkSlider("Wedges", "wedgeCount", 3, 24, 1),
  mkSlider("Noise Scale", "noiseScale", 0.0005, 0.01, 0.0001),
  mkSlider("Warp", "warp", 0, 2, 0.05),
  mkSlider("Sharpness", "sharpness", 0.5, 6, 0.1),
  mkSlider("Time Speed", "timeSpeed", 0, 0.6, 0.01),
  mkSlider("Resolution", "resolution", 1, 8, 0.5),
  mkSlider("Hue Base", "hueBase", 0, 360, 1),
  mkSlider("Hue Range", "hueRange", 0, 360, 1),
  mkSlider("Saturation", "saturation", 0, 100, 1),
  mkSlider("Gain", "gain", 0.2, 3, 0.05),
  mkSlider("Trail Decay", "decay", 0, 0.3, 0.005),
];

export const KaleidoscopeCausticsMenu = ({ p5Instance }: Props) => {
  const isIdle = useIdle(TIME_TO_IDLE);
  const { state, set, setState } = useGenericReducer<KaleidoscopeCausticsVars>(initialKaleidoscopeCausticsVars);
  useUpdateP5<KaleidoscopeCausticsVars>(p5Instance, state);

  // Precompute stable handlers and values
  const handlers = useMemo(() => {
    const h = {} as Record<NumKey, (v: number) => void>;
    sliders.forEach((s) => {
      h[s.key] = (v: number) => (set[s.key] as (arg: number) => void)(v);
    });
    return h;
  }, [set]);

  return (
    <MenuWrapper setState={setState} p5Instance={p5Instance} show={!isIdle}>
      <StandardIconMenu initialLoopControl presets={kaleidoscopeCausticsPresets} />
      <BottomMenu>
        <Fragment>
          <MenuItemWrapper>
            {sliders.slice(0, 4).map((s) => (
              <MenuSlider
                key={s.title}
                title={s.title}
                value={state[s.key] as number}
                setValue={handlers[s.key]}
                min={s.min}
                max={s.max}
                step={s.step}
              />
            ))}
          </MenuItemWrapper>
          <MenuItemWrapper>
            {sliders.slice(4, 8).map((s) => (
              <MenuSlider
                key={s.title}
                title={s.title}
                value={state[s.key] as number}
                setValue={handlers[s.key]}
                min={s.min}
                max={s.max}
                step={s.step}
              />
            ))}
          </MenuItemWrapper>
          <MenuItemWrapper>
            {sliders.slice(8).map((s) => (
              <MenuSlider
                key={s.title}
                title={s.title}
                value={state[s.key] as number}
                setValue={handlers[s.key]}
                min={s.min}
                max={s.max}
                step={s.step}
              />
            ))}
          </MenuItemWrapper>
        </Fragment>
      </BottomMenu>
    </MenuWrapper>
  );
};
