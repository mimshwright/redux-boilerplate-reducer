import merge from 'lodash/merge'
import {handleAction} from 'redux-actions'
import {createActionTypeValue} from './naming'

/**
 * Creates a reducer for a given verb-noun combo.
 * @param {string} verb
 * @param {string} noun
 * @param {Function} reducer
 * @param {*} initialState
 */
export const generateReducer = (verb, noun, reducer, initialState = null) => {
  const type = createActionTypeValue(verb, noun)
  return handleAction(type, reducer, initialState)
}

/**
 * Creates a reducer setting a value
 * @param {string} noun
 * @param {*} initialState
 */
export const generateSetReducer = (noun, initialState = null) => {
  return generateReducer('set', noun, (state, action) => action.payload, initialState)
}

/**
 * Creates a reducer for a resetting to the initial state
 * @param {string} noun
 * @param {*} initialState
 */
export const generateResetReducer = (noun, initialState = null) => {
  return generateReducer('reset', noun, (state, actions) => initialState, initialState)
}

/**
 * Creates a reducer for setting a property inside the targeted object.
 * @param {string} noun
 * @param {string} property
 * @param {*} initialState
 */
export const generateSetPropertyReducer = (noun, property, initialState = null) => {
  noun = noun + ' ' + property
  const reducer = (state, action) => merge(state, {[property]: action.payload})
  return generateReducer('set', noun, reducer, initialState)
}

/**
 * Flips between true and false
 * @param {string} noun
 * @param {*} initialState
 */
export const generateToggleReducer = (noun, initialState = null) => {
  return generateReducer('toggle', noun, (state, action) => !state, initialState)
}
