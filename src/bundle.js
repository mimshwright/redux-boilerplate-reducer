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
export const generateBundle = (name, initialState = null, additionalActions = null, customSelector = null) => {
  let bundle = merge(
    {
      name,
      reducers: {},
      reducer: () => { throw new Error('Reducer is not yet defined. Use addReducerToBundle() or addActionAndReducerToBundle()') }
    },
    generateSelector(name, customSelector)
  )

  if (additionalActions) {
    // for every key (verb) passed into additionalActions,
    // add a new action type, action creator, and reducer
    // and merge them with the bundle
    Object.keys(additionalActions).forEach((verb) => {
      bundle = addActionAndReducerToBundle(bundle, verb, additionalActions[verb], initialState)
    })
  }

  bundle.reducer = function (state, action) {
    return handleActions(bundle.reducers, initialState)(state, action)
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
  return merge(existingBundle, generateAction(verb, existingBundle.name))
}

/**
 * Adds a new reducer for an action type to an exisiting reducer.
 * Essentially a shortcut for reduceReducers combined with handleAction.
 */
export const addReducerToBundle = (bundle, actionType, reducer, initialState) => {
  bundle.reducers[actionType] = handleAction(actionType, reducer, initialState)
  // bundle.reducer = handleActions(bundle.reducers, initialState)
  return bundle
}
