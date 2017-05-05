// test/test_index.js
// https://github.com/webpack-contrib/karma-webpack#alternative-usage
// require to allow coverage report of untested files
require("../../client/client.js");

const testsContext = require.context("./spec/", true);
testsContext.keys().forEach(testsContext);
