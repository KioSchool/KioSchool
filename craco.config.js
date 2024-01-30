const { CracoAliasPlugin, configPaths } = require('react-app-alias');

const aliasMap = configPaths('./tsconfig.paths.json');

module.exports = {
  babel: {
    presets: '@emotion/babel-preset-css-prop',
  },
  plugins: [
    {
      plugin: CracoAliasPlugin,
      options: {
        alias: aliasMap,
      },
    },
  ],
};

module.exports;
