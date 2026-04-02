const { getDefaultConfig } = require("expo/metro-config");
const { withUniwind } = require("uniwind/metro");

const config = getDefaultConfig(__dirname);

module.exports = withUniwind(config, { input: "./global.css" });
