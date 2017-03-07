import test from 'ava'
import {assertIsFunction} from './avaHelpers'
import * as lib from '../src/generateGetter'

test('generateGetter()', assert => {
  assertIsFunction(assert, lib.generateGetter)
  const getFoo = lib.generateGetter('foo').getFoo
  assertIsFunction(assert, getFoo, 'generateGetter() creates a function')
  assert.is(getFoo({foo: 'bar'}), 'bar', 'getter returns value based on the name of the noun.')
})
