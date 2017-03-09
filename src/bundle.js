// Lodash utils
import merge from 'lodash/merge'

// import reduceReducers from 'reduce-reducers'
import {handleAction, handleActions} from 'redux-actions'

import {generateAction} from './generateAction'
import {generateSelector} from './generateSelector'
import {createActionTypeValue} from './naming'

/**
 * Creates a 'Duck', an object containing action type constants, action creators, reducers,
 * and a getter.
 */
export const generateBundle = (name, initialState = NaN, additionalActions = null, customSelector = null) => {
  let selector = customSelector || generateSelector(name)
  let bundle = merge(
    selector,

    {
      name: name,
      reducers: {},
      reducer: function (state, action) { return handleActions(this.reducers, initialState).call(this, state, action) }
    }
  )

  if (additionalActions) {
    // for every key (verb) passed into additionalActions,
    // add a new action type, action creator, and reducer
    // and merge them with the bundle
    Object.keys(additionalActions).forEach((verb) => {
      bundle = addActionAndReducerToBundle(bundle, verb, additionalActions[verb], initialState)
    })
  }
  return bundle
}

/**
 * Adds a new actionType, actionCreator and reducer to an existing bundle.
 */
export const addActionAndReducerToBundle = (existingBundle, verb, reducer, initialState) => {
  const noun = existingBundle.name
  const actionType = createActionTypeValue(verb, noun)
  const newBundle = addActionToBundle(existingBundle, verb, noun)
  return addReducerToBundle(newBundle, actionType, reducer, initialState)
}

/**
 * Adds a new action and action creator to a bundle.
 */
export const addActionToBundle = (existingBundle, verb) => {
  return merge(generateAction(verb, existingBundle.name), existingBundle)
}

/**
 * Adds a new reducer for an action type to an exisiting reducer.
 * Essentially a shortcut for reduceReducers combined with handleAction.
 */
export const addReducerToBundle = (bundle, actionType, reducer, initialState) => {
  const newBundle = merge({}, bundle)
  newBundle.reducers[actionType] = handleAction(actionType, reducer, initialState)
  return newBundle
}
