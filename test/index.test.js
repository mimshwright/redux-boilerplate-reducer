import test from 'ava'
import _ from 'lodash'
import * as lib from '../src/index.js'

// console.log('boilerplate-reducer library:')
// console.log(lib)

const assertIsFunction = (assert, func, message) => {
  assert.truthy(func, 'func is defined')
  assert.true(_.isFunction(func), message || func.name + ' is a function.')
}

test('generateBoolean()', assert => {
  assertIsFunction(assert, lib.generateBoolean)

  let flag = lib.generateBoolean('flag')
  let state = flag.reducer(undefined, {type: 'INIT'})
  assert.is(state, false, 'boolean is false by default')

  flag = lib.generateBoolean('flag', true)
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

  assertIsFunction(assert, flag.getFlag)
  assert.is(flag.getFlag({flag: true}), true, 'Getter works.')
})

test('generateBoolean().reducer()', assert => {
  const flag = lib.generateBoolean('flag')
  const reducer = flag.reducer
  assertIsFunction(assert, reducer, 'generateActions.boolean().reducer() is a function.')

  const state = false
  let result = () => reducer(state, action)

  let action = { type: flag.SET_FLAG, payload: true }
  assert.deepEqual(result(), true, 'Generated reducer has a setter function')

  action = { type: flag.SET_FLAG, payload: false }
  assert.deepEqual(result(), false, 'Generated reducer has a setter function')

  // action = { type: flag.SET_FLAG, payload: 100 }
  // assert.deepEqual(result(), true, 'Truthy payloads are treated as true.')

  // action = { type: flag.SET_FLAG, payload: null }
  // assert.deepEqual(result(), false, 'Falsy payloads are treated as false.')

  action = { type: flag.TOGGLE_FLAG }
  assert.deepEqual(result(), true, 'Generated reducer has a toggle function')
})

test('generateNumber()', assert => {
  assertIsFunction(assert, lib.generateNumber)

  let score = lib.generateNumber('score')
  let state = score.reducer(undefined, {type: 'INIT'})
  assert.truthy(isNaN(state), 'Initial State of number is NaN by default')

  score = lib.generateBoolean('score', 0)
  state = score.reducer(undefined, {type: 'INIT'})
  assert.is(state, 0, 'initialState can be passed into the creator.')

  assert.is(score.SET_SCORE, 'SET_SCORE', 'Generated Action type called SET_SCORE')
  assertIsFunction(assert, score.setScore, 'Generated an action creator called setScore()')
  assert.deepEqual(score.setScore(100), { type: score.SET_SCORE, payload: 100 }, 'Action creator for setScore works for true.')

  assert.is(score.RESET_SCORE, 'RESET_SCORE', 'Generated Action type called RESET_SCORE')
  assertIsFunction(assert, score.resetScore, 'Generated an action creator called resetScore()')
  assert.deepEqual(score.resetScore(), { type: score.RESET_SCORE }, 'Action creator for resetScore works.')

  assertIsFunction(assert, score.getScore, 'Generated a getter for flag')
  assert.is(score.getScore({score: 123}), 123, 'Getter works.')
})

test('extending a bundle', assert => {
  let score = lib.generateNumber('score', 0, {
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
})

test('addReducer()', assert => {
  assertIsFunction(assert, lib.addReducer)

  let level = lib.generateNumber('level', 1, {'complete': level => level + 1})
  let score = lib.generateNumber('score', 0)

  score.reducer = lib.addReducer(score.reducer, 'ADD_MULTIPLIER', (score, {payload: multiplier}) => score * multiplier, 0)
  let state = 64
  let result = score.reducer(state, {type: 'ADD_MULTIPLIER', payload: 2})
  let expected = 128
  assert.is(result, expected, 'addRedcuer() can add a reducer case to an existing reducer using any arbitrary string.')

  score.reducer = lib.addReducer(score.reducer, level.COMPLETE_LEVEL, score => score + 10000, 0)
  state = 32000
  result = score.reducer(state, level.completeLevel())
  expected = 42000
  assert.is(result, expected, 'addRedcuer() can add a reducer case to an existing reducer using an action not defined internally.')
})

test('adding reducers with additionalActions object', assert => {
  // same example using object
  let level = lib.generateNumber('level', 1, {'complete': level => level + 1})
  
  const score = lib.generateBoolean('score', 0, {
    'addTo': (score, {payload: otherScore}) => score + otherScore,
    'reducers': {
      [level.COMPLETE_LEVEL]: score => score + 10000,
      'ADD_MULTIPLIER': (score, {payload: multiplier}) => score * multiplier
    }
  })

  let state = 64
  let result = score.reducer(state, {type: 'ADD_MULTIPLIER', payload: 2})
  let expected = 128
  assert.is(result, expected, 'addRedcuer() can add a reducer case to an existing reducer using any arbitrary string.')

  assert.is(score.ADD_TO_SCORE, 'ADD_TO_SCORE', 'addAction can generate an additional action type')
  assertIsFunction(assert, score.addToScore)
  assert.is(score.reducer(75, {type: score.ADD_TO_SCORE, payload: 25}), 100, 'addAction can generate an additional reducer')
  state = 32000
  result = score.reducer(state, level.completeLevel())
  expected = 42000
  assert.is(result, expected, 'Use generate function to an existing reducer using an action not defined internally.')
})
