const { injectBabelPlugin } = require('react-app-rewired')

function rewireImportBabelInlineSvg(config, env, gqlPluginOptions = {}) {
  const pluginOptions = Object.assign({}, gqlPluginOptions, { nodePath: process.env.NODE_PATH })
  return injectBabelPlugin(['inline-react-svg', pluginOptions], config)
}

module.exports = function override(config, env) {
  config = rewireImportBabelInlineSvg(config, env);
  return config;
}
