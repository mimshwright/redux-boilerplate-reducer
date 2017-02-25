// Redux utils
import { handleAction } from 'redux-actions'
import reduceReducers from 'reduce-reducers'

// Lodash utils
import merge from 'lodash/merge'

import {createActionTypeName, createActionTypeValue, createActionCreatorName} from './naming'
import {generateAction} from './generateAction'
import {generateGetter} from './generateGetter'
import * as reducers from './generateReducer'



const commonActions = (name) => ([
  generateAction('reset', name),
  generateAction('set', name)
])

const commonReducers = (name, initialState) => ([
  reducers.generateResetReducer(name, initialState),
  reducers.generateSetReducer(name, initialState)
])

export const generateBoolean = (name, initialState = false) => merge(
  generateGetter(name),

  ...commonActions(name),
  generateAction('toggle', name),

  { reducer: reduceReducers(
    ...commonReducers(name, initialState),
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
