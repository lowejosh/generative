import { CityscapeVars } from "./Cityscape.variables";

export type CityscapeMenuSectionProps = {
  state: CityscapeVars;
  set: Record<keyof CityscapeVars, Function>;
};
