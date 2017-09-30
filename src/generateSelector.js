import { createActionCreatorName } from "./naming";

/**
 * Returns a selector function that just returns the value based on the state.
 */
export const generateSelector = (noun, selector = null) => {
  const selectorName = createActionCreatorName("select", noun);
  selector = selector || (state => state[noun]);
  return {
    [selectorName]: selector,
  };
};
