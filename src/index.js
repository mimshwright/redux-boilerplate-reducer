// Lodash utils
import merge from 'lodash/merge'

import * as generateAction from './generateAction'
import * as generateGetter from './generateGetter'
import * as naming from './naming'
import * as bundle from './bundle'
import * as reducerGenerators from './generateReducer'
import * as bundlePresets from './bundlePresets'

let lib = merge(
  generateAction,
  generateGetter,
  naming,
  bundle,
  reducerGenerators,
  bundlePresets
)

export default lib
module.exports = lib
