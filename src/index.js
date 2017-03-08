// Lodash utils
import merge from 'lodash/merge'

import {generateAction} from './generateAction'
import {generateGetter} from './generateGetter'
import * as naming from './naming'
import * as bundle from './bundle'
import * as reducerGenerators from './generateReducer'
import * as bundlePresets from './bundlePresets'

let lib = {
  generateAction,
  generateGetter
}
lib = merge(lib, naming)
lib = merge(lib, bundle)
lib = merge(lib, reducerGenerators)
lib = merge(lib, bundlePresets)

export default lib
module.exports = lib
