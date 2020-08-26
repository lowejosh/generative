import { useMemo, useReducer } from "react";
import { toSentenceCase } from "./formatting";

// Generic reducer for cleaning up state declarations
export const createGenericReducer = <Vars>() => (
  state: Vars,
  action: { type: keyof Vars; payload: Vars[keyof Vars] }
) => {
  const { type, payload } = action;
  return { ...state, [type]: payload } as any; // brute-forcing until properly typed indexes become a thing
};

// Creates an object of generic dispatch events given the variable keys
export const createGenericActions = <Vars>(
  initialVars: Vars,
  dispatch: React.Dispatch<{
    type: keyof Vars;
    payload: Vars[keyof Vars];
  }>
) =>
  (Object.keys(initialVars) as Array<keyof Vars>).reduce(
    (actions: { [x: string]: Function }, varKey) => {
      actions[`set${toSentenceCase(varKey as string)}`] = (
        value: Vars[keyof Vars]
      ) => dispatch({ type: varKey, payload: value });
      return actions;
    },
    {}
  );

// testing some stuff
export const useGenericReducer = <Vars>(initialVars: Vars) => {
  const reducer = useMemo(() => createGenericReducer<Vars>(), []);
  const [state, dispatch] = useReducer(reducer, { ...initialVars });
  const actions = createGenericActions<Vars>(initialVars, dispatch);

  return { state, dispatch, actions };
};
