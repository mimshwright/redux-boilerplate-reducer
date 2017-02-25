import {createActionCreatorName} from './naming'

/**
 * Returns a getter function that just returns the value based on the state.
 */
export const generateGetter = (noun) => {
  const getterName = createActionCreatorName('get', noun)
  return {
    [getterName]: state => state
  }
}
