import test from 'ava'
import {assertIsFunction} from './avaHelpers'
import * as bundlePresets from '../src/bundlePresets.js'

// console.log('boilerplate-reducer library:')
// console.log(lib)

test('generateBoolean()', assert => {
  assertIsFunction(assert, bundlePresets.generateBoolean)

  let flag = bundlePresets.generateBoolean('flag')
  assertIsFunction(assert, flag.reducer, 'generateActions.boolean().reducer() is a function.')

  let state = flag.reducer(undefined, {type: 'INIT'})
  assert.is(state, false, 'boolean is false by default')

  flag = bundlePresets.generateBoolean('flag', true)
  state = flag.reducer(undefined, {type: 'INIT'})
  assert.is(state, true, 'initialState can be passed into the creator.')

  assert.is(flag.SET_FLAG, 'SET_FLAG', 'Generated Action type called SET_FLAG')
  assertIsFunction(assert, flag.setFlag, 'Generated an action creator called setFlag()')
  assert.deepEqual(flag.setFlag(true), { type: flag.SET_FLAG, payload: true }, 'Action creator for setBool works for true.')
  assert.deepEqual(flag.setFlag(false), { type: flag.SET_FLAG, payload: false }, 'Action creator for setBool works for false.')
  assert.deepEqual(flag.setFlag(100), { type: flag.SET_FLAG, payload: 100 }, 'Action creator doesn\'t type check.')

  assert.is(flag.TOGGLE_FLAG, 'TOGGLE_FLAG', 'Generated Action type called TOGGLE_FLAG')
  assertIsFunction(assert, flag.toggleFlag)
  assert.deepEqual(flag.toggleFlag(), { type: flag.TOGGLE_FLAG }, 'Action creator for toggleFlag works.')

  assertIsFunction(assert, flag.selectFlag)
  assert.is(flag.selectFlag({flag: true}), true, 'Selector works.')

  state = false
  let action = { type: flag.SET_FLAG, payload: true }
  assert.deepEqual(flag.reducer(state, action), true, 'Generated reducer has a setter function')

  action = { type: flag.SET_FLAG, payload: false }
  assert.deepEqual(flag.reducer(state, action), false, 'Generated reducer has a setter function')

  action = { type: flag.TOGGLE_FLAG }
  assert.deepEqual(flag.reducer(state, action), true, 'Generated reducer has a toggle function')
})

test('generateNumber()', assert => {
  assertIsFunction(assert, bundlePresets.generateNumber)

  let score = bundlePresets.generateNumber('score')
  let state = score.reducer(undefined, {type: 'INIT'})
  assert.truthy(isNaN(state), 'Initial State of number is NaN by default')

  score = bundlePresets.generateNumber('score', 0)
  state = score.reducer(undefined, {type: 'INIT'})
  assert.is(state, 0, 'initialState can be passed into the creator.')

  assert.is(score.SET_SCORE, 'SET_SCORE', 'Generated Action type called SET_SCORE')
  assertIsFunction(assert, score.setScore, 'Generated an action creator called setScore()')
  assert.deepEqual(score.setScore(100), { type: score.SET_SCORE, payload: 100 }, 'Action creator for setScore works for true.')

  assert.is(score.RESET_SCORE, 'RESET_SCORE', 'Generated Action type called RESET_SCORE')
  assertIsFunction(assert, score.resetScore, 'Generated an action creator called resetScore()')
  assert.deepEqual(score.resetScore(), { type: score.RESET_SCORE }, 'Action creator for resetScore works.')

  assert.is(score.INCREMENT_SCORE, 'INCREMENT_SCORE', 'Generated Action type called INCREMENT_SCORE')
  assertIsFunction(assert, score.incrementScore, 'Generated an action creator called incrementScore()')
  assert.deepEqual(score.incrementScore(), { type: score.INCREMENT_SCORE }, 'Action creator for incrementScore works.')

  assert.is(score.DECREMENT_SCORE, 'DECREMENT_SCORE', 'Generated Action type called INCREMENT_SCORE')
  assertIsFunction(assert, score.decrementScore, 'Generated an action creator called incrementScore()')
  assert.deepEqual(score.decrementScore(), { type: score.DECREMENT_SCORE }, 'Action creator for incrementScore works.')

  assertIsFunction(assert, score.selectScore, 'Generated a selector for score')
  assert.is(score.selectScore({score: 123}), 123, 'Selector works.')
})

test('extending a bundle', assert => {
  let level = bundlePresets.generateNumber('level', 1, {'complete': level => level + 1})
  let score = bundlePresets.generateNumber('score', 0, {
    'double': score => score * 2,
    'square': score => score * score,
    'addTo': (score, {payload: otherScore}) => score + otherScore
  })

  assert.is(score.SET_SCORE, 'SET_SCORE', 'addAction doesn\'t affect existing actions')

  assert.is(score.DOUBLE_SCORE, 'DOUBLE_SCORE', 'addAction can generate an additional action type')
  assertIsFunction(assert, score.doubleScore, 'addAction can generate an additional action creator')
  assert.is(score.reducer(150, {type: score.DOUBLE_SCORE}), 300, 'addAction can generate an additional reducer')

  assert.is(score.SQUARE_SCORE, 'SQUARE_SCORE', 'addAction can generate an additional action type')
  assertIsFunction(assert, score.squareScore)
  assert.is(score.reducer(10, {type: score.SQUARE_SCORE}), 100, 'addAction can generate an additional reducer')

  assert.is(score.ADD_TO_SCORE, 'ADD_TO_SCORE', 'addAction can generate an additional action type')
  assertIsFunction(assert, score.addToScore)
  assert.is(score.reducer(75, {type: score.ADD_TO_SCORE, payload: 25}), 100, 'addAction can generate an additional reducer')

  // manually adding more reducers
  score.reducers[level.COMPLETE_LEVEL] = score => score + 10000
  score.reducers.ADD_MULTIPLIER = (score, {payload: multiplier}) => score * multiplier

  let state = 64
  let result = score.reducer(state, {type: 'ADD_MULTIPLIER', payload: 2})
  let expected = 128
  assert.is(result, expected, 'addRedcuer() can add a reducer case to an existing reducer using any arbitrary string.')

  state = 32000
  result = score.reducer(state, level.completeLevel())
  expected = 42000
  assert.is(result, expected, 'Use generate function to an existing reducer using an action not defined internally.')
})

test('generateString()', assert => {
  assertIsFunction(assert, bundlePresets.generateString)
})
