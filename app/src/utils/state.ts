import { useMemo, useReducer } from "react";

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
  // create a set object that holds the dispatch events
  (Object.keys(initialVars) as Array<keyof Vars>).reduce<
    Record<keyof Vars, Function>
  >((set: Record<string, Function>, varKey) => {
    set[varKey.toString()] = (value: Vars[keyof Vars]) =>
      dispatch({ type: varKey, payload: value });
    return set as Record<keyof Vars, Function>;
  }, {} as Record<keyof Vars, Function>);

// testing some stuff
export const useGenericReducer = <Vars>(initialVars: Vars) => {
  // standard reducer
  const reducer = useMemo(() => createGenericReducer<Vars>(), []);
  const [state, dispatch] = useReducer(reducer, { ...initialVars });

  // generic dispatch shortcuts with some typescript autocompletion
  const set = useMemo(() => createGenericActions<Vars>(initialVars, dispatch), [
    initialVars,
  ]);

  return { state, dispatch, set };
};
