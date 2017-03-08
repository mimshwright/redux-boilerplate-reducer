import test from 'ava'
import {assertIsFunction} from './avaHelpers'
import * as lib from '../src/index.js'

import * as naming from '../src/naming.js'
import * as bundle from '../src/bundle.js'
import * as bundlePresets from '../src/bundlePresets.js'
import * as reducerGenerators from '../src/generateReducer.js'

test('index', assert => {
  const check = (funcName) => assertIsFunction(assert, lib[funcName])

  // Check to see that all of these functions exist in the index.
  check('generateAction')
  check('generateGetter')
  // Check for all exported objects in each of these sub-modules
  Object.keys(naming).map(check)
  Object.keys(bundle).map(check)
  Object.keys(bundlePresets).map(check)
  Object.keys(reducerGenerators).map(check)
})
