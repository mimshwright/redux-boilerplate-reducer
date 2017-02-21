import { createAction } from 'redux-actions'

import _merge from 'lodash/merge'
import _upperFirst from 'lodash/upperFirst'
import _camelCase from 'lodash/camelCase'
import _snakeCase from 'lodash/snakeCase'

const _upperSnakeCase = s => _snakeCase(s).toUpperCase()
const _pascalCase = s => _upperFirst(_camelCase(s))

export const createActionType = (verb, noun) => _upperSnakeCase(verb) + '_' + _upperSnakeCase(noun)
export const createActionCreatorName = (verb, noun) => _camelCase(verb) + _pascalCase(noun)

export const generateAction = (verb, noun) => {
  const actionType = createActionType(verb, noun)
  const actionCreatorName = createActionCreatorName(verb, noun)

  return {
    [actionType]: actionType,
    [actionCreatorName]: createAction(actionType)
  }
}

export const generateGetter = (noun) => {
  const getterName = createActionCreatorName('get', noun)
  return {
    [getterName]: state => state[noun]
  }
}

const boolean = (name) => _merge(
  {},
  generateAction('set', name),
  generateAction('toggle', name),
  generateGetter(name)
)

export const generateActions = {
  boolean
}

const lib = {
  createActionType,
  createActionCreatorName,
  generateAction,
  generateActions,
  generateGetter
}
export default lib
module.exports = lib
