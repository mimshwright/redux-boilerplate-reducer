import test from 'ava'
import _ from 'lodash'
import * as lib from '../src/main.js'

// console.log('generic-action library:')
// console.log(lib)

test('createActionType()', t => {
  t.true(_.isFunction(lib.createActionType), 'createActionType() is a function')

  t.is(lib.createActionType('set', 'foo'), 'SET_FOO', 'Creates action types for single words.')
  t.is(lib.createActionType('add ten to', 'My Value'), 'ADD_TEN_TO_MY_VALUE', 'Creates action types for multiple words.')
  t.is(lib.createActionType('add 10 to', 'My Value'), 'ADD_10_TO_MY_VALUE', 'Creates action types for multiple words including digits.')
})

test('createActionCreatorName()', t => {
  t.true(_.isFunction(lib.createActionCreatorName), 'createActionCreatorName() is a function')

  t.is(lib.createActionCreatorName('set', 'foo'), 'setFoo', 'Creates action creator name for single words.')
  t.is(lib.createActionCreatorName('add ten to', 'My Value'), 'addTenToMyValue', 'Creates action creator name for multiple words.')
  t.is(lib.createActionCreatorName('add 10 to', 'My Value'), 'add10ToMyValue', 'Creates action creator name for multiple words including digits.')
})

test('generateAction()', t => {
  t.true(_.isFunction(lib.generateAction), 'generateAction() is a function')
  const action = lib.generateAction('flaggle', 'Mingle Moomies')
  t.is(action.FLAGGLE_MINGLE_MOOMIES, 'FLAGGLE_MINGLE_MOOMIES', 'generates an action type based on noun and verb')
  t.true(_.isFunction(action.flaggleMingleMoomies), 'getAction() creates a creator function')
  t.deepEqual(action.flaggleMingleMoomies(), {type: action.FLAGGLE_MINGLE_MOOMIES}, 'generates an action creator based on noun and verb')
})

test('generateGetter()', t => {
  t.true(_.isFunction(lib.generateGetter), 'generateGetter() is a function')
  const getFoo = lib.generateGetter('foo').getFoo
  t.true(_.isFunction(getFoo), 'generateGetter() creates a function')
  t.is(getFoo({foo: 'bar'}), 'bar', 'getter returns value based on the name of the noun.')
})

test('generateActions.boolean()', t => {
  t.truthy(lib.generateActions, 'generateActions is defined.')
  t.true(_.isFunction(lib.generateActions.boolean), 'generateActions.boolean is a function.')

  let booleanActions = lib.generateActions.boolean('flag')
  let state = booleanActions.reducer(undefined, {type: 'INIT'})
  t.is(state, false, 'boolean is false by default')

  booleanActions = lib.generateActions.boolean('flag', true)
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

test('generateActions.boolean().reducer()', t => {
  const booleanActions = lib.generateActions.boolean('flag')
  const reducer = booleanActions.reducer
  t.true(_.isFunction(reducer), 'generateActions.boolean().reducer() is a function.')

  const state = false
  let result = () => reducer(state, action)

  let action = { type: booleanActions.SET_FLAG, payload: true }
  t.deepEqual(result(), true, 'Generated reducer has a setter function')

  action = { type: booleanActions.SET_FLAG, payload: false }
  t.deepEqual(result(), false, 'Generated reducer has a setter function')

  action = { type: booleanActions.SET_FLAG, payload: 100 }
  t.deepEqual(result(), true, 'Truthy payloads are treated as true.')

  action = { type: booleanActions.SET_FLAG, payload: null }
  t.deepEqual(result(), false, 'Falsy payloads are treated as false.')

  action = { type: booleanActions.TOGGLE_FLAG }
  t.deepEqual(result(), true, 'Generated reducer has a toggle function')
})

test('generateSetPropertyReducer()', t => {
  t.true(_.isFunction(lib.generateSetPropertyReducer), 'generateSetPropertyReducer() is a function')

  let state = {firstName: 'Mims', lastName: 'Wright'}
  let action = {type: 'SET_USER_FIRST_NAME', payload: 'Mimsy'}
  let reducer = lib.generateSetPropertyReducer('user', 'firstName')
  let expected = {firstName: 'Mimsy', lastName: 'Wright'}
  t.deepEqual(reducer(state, action), expected, 'setPropertyReducer changes a property inside an object.')

  state = {firstName: 'Mims', lastName: 'Wright'}
  action = {type: 'SET_USER_MIDDLE_NAME', payload: 'Hughes'}
  reducer = lib.generateSetPropertyReducer('user', 'middleName')
  expected = {firstName: 'Mims', middleName: 'Hughes', lastName: 'Wright'}
  t.deepEqual(reducer(state, action), expected, 'setPropertyReducer can set a new property on the object.')
})
