import _ from 'lodash'

export const assertIsFunction = (assert, func, message = undefined) => {
  assert.true(_.isFunction(func), message || `${func.name} is a function.`)
}

export const assertReducer = (assert, message, {reducer, state, action, expected}) => {
  assertIsFunction(assert, reducer)
  let actual = reducer(state, action)
  assert.deepEqual(actual, expected, message || `${reducer.name} works as expected.`)
  if (_.isObject(actual)) {
    assert.true(state !== actual, `${reducer.name} must not mutate the original state.`)
  }
}
