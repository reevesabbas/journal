module.exports = function(api) {
  api.cache(true);
  return {
    "plugins": [
      "@babel/plugin-transform-flow-strip-types",
      "babel-plugin-transform-typescript-metadata",
      ["@babel/plugin-proposal-decorators", { "legacy": true }],
      ["@babel/plugin-proposal-class-properties", { "loose": true }],
      "react-native-reanimated/plugin",
    ],
    presets: [
      ['babel-preset-expo', {targets: {node: 'current'}}],
    '@babel/preset-typescript',
    ],
  };
};