import test from 'ava'
import _ from 'lodash'
import * as naming from '../src/naming.js'

test('createActionTypeName()', t => {
  t.true(_.isFunction(naming.createActionTypeName), 'createActionTypeName() is a function')

  t.is(naming.createActionTypeName('set', 'foo'), 'SET_FOO', 'Creates action types for single words.')
  t.is(naming.createActionTypeName('add ten to', 'My Value'), 'ADD_TEN_TO_MY_VALUE', 'Creates action types for multiple words.')
  t.is(naming.createActionTypeName('add 10 to', 'My Value'), 'ADD_10_TO_MY_VALUE', 'Creates action types for multiple words including digits.')
})

test('createActionTypeValue()', t => {
  t.true(_.isFunction(naming.createActionTypeValue), 'createActionTypeValue() is a function')
  const verb = 'throw out'
  const noun = 'every preconcieved notion'
  t.is(naming.createActionTypeValue(verb, noun), naming.createActionTypeName(verb, noun), 'Output should be the same as createActionTypeName()')
})

test('createActionCreatorName()', t => {
  t.true(_.isFunction(naming.createActionCreatorName), 'createActionCreatorName() is a function')

  t.is(naming.createActionCreatorName('set', 'foo'), 'setFoo', 'Creates action creator name for single words.')
  t.is(naming.createActionCreatorName('add ten to', 'My Value'), 'addTenToMyValue', 'Creates action creator name for multiple words.')
  t.is(naming.createActionCreatorName('add 10 to', 'My Value'), 'add10ToMyValue', 'Creates action creator name for multiple words including digits.')
})
