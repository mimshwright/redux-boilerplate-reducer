import { createAction, handleAction } from 'redux-actions'
import reduceReducers from 'reduce-reducers'

import _merge from 'lodash/merge'
import _upperFirst from 'lodash/upperFirst'
import _camelCase from 'lodash/camelCase'
import _snakeCase from 'lodash/snakeCase'

const _upperSnakeCase = s => _snakeCase(s).toUpperCase()
const _pascalCase = s => _upperFirst(_camelCase(s))

export const createActionType = (verb, noun) => _upperSnakeCase(verb) + '_' + _upperSnakeCase(noun)
export const createActionCreatorName = (verb, noun) => _camelCase(verb) + _pascalCase(noun)

export const generateAction = (verb, noun) => {
  const actionType = createActionType(verb, noun)
  const actionCreatorName = createActionCreatorName(verb, noun)

  return {
    [actionType]: actionType,
    [actionCreatorName]: createAction(actionType)
  }
}

export const generateGetter = (noun) => {
  const getterName = createActionCreatorName('get', noun)
  return {
    [getterName]: state => state[noun]
  }
}

const generateReducer = (verb, noun, reducer, initialState = null) => (
  handleAction(createActionType(verb, noun), reducer, initialState)
)

export const generateSetReducer = (noun, initialState = null) => {
  return generateReducer('set', noun, (state, action) => action.payload, initialState)
}

export const generateToggleReducer = (noun, initialState = null) => {
  return generateReducer('toggle', noun, state => !state, initialState)
}

const coercePayloadToType = (type) => (reducer) => {
  return (state, action) => {
    if (action) {
      action.payload = type(action.payload)
    }
    return reducer(state, action)
  }
}
const coercePayloadToBoolean = coercePayloadToType(Boolean)

const boolean = (name, initialState = false) => _merge(
  generateAction('set', name),
  generateAction('toggle', name),

  generateGetter(name),

  { reducer: reduceReducers(
    coercePayloadToBoolean(generateSetReducer(name, initialState)),
    generateToggleReducer(name, initialState)
  )}
)

export const generateActions = {
  boolean
}

const lib = {
  createActionType,
  createActionCreatorName,
  generateAction,
  generateActions,
  generateGetter
}
export default lib
module.exports = lib
