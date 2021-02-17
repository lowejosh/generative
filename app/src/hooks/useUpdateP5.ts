import { P5Defaults, P5Instance } from "types/p5";
import { useEffect } from "react";

/**
 * Hook that live-updates the p5 instance with new variables whenever the menu state changes
 * @param p5Instance
 * @param state
 */
export const useUpdateP5 = <T extends P5Defaults>(
  p5Instance: P5Instance<T> | null,
  state: T,
  refreshOnChange?: boolean
) => {
  useEffect(() => {
    if (p5Instance) {
      if (refreshOnChange) {
        p5Instance.variables?.refresh(p5Instance);
      }
      p5Instance.variables = { ...p5Instance.variables, ...state };
    }
  }, [p5Instance, state, refreshOnChange]);
};
