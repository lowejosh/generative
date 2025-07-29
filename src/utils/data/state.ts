import { useMemo, useReducer, Reducer } from "react";

// abstract dispatch action
type Action<Vars> = {
  type: keyof Vars | "all";
  payload: Vars[keyof Vars] | Vars;
};

// Generic reducer for cleaning up state declarations
export const createGenericReducer =
  <Vars>() =>
  (state: Vars, action: Action<Vars>) => {
    const { type, payload } = action;
    if (type === "all") {
      return { ...state, ...payload } as any;
    } else {
      return { ...state, [type]: payload } as any; // brute-forcing until properly typed indexes become a thing
    }
  };

// Creates an object of generic dispatch events given the variable keys
export const createGenericActions = <Vars>(
  initialVars: Vars,
  dispatch: React.Dispatch<Action<Vars>>
) =>
  // create a set object that holds the dispatch events
  (Object.keys(initialVars as any) as Array<keyof Vars>).reduce<
    Record<keyof Vars, Function>
  >((set: Record<string, Function>, varKey) => {
    set[varKey.toString()] = (value: Vars[keyof Vars]) =>
      dispatch({ type: varKey, payload: value });
    return set as Record<keyof Vars, Function>; // enforce types for vscode autocompletion
  }, {} as Record<keyof Vars, Function>); // ""

// abstracts away generic reducer production when given initial variables
export const useGenericReducer = <Vars>(initialVars: Vars) => {
  // standard reducer
  const reducer = useMemo(() => createGenericReducer<Vars>(), []);
  const [state, dispatch] = useReducer<Reducer<Vars, Action<Vars>>>(reducer, {
    ...initialVars,
  });

  // generic dispatch shortcuts with some typescript autocompletion
  const set = useMemo(
    () => createGenericActions<Vars>(initialVars, dispatch),
    [initialVars]
  );
  const setState = (newState: Vars) =>
    dispatch({ type: "all", payload: newState });

  return { state, dispatch, set, setState };
};
