// Lodash utils
import merge from 'lodash/merge'
import {generateBundle} from './bundle'
import * as commonReducers from './commonReducers'

const commonActions = {
  'set': commonReducers.setReducer
}

const getResetReducer = (initialState) => () => initialState

export const generateNumber = (name, initialState = NaN, additionalActions = null) => {
  return generateBundle(name, initialState,
    merge(
      {
        'increment': commonReducers.incrementReducer,
        'decrement': commonReducers.decrementReducer,
        'reset': getResetReducer(initialState)
      },
      commonActions,
      additionalActions
    )
  )
}

export const generateBoolean = (name, initialState = false, additionalActions = null) => {
  return generateBundle(name, initialState,
    merge(
      {
        'toggle': commonReducers.toggleReducer,
        'reset': getResetReducer(initialState)
      },
      commonActions,
      additionalActions
    )
  )
}

export const generateString = (name, initialState = "", additionalActions = null) => {
  return generateBundle(name, initialState,
    merge (
      {
        'reset': getResetReducer(initialState)
      },
      commonActions,
      additionalActions
    )
  )
}
