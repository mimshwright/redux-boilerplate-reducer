import { createAction, handleAction } from 'redux-actions'
import reduceReducers from 'reduce-reducers'

import merge from 'lodash/merge'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'
import snakeCase from 'lodash/snakeCase'

const upperSnakeCase = s => snakeCase(s).toUpperCase()
const pascalCase = s => upperFirst(camelCase(s))

export const createActionType = (verb, noun) => upperSnakeCase(verb + ' ' + noun)
export const createActionCreatorName = (verb, noun) => camelCase(verb) + pascalCase(noun)

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

export const generateReducer = (verb, noun, reducer, initialState = null) => {
  const type = createActionType(verb, noun)
  return handleAction(type, reducer, initialState)
}

export const generateSetReducer = (noun, initialState = null) => {
  return generateReducer('set', noun, (state, action) => action.payload, initialState)
}

export const generateSetPropertyReducer = (noun, property, initialState = null) => {
  noun = noun + ' ' + property
  const reducer = (state, action) => merge(state, {[property]: action.payload})
  return generateReducer('set', noun, reducer, initialState)
}

export const generateToggleReducer = (noun, initialState = null) => {
  return generateReducer('toggle', noun, (state, action) => !state, initialState)
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

const boolean = (name, initialState = false) => merge(
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
  generateGetter,

  generateReducer,
  generateSetReducer,
  generateSetPropertyReducer,
  generateToggleReducer
}
export default lib
module.exports = lib
