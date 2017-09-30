// Lodash utils
import merge from "lodash/merge";

import * as generateAction from "./generateAction";
import * as generateSelector from "./generateSelector";
import * as naming from "./naming";
import * as bundle from "./bundle";
import * as bundlePresets from "./bundlePresets";
import * as commonReducers from "./commonReducers";

let lib = merge(
  generateAction,
  generateSelector,
  naming,
  bundle,
  bundlePresets,
  commonReducers
);

export default lib;
module.exports = lib;
