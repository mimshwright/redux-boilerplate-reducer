import test from 'ava'
import _ from 'lodash'
import * as lib from '../src/generateGetter'

test('generateGetter()', t => {
  t.true(_.isFunction(lib.generateGetter), 'generateGetter() is a function')
  const getFoo = lib.generateGetter('foo').getFoo
  t.true(_.isFunction(getFoo), 'generateGetter() creates a function')
  t.is(getFoo('bar'), 'bar', 'getter returns value based on the name of the noun.')
})
