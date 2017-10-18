import test from "ava";
import { assertReducer } from "./avaHelpers";
import * as lib from "../src/commonReducers";
import { List } from "immutable";

test("identityReducer", assert => {
  const msg =
    "identityReducer always returns the original state with no modification.";

  assertReducer(assert, msg, {
    reducer: lib.identityReducer,
    state: null,
    action: { payload: 123 },
    expected: null,
  });
  assertReducer(assert, msg, {
    reducer: lib.identityReducer,
    state: 12345,
    action: { payload: "hello" },
    expected: 12345,
  });
});

test("setReducer", assert => {
  assertReducer(
    assert,
    "setReducer returns the payload value without modification.",
    {
      reducer: lib.setReducer,
      state: null,
      action: { payload: 123 },
      expected: 123,
    }
  );
});

test("toggleReducer", assert => {
  const reducer = lib.toggleReducer;
  assertReducer(assert, "Toggles from true to false", {
    reducer,
    state: true,
    expected: false,
  });

  assertReducer(assert, "Toggles from false to true", {
    reducer,
    state: false,
    expected: true,
  });

  assertReducer(assert, "falsy values are toggled to true", {
    reducer,
    state: "",
    expected: true,
  });

  assertReducer(assert, "truthy values are toggled to false", {
    reducer,
    state: [1, 2, 3],
    expected: false,
  });
});

test("incrementReducer()", assert => {
  let reducer = lib.incrementReducer;
  assertReducer(assert, "increments a value by 1", {
    reducer,
    state: 999,
    expected: 1000,
  });

  assertReducer(assert, "increments a value by an arbitrary amount", {
    reducer,
    state: 999,
    action: { payload: 1001 },
    expected: 2000,
  });
});

test("decrementReducer()", assert => {
  let reducer = lib.decrementReducer;
  assertReducer(assert, "decrements a value by 1", {
    reducer,
    state: 1000,
    expected: 999,
  });

  assertReducer(assert, "decrements a value by an arbitrary amount", {
    reducer,
    state: 2000,
    action: { payload: 1001 },
    expected: 999,
  });
});

test("getResetReducer()", assert => {
  const initialState = 1234;
  let reducer = lib.getResetReducer(initialState);
  assertReducer(assert, "Resets value to initial state value.", {
    reducer,
    state: 1000,
    expected: initialState,
  });
});

test("addItemReducer()", assert => {
  const reducer = lib.addItemReducer;

  assertReducer(assert, "Adds an item to the end of a list.", {
    reducer,
    state: [1, 2, 3],
    action: { payload: 4 },
    expected: [1, 2, 3, 4],
  });

  assertReducer(assert, "Adds an item to a specific place in a list.", {
    reducer,
    state: [1, 2, 4],
    action: { payload: 3, meta: 2 },
    expected: [1, 2, 3, 4],
  });

  assertReducer(assert, "Handles beginning of list correctly.", {
    reducer,
    state: [1, 2, 3],
    action: { payload: 0, meta: 0 },
    expected: [0, 1, 2, 3],
  });

  assertReducer(assert, "Works with immutable List.", {
    reducer,
    state: List([1, 2, 4]),
    action: { payload: 3, meta: 2 },
    expected: List([1, 2, 3, 4]),
  });
});
