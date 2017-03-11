import test from 'ava'
import { combineReducers } from 'redux'
import * as bundlePresets from '../src/bundlePresets.js'

test.only('combineReducers integration', assert => {
  let score = bundlePresets.generateNumber('score', 0, {'makeNegative': (score) => Math.abs(score) * -1})
  let scoreReducer = { score: score.reducer }
  let reducer = combineReducers(scoreReducer)
  assert.deepEqual(reducer({score: 100}, score.setScore(200)), {score: 200})
})
