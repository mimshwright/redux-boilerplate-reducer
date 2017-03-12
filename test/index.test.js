import test from 'ava'
import {assertIsFunction} from './avaHelpers'
import * as lib from '../src/index.js'

import * as naming from '../src/naming.js'
import * as generateAction from '../src/generateAction.js'
import * as generateSelector from '../src/generateSelector.js'
import * as bundle from '../src/bundle.js'
import * as bundlePresets from '../src/bundlePresets.js'
import * as commonReducers from '../src/commonReducers.js'

test('index', assert => {
  const check = (funcName) => assertIsFunction(assert, lib[funcName], `${funcName} is in the bundle.`)

  // Check for all exported objects in each of these sub-modules
  Object.keys(naming).map(check)
  Object.keys(generateAction).map(check)
  Object.keys(generateSelector).map(check)
  Object.keys(bundle).map(check)
  Object.keys(bundlePresets).map(check)
  Object.keys(commonReducers).map(check)
})
