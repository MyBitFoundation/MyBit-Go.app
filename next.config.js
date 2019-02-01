/* eslint-disable */
const withCss = require('@zeit/next-less')

// fix: prevents error when .css files are required by node
if (typeof require !== 'undefined') {
  require.extensions['.less'] = file => {}
}

module.exports = withCss({
  publicRuntimeConfig: {
    REACT_APP_INFURA_API_KEY: process.env.REACT_APP_INFURA_API_KEY,
  },
})
