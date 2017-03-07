import test from 'ava'
import {assertIsFunction, assertReducer} from './avaHelpers'
import _ from 'lodash'
import * as lib from '../src/generateReducer'

test('generateReducer()', assert => {
  assertIsFunction(assert, lib.generateReducer)

  assertReducer(assert, 'Generates a reducer based on a noun, verb, function, and initial state.', {
    reducer: lib.generateReducer('convert to uppercase', 'name', _.upperCase, ''),
    state: 'Mims',
    action: {type: 'CONVERT_TO_UPPERCASE_NAME'},
    expected: 'MIMS'
  })
})

test('generateSetReducer()', assert => {
  assertIsFunction(assert, lib.generateSetReducer)

  assertReducer(assert, 'set reducer changes a property.', {
    reducer: lib.generateSetReducer('name'),
    state: 'Mims',
    action: {type: 'SET_NAME', payload: 'Mimsy'},
    expected: 'Mimsy'
  })

  let initialState = 'John Doe'
  assertReducer(assert, 'set reducer: When first called, resets the name to initial value', {
    reducer: lib.generateSetReducer('name', initialState),
    state: undefined,
    action: {type: 'INIT'},
    expected: initialState
  })
})

test('generateResetReducer()', assert => {
  assertIsFunction(assert, lib.generateResetReducer)

  let initialState = {score: 0, level: 1}
  assertReducer(assert, 'Reset reducer sets a value to its initial state.', {
    reducer: lib.generateResetReducer('scoreboard', initialState),
    state: { score: 40000, level: 12 },
    action: {type: 'RESET_SCOREBOARD'},
    expected: initialState
  })
})

test('generateSetPropertyReducer()', assert => {
  assertIsFunction(assert, lib.generateSetPropertyReducer)

  assertReducer(assert, 'setPropertyReducer changes a property inside an object.', {
    reducer: lib.generateSetPropertyReducer('user', 'firstName'),
    state: {firstName: 'Mims', lastName: 'Wright'},
    action: {type: 'SET_USER_FIRST_NAME', payload: 'Mimsy'},
    expected: {firstName: 'Mimsy', lastName: 'Wright'}
  })

  assertReducer(assert, 'setPropertyReducer can create a new property on the object.', {
    reducer: lib.generateSetPropertyReducer('user', 'middleName'),
    state: {firstName: 'Mims', lastName: 'Wright'},
    action: {type: 'SET_USER_MIDDLE_NAME', payload: 'Hughes'},
    expected: {firstName: 'Mims', middleName: 'Hughes', lastName: 'Wright'}
  })
})

test('generateToggleReducer()', assert => {
  assertIsFunction(assert, lib.generateToggleReducer)

  let reducer = lib.generateToggleReducer('flag', false)
  let action = {type: 'TOGGLE_FLAG'}
  assertReducer(assert, 'Toggle should flip false to true', {
    reducer,
    action,
    state: null,
    expected: true
  })

  assertReducer(assert, 'Toggle should flip true to false', {
    reducer,
    action,
    state: true,
    expected: false
  })
})
