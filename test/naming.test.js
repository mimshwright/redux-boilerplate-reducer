import test from "ava";
import { assertIsFunction } from "./avaHelpers";
import * as naming from "../src/naming.js";

test("createActionTypeName()", assert => {
  assertIsFunction(assert, naming.createActionTypeName);

  assert.is(
    naming.createActionTypeName("set", "foo"),
    "SET_FOO",
    "Creates action types for single words."
  );
  assert.is(
    naming.createActionTypeName("add ten to", "My Value"),
    "ADD_TEN_TO_MY_VALUE",
    "Creates action types for multiple words."
  );
  assert.is(
    naming.createActionTypeName("add 10 to", "My Value"),
    "ADD_10_TO_MY_VALUE",
    "Creates action types for multiple words including digits."
  );
});

test("createActionTypeValue()", assert => {
  assertIsFunction(assert, naming.createActionTypeValue);

  const verb = "throw out";
  const noun = "every preconcieved notion";
  assert.is(
    naming.createActionTypeValue(verb, noun),
    naming.createActionTypeName(verb, noun),
    "Output should be the same as createActionTypeName()"
  );
});

test("createActionCreatorName()", assert => {
  assertIsFunction(assert, naming.createActionCreatorName);

  assert.is(
    naming.createActionCreatorName("set", "foo"),
    "setFoo",
    "Creates action creator name for single words."
  );
  assert.is(
    naming.createActionCreatorName("add ten to", "My Value"),
    "addTenToMyValue",
    "Creates action creator name for multiple words."
  );
  assert.is(
    naming.createActionCreatorName("add 10 to", "My Value"),
    "add10ToMyValue",
    "Creates action creator name for multiple words including digits."
  );
});
