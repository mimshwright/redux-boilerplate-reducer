// Lodash utils
import merge from 'lodash/merge'
import {generateBundle} from './bundle'
import * as commonReducers from './commonReducers'

const commonActions = {
  'set': commonReducers.setReducer,
  'reset': commonReducers.resetReducer
}

export const generateNumber = (name, initialState = NaN, additionalActions = null) => {
  return generateBundle(name, initialState,
    merge(
      {
        'increment': commonReducers.incrementReducer,
        'decrement': commonReducers.decrementReducer
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
        'toggle': commonReducers.toggleReducer
      },
      commonActions,
      additionalActions
    )
  )
}

export const generateDate = (name, initialState = null, additionalActions = null) => {
  return generateBundle(name, initialState,
    merge(
      {
        'now': commonReducers.nowReducer
      },
      commonActions,
      additionalActions
    )
  )
}
