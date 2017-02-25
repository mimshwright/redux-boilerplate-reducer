// Redux utils
import { handleAction } from 'redux-actions'
import reduceReducers from 'reduce-reducers'

// Lodash utils
import merge from 'lodash/merge'

import {createActionTypeName, createActionTypeValue, createActionCreatorName} from './naming'
import {generateAction} from './generateAction'
import * as reducers from './generateReducer'

export const generateGetter = (noun) => {
  const getterName = createActionCreatorName('get', noun)
  return {
    [getterName]: state => state[noun]
  }
}

export const generateBoolean = (name, initialState = false) => merge(
  generateAction('set', name),
  generateAction('toggle', name),

  generateGetter(name),

  { reducer: reduceReducers(
    reducers.generateResetReducer(name, initialState),
    reducers.generateSetReducer(name, initialState),
    reducers.generateToggleReducer(name, initialState)
  )}
)

let lib = {
  createActionTypeName,
  createActionTypeValue,
  createActionCreatorName,
  generateAction,
  generateGetter,

  generateBoolean
}
lib = merge(lib, reducers)

export default lib
module.exports = lib
