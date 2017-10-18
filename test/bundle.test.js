import isObject from "lodash/isObject";
import test from "ava";
import { assertIsFunction } from "./avaHelpers";
import * as bundle from "../src/bundle";
import * as bundlePresets from "../src/bundlePresets";

test("generateBundle()", assert => {
  assertIsFunction(assert, bundle.generateBundle);

  let foo = bundle.generateBundle(
    "foo",
    "bar",
    {
      set: (_, { payload }) => payload,
      baz: () => "baz",
    },
    state => state.myFoo
  );

  assert.is(foo.name, "foo", "bundles have a name property");
  assert.is(
    foo.SET_FOO,
    "SET_FOO",
    "Action types are defined by generateBundle()"
  );
  assertIsFunction(
    assert,
    foo.setFoo,
    "Action creators are defined by generateBundle()"
  );
  assert.deepEqual(
    foo.setFoo(1),
    { type: "SET_FOO", payload: 1 },
    "Action creators work as expected"
  );
  assert.true(
    isObject(foo.reducers),
    "generateBundle() creates an object called reducers"
  );
  assertIsFunction(
    assert,
    foo.reducers.SET_FOO,
    "Each key in reducers is a reducer"
  );
  assertIsFunction(
    assert,
    foo.reducers.BAZ_FOO,
    "additionalActions parameter can add additional actions and reducers"
  );
  assertIsFunction(
    assert,
    foo.reducer,
    "generateBundle() creates a reducer called reducer()"
  );
  assertIsFunction(
    assert,
    foo.selectFoo,
    "generateBundle() creates a selector"
  );
  assert.is(
    foo.selectFoo({ myFoo: "bar" }),
    "bar",
    "A customSelector can be provided."
  );
});

test("empty bundle", assert => {
  const foo = bundle.generateBundle("test", 0);
  const result = foo.reducer(5678, { type: "TEST" });
  assert.is(
    result,
    5678,
    "Bundles with no defined reducers just return the current state."
  );
});

test("addActionToBundle()", assert => {
  assertIsFunction(assert, bundle.addActionToBundle);
  let score = bundlePresets.generateNumber("score", 0);
  score = bundle.addActionToBundle(score, "invert");
  assertIsFunction(assert, score.invertScore);
  assert.is(score.INVERT_SCORE, "INVERT_SCORE");

  assert.throws(
    () => {
      bundle.addActionToBundle(score, "reducer");
    },
    Error,
    `You can't add a reducer called 'reduce'`
  );
  assert.throws(
    () => {
      bundle.addActionToBundle(score, "reducers");
    },
    Error,
    `You can't add a reducer called 'reduces'`
  );
});

test("addReducerToBundle()", assert => {
  assertIsFunction(assert, bundle.addReducerToBundle);

  let level = bundlePresets.generateNumber("level", 1, {
    complete: level => level + 1,
  });
  let score = bundlePresets.generateNumber("score", 0);

  score = bundle.addReducerToBundle(
    score,
    "ADD_MULTIPLIER",
    (score, { payload: multiplier }) => score * multiplier,
    0
  );
  let state = 64;
  let result = score.reducer(state, { type: "ADD_MULTIPLIER", payload: 2 });
  let expected = 128;
  assert.is(
    result,
    expected,
    "addReducerToBundle() can add a reducer case to an existing reducer using any arbitrary string."
  );

  score = bundle.addReducerToBundle(
    score,
    level.COMPLETE_LEVEL,
    score => score + 10000,
    0
  );
  state = 32000;
  result = score.reducer(state, level.completeLevel());
  expected = 42000;
  assert.is(
    result,
    expected,
    "addRedcuer() can add a reducer case to an existing reducer using an action not defined internally."
  );
});
