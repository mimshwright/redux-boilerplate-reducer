import test from "ava";
import { assertIsFunction } from "./avaHelpers";
import * as lib from "../src/generateAction";

test("generateAction()", assert => {
  assertIsFunction(assert, lib.generateAction);

  const action = lib.generateAction("flaggle", "Mingle Moomies");
  assert.is(
    action.FLAGGLE_MINGLE_MOOMIES,
    "FLAGGLE_MINGLE_MOOMIES",
    "generates an action type based on noun and verb"
  );
  assertIsFunction(
    assert,
    action.flaggleMingleMoomies,
    "getAction() creates a creator function"
  );
  assertIsFunction(
    assert,
    action.flaggle,
    "getAction() creates an alias creator function with no noun"
  );
  assert.deepEqual(
    action.flaggleMingleMoomies(123),
    { type: action.FLAGGLE_MINGLE_MOOMIES, payload: 123 },
    "generates an action creator based on noun and verb"
  );
  assert.deepEqual(
    action.flaggleMingleMoomies(),
    { type: action.FLAGGLE_MINGLE_MOOMIES },
    "Payload is ignored if not provided."
  );
  assert.deepEqual(
    action.flaggle(123),
    action.flaggleMingleMoomies(123),
    "alias creates the same output as main actionCreator"
  );
});
