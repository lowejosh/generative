import { PerlinFlowVars } from "./PerlinFlow.variables";

/* Reuseable types */
export type PerlinFlowMenuSectionProps = {
  state: PerlinFlowVars;
  set: Record<keyof PerlinFlowVars, Function>;
};
