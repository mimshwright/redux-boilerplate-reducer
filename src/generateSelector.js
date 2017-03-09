import {createActionCreatorName} from './naming'

/**
 * Returns a selector function that just returns the value based on the state.
 */
export const generateSelector = (noun) => {
  const selectorName = createActionCreatorName('get', noun)
  return {
    [selectorName]: state => state[noun]
  }
}
