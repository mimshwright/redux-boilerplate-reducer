// Lodash Utils
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'
import snakeCase from 'lodash/snakeCase'
// Derived from lodash
const upperSnakeCase = s => snakeCase(s).toUpperCase()
const pascalCase = s => upperFirst(camelCase(s))

/**
 * Create the string used as the identifier name of action type for an action.
 * @param {string} verb Action to perform on the noun. e.g. "Add"
 * @param {string} noun Receiver of the action. e.g. "Item"
 * @returns {string} The name of an action type. e.g. "ADD_ITEM"
 */
export const createActionTypeName = (verb, noun) => upperSnakeCase(verb + ' ' + noun)

/**
 * Create the string that is the value of the action type.
 * Currently identical to the action type variable name.
 * @param {string} verb
 * @param {string} noun
 * @returns {string}
 */
export const createActionTypeValue = (verb, noun) => createActionTypeName(verb, noun)

/**
 * Create the name of an action creator. e.g. "addItem"
 * @param {string} verb
 * @param {string} noun
 * @return {string}
 */
export const createActionCreatorName = (verb, noun) => camelCase(verb) + pascalCase(noun)
