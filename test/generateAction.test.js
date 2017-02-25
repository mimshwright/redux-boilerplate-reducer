import test from 'ava'
import _ from 'lodash'
import * as lib from '../src/generateAction'

test('generateAction()', t => {
  t.true(_.isFunction(lib.generateAction), 'generateAction() is a function')
  const action = lib.generateAction('flaggle', 'Mingle Moomies')
  t.is(action.FLAGGLE_MINGLE_MOOMIES, 'FLAGGLE_MINGLE_MOOMIES', 'generates an action type based on noun and verb')
  t.true(_.isFunction(action.flaggleMingleMoomies), 'getAction() creates a creator function')
  t.deepEqual(action.flaggleMingleMoomies(123), {type: action.FLAGGLE_MINGLE_MOOMIES, payload: 123}, 'generates an action creator based on noun and verb')
  t.deepEqual(action.flaggleMingleMoomies(), {type: action.FLAGGLE_MINGLE_MOOMIES}, 'Payload is ignored if not provided.')
})
