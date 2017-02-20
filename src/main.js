import _merge from 'lodash/merge'
import _upperFirst from 'lodash/upperFirst'
import _camelCase from 'lodash/camelCase'
import _snakeCase from 'lodash/snakeCase'

const _upperSnakeCase = s => _snakeCase(s).toUpperCase()
const _pascalCase = s => _upperFirst(_camelCase(s))

export const createActionType = (verb, noun) => _upperSnakeCase(verb) + '_' + _upperSnakeCase(noun)
export const createActionCreatorName = (verb, noun) => _camelCase(verb) + _pascalCase(noun)

const generateSetAction = (noun) => {
  const verb = 'set'
  const actionType = createActionType(verb, noun)
  const actionCreatorName = createActionCreatorName(verb, noun)
  return {
    [actionType]: actionType,
    [actionCreatorName]: (value) => ({
      type: actionType,
      payload: value
    })
  }
}

const generateToggleAction = (noun) => {
  const verb = 'toggle'
  const actionType = createActionType(verb, noun)
  const actionCreatorName = createActionCreatorName(verb, noun)
  return {
    [actionType]: actionType,
    [actionCreatorName]: () => ({ type: actionType })
  }
}

const boolean = (name) => _merge(
  {},
  generateSetAction(name),
  generateToggleAction(name)
)

export const generateActions = {
  boolean
}

const lib = {
  createActionType,
  createActionCreatorName,
  generateActions
}
export default lib
module.exports = lib
