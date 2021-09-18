import { PerlinFlowVars } from "./PerlinFlow.variables";
import { P5Instance } from "types/p5";

/* Reuseable types */
export type PerlinFlowMenuProps = {
  p5Instance: P5Instance<PerlinFlowVars> | null;
};

export type PerlinFlowMenuSectionProps = {
  state: PerlinFlowVars;
  set: Record<keyof PerlinFlowVars, Function>;
};
