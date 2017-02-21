import test from 'ava'
import _ from 'lodash'
import * as lib from '../src/main.js'

console.log('generic-action library:')
console.log(lib)

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
  t.deepEqual(action.flaggleMingleMoomies(), {type: action.FLAGGLE_MINGLE_MOOMIES, payload: null}, 'generates an action creator based on noun and verb')
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
  const booleanActions = lib.generateActions.boolean('flag')

  t.is(booleanActions.SET_FLAG, 'SET_FLAG', 'Generated Action type called SET_FLAG')
  t.true(_.isFunction(booleanActions.setFlag), 'Generated an action creator called setFlag()')
  t.deepEqual(booleanActions.setFlag(true), {type: booleanActions.SET_FLAG, payload: true }, 'Action creator for setBool works for true.')
  t.deepEqual(booleanActions.setFlag(false), {type: booleanActions.SET_FLAG, payload: false }, 'Action creator for setBool works for false.')
  // t.deepEqual(booleanActions.setFlag(100), {type: booleanActions.SET_FLAG, payload: true }, 'Action creator evaluates input as truthy or not.')
  // t.deepEqual(booleanActions.setFlag(0), {type: booleanActions.SET_FLAG, payload: false }, 'Action creator evaluates input as truthy or not.')
  // t.throws(() => booleanActions.setFlag(), 'Action creator doesn\'t accept undefined value.')

  t.is(booleanActions.TOGGLE_FLAG, 'TOGGLE_FLAG', 'Generated Action type called TOGGLE_FLAG')
  t.true(_.isFunction(booleanActions.toggleFlag), 'Generated an action creator called toggleFlag()')
  t.deepEqual(booleanActions.toggleFlag(), {type: booleanActions.TOGGLE_FLAG, payload: null }, 'Action creator for toggleFlag works.')

  t.true(_.isFunction(booleanActions.getFlag), 'Generated a getter for flag')
  t.is(booleanActions.getFlag({flag: true}), true, 'Getter works.')
})
