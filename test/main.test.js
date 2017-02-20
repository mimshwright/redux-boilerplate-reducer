import test from 'ava'
import _ from 'lodash'
import * as lib from '../src/main.js'

console.log("generic-action library:\n" + lib)

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
  t.deepEqual(booleanActions.toggleFlag(), {type: booleanActions.TOGGLE_FLAG }, 'Action creator for toggleFlag works.')
})
