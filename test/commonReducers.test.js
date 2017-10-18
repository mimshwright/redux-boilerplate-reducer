import test from "ava";
import { assertReducer } from "./avaHelpers";
import * as lib from "../src/commonReducers";

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
