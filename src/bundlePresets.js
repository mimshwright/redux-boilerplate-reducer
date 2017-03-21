// Lodash utils
import merge from 'lodash/merge'
import {generateBundle} from './bundle'
import * as commonReducers from './commonReducers'

const getResetReducer = (initialState) => () => initialState

const getCommonActions = (initialState) => ({
  'set': commonReducers.setReducer,
  'reset': getResetReducer(initialState)
})


export const generateNumber = (name, initialState = NaN, additionalActions = null) => {
  let allActions = merge(
    {
      'increment': commonReducers.incrementReducer,
      'decrement': commonReducers.decrementReducer
    },
    getCommonActions(initialState),
    additionalActions
  )
  return generateBundle(name, initialState, allActions)
}

export const generateBoolean = (name, initialState = false, additionalActions = null) => {
  return generateBundle(name, initialState,
    merge(
      {
        'toggle': commonReducers.toggleReducer,
      },
      getCommonActions(initialState),
      additionalActions
    )
  )
}

export const generateString = (name, initialState = '', additionalActions = null) => {
  return generateBundle(name, initialState,
    merge(
      {
      },
      getCommonActions(initialState),
      additionalActions
    )
  )
}
