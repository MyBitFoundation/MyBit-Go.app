/* eslint-disable */
const path = require('path')
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer')
const withCss = require('@zeit/next-css')

// fix: prevents error when .css files are required by node
if (typeof require !== 'undefined') {
  require.extensions['.css'] = file => { }
}

module.exports = withBundleAnalyzer(withCss({
  webpack: (config, { dev, isServer }) => {
    if (!dev) {
      config.devtool = false

      // disable soucemaps of babel-loader
      for (const r of config.module.rules) {
        if (r.loader === 'babel-loader') {
          r.options.sourceMaps = false
        }
      }
    }

    if (!isServer) {
      const cacheGroups = config.optimization.splitChunks.cacheGroups
      delete cacheGroups.react
      cacheGroups.default = false
      cacheGroups.vendors = {
        name: 'vendors',
        test: /[\\/](node_modules|packages)[\\/]/,
        enforce: true,
        priority: 20,
      }
      cacheGroups.commons = {
        name: 'commons',
        minChunks: 2,
        priority: 10,
      }
    }

    return config
  },
  analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),
  analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
  bundleAnalyzerConfig: {
    server: {
      analyzerMode: 'static',
      reportFilename: '../bundles/server.html'
    },
    browser: {
      analyzerMode: 'static',
      reportFilename: '../bundles/client.html'
    }
  },
  publicRuntimeConfig: {}
}));
