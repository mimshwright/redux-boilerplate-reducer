// Lodash utils
import merge from 'lodash/merge'

import reduceReducers from 'reduce-reducers'
import {handleAction} from 'redux-actions'

import * as reducerGenerators from './generateReducer'
import {generateAction} from './generateAction'
import {generateGetter} from './generateGetter'

/**
 * Adds a new actionType, actionCreator and reducer to an existing bundle.
 */
export const addActionToBundle = (verb, name, existingBundle, reducer, initialState) => {
  let newBundle = generateAction(verb, name)
  newBundle.reducer = reduceReducers(
    existingBundle.reducer,
    reducerGenerators.generateReducer(verb, name, reducer, initialState)
  )
  return merge(existingBundle, newBundle)
}

/**
 * Adds a new reducer for an action type to an exisiting reducer.
 * Essentially a shortcut for reduceReducers combined with handleAction.
 */
export const addReducerToExistingReducer = (existingReducer, actionType, reducer, initialState) => reduceReducers(
  existingReducer,
  handleAction(actionType, reducer, initialState)
)

export const generateBundle = (name, initialState = NaN, additionalActions = null) => {
  let bundle = merge(
    generateGetter(name),
    generateAction('reset', name),
    generateAction('set', name),

    { reducer: reduceReducers(
      reducerGenerators.generateResetReducer(name, initialState),
      reducerGenerators.generateSetReducer(name, initialState)
    )}
  )

  if (additionalActions) {
    if (additionalActions.reducers) {
      let manualReducers = []
      const actionTypes = Object.keys(additionalActions.reducers)
      const createManualReducer = (actionType) => handleAction(actionType, additionalActions.reducers[actionType], initialState)
      manualReducers = actionTypes.map(createManualReducer)
      delete additionalActions.reducers

      bundle.reducer = reduceReducers(
        bundle.reducer,
        ...manualReducers
      )
    }

    const createAdditionalAction = verb => addActionToBundle(verb, name, bundle, additionalActions[verb], initialState)

    // for every key (verb) passed into additionalActions,
    // add a new action type, action creator, and reducer
    // and merge them with the bundle
    Object.keys(additionalActions).forEach((key) => {
      bundle = createAdditionalAction(key)
    })
  }
  return bundle
}
