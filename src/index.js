// Lodash utils
import merge from 'lodash/merge'

import {generateAction} from './generateAction'
import {generateGetter} from './generateGetter'
import * as naming from './naming'
import * as bundle from './bundle'
import * as reducerGenerators from './generateReducer'
import * as bundlePresets from './bundlePresets'

let lib = merge(
  {
    generateAction,
    generateGetter
  },
  naming,
  bundle,
  reducerGenerators,
  bundlePresets
)

export default lib
module.exports = lib
