import test from 'ava'
import _ from 'lodash'
import * as lib from '../src/index.js'

// console.log('boilerplate-reducer library:')
// console.log(lib)

test('generateGetter()', t => {
  t.true(_.isFunction(lib.generateGetter), 'generateGetter() is a function')
  const getFoo = lib.generateGetter('foo').getFoo
  t.true(_.isFunction(getFoo), 'generateGetter() creates a function')
  t.is(getFoo({foo: 'bar'}), 'bar', 'getter returns value based on the name of the noun.')
})

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
