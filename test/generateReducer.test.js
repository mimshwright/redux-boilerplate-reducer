import test from 'ava'
import _ from 'lodash'
import * as lib from '../src/generateReducer'

test('generateReducer()', t => {
  t.true(_.isFunction(lib.generateReducer), 'generateReducer() is a function')

  let state = 'Mims'
  let action = {type: 'CONVERT_TO_UPPERCASE_NAME'}
  let reducer = lib.generateReducer('convert to uppercase', 'name', _.upperCase, '')
  let actual = reducer(state, action)
  let expected = 'MIMS'
  t.is(actual, expected, 'Generates a reducer based on a noun, verb, function, and initial state.')
})

test('generateSetReducer()', t => {
  t.true(_.isFunction(lib.generateSetReducer), 'generateSetReducer() is a function')

  let state = 'Mims'
  let action = {type: 'SET_NAME', payload: 'Mimsy'}
  let reducer = lib.generateSetReducer('name')
  let actual = reducer(state, action)
  let expected = 'Mimsy'
  t.is(actual, expected, 'set reducer changes a property.')

  state = undefined
  action = {type: 'INIT'}
  let initialState = 'John Doe'
  reducer = lib.generateSetReducer('name', initialState)
  actual = reducer(state, action)
  expected = initialState
  t.deepEqual(actual, expected, 'When first called, resets the name to initial value')
})

test('generateResetReducer()', t => {
  t.true(_.isFunction(lib.generateResetReducer), 'generateResetReducer() is a function')

  let state = { score: 40000, level: 12 }
  let action = {type: 'RESET_SCOREBOARD'}
  let initialState = {score: 0, level: 1}
  let reducer = lib.generateResetReducer('scoreboard', initialState)
  let actual = reducer(state, action)
  let expected = initialState
  t.deepEqual(actual, expected, 'Reset reducer sets a value to its initial state.')
})

test('generateSetPropertyReducer()', t => {
  t.true(_.isFunction(lib.generateSetPropertyReducer), 'generateSetPropertyReducer() is a function')

  let state = {firstName: 'Mims', lastName: 'Wright'}
  let action = {type: 'SET_USER_FIRST_NAME', payload: 'Mimsy'}
  let reducer = lib.generateSetPropertyReducer('user', 'firstName')
  let actual = reducer(state, action)
  let expected = {firstName: 'Mimsy', lastName: 'Wright'}
  t.deepEqual(actual, expected, 'setPropertyReducer changes a property inside an object.')
  t.true(actual !== expected, 'Reducer should not mutate the original object.')

  state = {firstName: 'Mims', lastName: 'Wright'}
  action = {type: 'SET_USER_MIDDLE_NAME', payload: 'Hughes'}
  reducer = lib.generateSetPropertyReducer('user', 'middleName')
  actual = reducer(state, action)
  expected = {firstName: 'Mims', middleName: 'Hughes', lastName: 'Wright'}
  t.deepEqual(actual, expected, 'setPropertyReducer can set a new property on the object.')
})

test('generateToggleReducer()', t => {
  t.true(_.isFunction(lib.generateToggleReducer), 'generateToggleReducer() is a function')

  let state = false
  let action = {type: 'TOGGLE_FLAG'}
  let reducer = lib.generateToggleReducer('flag', false)
  let actual = reducer(state, action)
  let expected = true
  t.is(actual, expected, 'Toggle should flip false to true')
  state = true
  expected = false
  actual = reducer(state, action)
  t.is(actual, expected, 'Toggle should flip true to false')
})
