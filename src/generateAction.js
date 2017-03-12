import { createAction as createActionCreator } from 'redux-actions'
import { createActionTypeName, createActionTypeValue, createActionCreatorName } from './naming'

/**
 * Creates a bundle of action type and action creator based on input.
 * @param {string} verb
 * @param {string} noun
 * @return {VERB_NOUN:{string}, verbNoun:{Function}}
 */
export const generateAction = (verb, noun) => {
  const actionTypeName = createActionTypeName(verb, noun)
  const actionTypeValue = createActionTypeValue(verb, noun)
  const actionCreatorName = createActionCreatorName(verb, noun)
  const actionCreatorAliasName = createActionCreatorName(verb, "")

  const actionCreator = createActionCreator(actionTypeValue)

  return {
    [actionTypeName]: actionTypeValue,
    [actionCreatorName]: actionCreator,
    [actionCreatorAliasName]: actionCreator
  }
}

export default generateAction
