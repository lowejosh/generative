import { useMenuWrapperContext } from "components/menu/MenuWrapper/MenuWrapper.provider";
import { useEffect } from "react";

export const useUpdateLocalStateWhenChanged = (
  currentVal: any,
  setLocalVal: Function
) => {
  const { updateLocalStates } = useMenuWrapperContext();

  useEffect(() => {
    if (updateLocalStates) {
      setLocalVal(currentVal);
    }
  }, [currentVal, setLocalVal, updateLocalStates]);
};
