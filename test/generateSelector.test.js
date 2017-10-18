import test from "ava";
import { assertIsFunction } from "./avaHelpers";
import { generateSelector } from "../src/generateSelector";

test("generateSelector()", assert => {
  assertIsFunction(assert, generateSelector);
  const selectFoo = generateSelector("foo").selectFoo;
  assertIsFunction(assert, selectFoo, "generateSelector() creates a function");
  assert.is(
    selectFoo({ foo: "bar" }),
    "bar",
    "getter returns value based on the name of the noun."
  );
});
