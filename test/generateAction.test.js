import test from 'ava'
import {assertIsFunction} from './avaHelpers'
import * as lib from '../src/generateAction'

test('generateAction()', assert => {
  assertIsFunction(assert, lib.generateAction)

  const action = lib.generateAction('flaggle', 'Mingle Moomies')
  assert.is(action.FLAGGLE_MINGLE_MOOMIES, 'FLAGGLE_MINGLE_MOOMIES', 'generates an action type based on noun and verb')
  assertIsFunction(assert, action.flaggleMingleMoomies, 'getAction() creates a creator function')
  assert.deepEqual(action.flaggleMingleMoomies(123), {type: action.FLAGGLE_MINGLE_MOOMIES, payload: 123}, 'generates an action creator based on noun and verb')
  assert.deepEqual(action.flaggleMingleMoomies(), {type: action.FLAGGLE_MINGLE_MOOMIES}, 'Payload is ignored if not provided.')
})
