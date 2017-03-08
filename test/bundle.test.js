import test from 'ava'
import {assertIsFunction} from './avaHelpers'
import * as bundle from '../src/bundle'
import * as bundlePresets from '../src/bundlePresets'

test('addReducerToExistingReducer()', assert => {
  assertIsFunction(assert, bundle.addReducerToExistingReducer)

  let level = bundlePresets.generateNumber('level', 1, {'complete': level => level + 1})
  let score = bundlePresets.generateNumber('score', 0)

  score.reducer = bundle.addReducerToExistingReducer(score.reducer, 'ADD_MULTIPLIER', (score, {payload: multiplier}) => score * multiplier, 0)
  let state = 64
  let result = score.reducer(state, {type: 'ADD_MULTIPLIER', payload: 2})
  let expected = 128
  assert.is(result, expected, 'addRedcuer() can add a reducer case to an existing reducer using any arbitrary string.')

  score.reducer = bundle.addReducerToExistingReducer(score.reducer, level.COMPLETE_LEVEL, score => score + 10000, 0)
  state = 32000
  result = score.reducer(state, level.completeLevel())
  expected = 42000
  assert.is(result, expected, 'addRedcuer() can add a reducer case to an existing reducer using an action not defined internally.')
})
