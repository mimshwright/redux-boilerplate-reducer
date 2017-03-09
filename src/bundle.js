// Lodash utils
import merge from 'lodash/merge'

// import reduceReducers from 'reduce-reducers'
import {handleAction, handleActions} from 'redux-actions'

import {generateAction} from './generateAction'
import {generateGetter} from './generateGetter'
import {createActionTypeValue} from './naming'
import * as commonReducers from './commonReducers'

/**
 * Adds a new actionType, actionCreator and reducer to an existing bundle.
 */
export const addActionAndReducerToBundle = (existingBundle, verb, noun, reducer, initialState) => {
  // console.log('Adding action for ' + createActionTypeValue(verb, name) + ' initialState = ' + initialState)
  const actionType = createActionTypeValue(verb, noun)
  const newBundle = addActionToBundle(existingBundle, verb, noun)
  return addReducerToBundle(newBundle, actionType, reducer, initialState)
}

/**
 * Adds a new action and action creator to a bundle.
 */
export const addActionToBundle = (existingBundle, verb, noun) => {
  return merge(generateAction(verb, noun), existingBundle)
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

export const generateBundle = (name, initialState = NaN, additionalActions = null) => {
  let bundle = merge(
    generateGetter(name),

    {
      reducers: {},
      reducer: function (state, action) { return handleActions(this.reducers, initialState).call(this, state, action) }
    }
  )

  bundle = addActionAndReducerToBundle(bundle, 'set', name, commonReducers.setReducer, initialState)
  bundle = addActionAndReducerToBundle(bundle, 'reset', name, commonReducers.resetReducer, initialState)

  if (additionalActions) {
    // if (additionalActions.reducers) {
    //   let manualReducers = []
    //   const actionTypes = Object.keys(additionalActions.reducers)
    //   const createManualReducer = (actionType) => handleAction(actionType, additionalActions.reducers[actionType], initialState)
    //   manualReducers = actionTypes.map(createManualReducer)
    //   delete additionalActions.reducers
    //
    //   bundle.reducer = reduceReducers(
    //     bundle.reducer,
    //     ...manualReducers
    //   )
    // }

    // for every key (verb) passed into additionalActions,
    // add a new action type, action creator, and reducer
    // and merge them with the bundle
    Object.keys(additionalActions).forEach((verb) => {
      bundle = addActionAndReducerToBundle(bundle, verb, name, additionalActions[verb], initialState)
    })
  }
  return bundle
}
