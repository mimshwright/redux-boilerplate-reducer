// Lodash utils
import merge from 'lodash/merge'
import {generateBundle} from './bundle'
import * as commonReducers from './commonReducers'

export const generateNumber = (name, initialState = NaN, additionalActions = null) => {
  return generateBundle(name, initialState,
    merge(
      {'increment': commonReducers.incrementReducer},
      {'decrement': commonReducers.decrementReducer},
      additionalActions
    )
  )
}

export const generateBoolean = (name, initialState = false, additionalActions = null) => {
  return generateBundle(name, initialState,
    merge(
      {'toggle': commonReducers.toggleReducer},
      additionalActions
    )
  )
}

export const generateDate = (name, initialState = null, additionalActions = null) => {
  return generateBundle(name, initialState,
    merge(
      {'now': commonReducers.nowReducer},
      additionalActions
    )
  )
}
