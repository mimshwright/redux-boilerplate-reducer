import test from 'ava'
import {assertIsFunction} from './avaHelpers'
import {generateSelector} from '../src/generateSelector'

test('generateSelector()', assert => {
  assertIsFunction(assert, generateSelector)
  const getFoo = generateSelector('foo').getFoo
  assertIsFunction(assert, getFoo, 'generateSelector() creates a function')
  assert.is(getFoo({foo: 'bar'}), 'bar', 'getter returns value based on the name of the noun.')
})
