import test from 'ava'
import _ from 'lodash'
import * as lib from '../src/index.js'

// console.log('boilerplate-reducer library:')
// console.log(lib)

test('generateBoolean()', t => {
  t.true(_.isFunction(lib.generateBoolean), 'generateBoolean() is a function.')

  let booleanActions = lib.generateBoolean('flag')
  let state = booleanActions.reducer(undefined, {type: 'INIT'})
  t.is(state, false, 'boolean is false by default')

  booleanActions = lib.generateBoolean('flag', true)
  state = booleanActions.reducer(undefined, {type: 'INIT'})
  t.is(state, true, 'initialState can be passed into the creator.')

  t.is(booleanActions.SET_FLAG, 'SET_FLAG', 'Generated Action type called SET_FLAG')
  t.true(_.isFunction(booleanActions.setFlag), 'Generated an action creator called setFlag()')
  t.deepEqual(booleanActions.setFlag(true), { type: booleanActions.SET_FLAG, payload: true }, 'Action creator for setBool works for true.')
  t.deepEqual(booleanActions.setFlag(false), { type: booleanActions.SET_FLAG, payload: false }, 'Action creator for setBool works for false.')
  t.deepEqual(booleanActions.setFlag(100), { type: booleanActions.SET_FLAG, payload: 100 }, 'Action creator doesn\'t type check.')

  t.is(booleanActions.TOGGLE_FLAG, 'TOGGLE_FLAG', 'Generated Action type called TOGGLE_FLAG')
  t.true(_.isFunction(booleanActions.toggleFlag), 'Generated an action creator called toggleFlag()')
  t.deepEqual(booleanActions.toggleFlag(), { type: booleanActions.TOGGLE_FLAG }, 'Action creator for toggleFlag works.')

  t.true(_.isFunction(booleanActions.getFlag), 'Generated a getter for flag')
  t.is(booleanActions.getFlag({flag: true}), true, 'Getter works.')
})

test('generateBoolean().reducer()', t => {
  const booleanActions = lib.generateBoolean('flag')
  const reducer = booleanActions.reducer
  t.true(_.isFunction(reducer), 'generateActions.boolean().reducer() is a function.')

  const state = false
  let result = () => reducer(state, action)

  let action = { type: booleanActions.SET_FLAG, payload: true }
  t.deepEqual(result(), true, 'Generated reducer has a setter function')

  action = { type: booleanActions.SET_FLAG, payload: false }
  t.deepEqual(result(), false, 'Generated reducer has a setter function')

  // action = { type: booleanActions.SET_FLAG, payload: 100 }
  // t.deepEqual(result(), true, 'Truthy payloads are treated as true.')

  // action = { type: booleanActions.SET_FLAG, payload: null }
  // t.deepEqual(result(), false, 'Falsy payloads are treated as false.')

  action = { type: booleanActions.TOGGLE_FLAG }
  t.deepEqual(result(), true, 'Generated reducer has a toggle function')
})

test('generateNumber()', t => {
  t.true(_.isFunction(lib.generateNumber), 'generateNumber() is a function.')

  let score = lib.generateNumber('score')
  let state = score.reducer(undefined, {type: 'INIT'})
  t.truthy(isNaN(state), 'Initial State of number is NaN by default')

  score = lib.generateBoolean('score', 0)
  state = score.reducer(undefined, {type: 'INIT'})
  t.is(state, 0, 'initialState can be passed into the creator.')

  t.is(score.SET_SCORE, 'SET_SCORE', 'Generated Action type called SET_SCORE')
  t.true(_.isFunction(score.setScore), 'Generated an action creator called setScore()')
  t.deepEqual(score.setScore(100), { type: score.SET_SCORE, payload: 100 }, 'Action creator for setScore works for true.')

  t.is(score.RESET_SCORE, 'RESET_SCORE', 'Generated Action type called RESET_SCORE')
  t.true(_.isFunction(score.resetScore), 'Generated an action creator called resetScore()')
  t.deepEqual(score.resetScore(), { type: score.RESET_SCORE }, 'Action creator for resetScore works.')

  t.true(_.isFunction(score.getScore), 'Generated a getter for flag')
  t.is(score.getScore({score: 123}), 123, 'Getter works.')
})

test('extending number', t => {
  let score = lib.generateNumber('score', 0, {
    'double': score => score * 2,
    'square': score => score * score
  })

  t.is(score.SET_SCORE, 'SET_SCORE', 'addAction doesn\'t affect existing actions')

  t.is(score.DOUBLE_SCORE, 'DOUBLE_SCORE', 'addAction can generate an additional action type')
  t.true(_.isFunction(score.doubleScore), 'addAction can generate an additional action creator')
  t.is(score.reducer(150, {type: score.DOUBLE_SCORE}), 300, 'addAction can generate an additional reducer')

  t.is(score.SQUARE_SCORE, 'SQUARE_SCORE', 'addAction can generate an additional action type')
  t.true(_.isFunction(score.squareScore), 'addAction can generate an additional action creator')
  t.is(score.reducer(10, {type: score.SQUARE_SCORE}), 100, 'addAction can generate an additional reducer')
})
