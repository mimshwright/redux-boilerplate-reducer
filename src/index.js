// Redux utils
import reduceReducers from 'reduce-reducers'

// Lodash utils
import merge from 'lodash/merge'

import {createActionTypeName, createActionTypeValue, createActionCreatorName} from './naming'
import {generateAction} from './generateAction'
import {generateGetter} from './generateGetter'
import * as reducers from './generateReducer'

const addAction = (verb, name, existingBundle, reducer, initialState) => {
  let newBundle = generateAction(verb, name)
  newBundle.reducer = reduceReducers(
    existingBundle.reducer,
    reducers.generateReducer(verb, name, reducer, initialState)
  )
  return merge(existingBundle, newBundle)
}

const commonActions = (name, initialState) => ([
  generateGetter(name),
  generateAction('reset', name),
  generateAction('set', name)
])

const commonReducers = (name, initialState) => ([
  reducers.generateResetReducer(name, initialState),
  reducers.generateSetReducer(name, initialState)
])

export const commonBundle = (name, initialState = NaN, additionalActions = null) => {
  let bundle = merge(
    ...commonActions(name),

    { reducer: reduceReducers(
      ...commonReducers(name, initialState)
    )}
  )

  if (additionalActions) {
    const createAdditionalAction = verb => addAction(verb, name, bundle, additionalActions[verb], initialState)

    // for every key (verb) passed into additionalActions,
    // add a new action type, action creator, and reducer
    // and merge them with the bundle
    Object.keys(additionalActions).forEach((key) => {
      bundle = createAdditionalAction(key)
    })
  }
  return bundle
}

export const generateNumber = (name, initialState = NaN, additionalActions = null) => {
  return commonBundle(name, initialState, additionalActions)
}

export const generateBoolean = (name, initialState = false, additionalActions = null) => {
  return commonBundle(name, initialState,
    merge(
      additionalActions,
      {'toggle': state => !state}
    )
  )
}

let lib = {
  createActionTypeName,
  createActionTypeValue,
  createActionCreatorName,
  generateAction,
  generateGetter,

  generateNumber,
  generateBoolean
}
lib = merge(lib, reducers)

export default lib
module.exports = lib
