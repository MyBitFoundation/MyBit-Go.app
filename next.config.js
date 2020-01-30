// https://nextjs.org/docs/api-reference/next.config.js/introduction

const os = require("os");
const path = require("path");
const bundleAnalyzer = require('@next/bundle-analyzer');
const withCss = require('@zeit/next-css');
const { ANALYZE, GOOGLE_PLACES_API_KEY } = process.env;

const withBundleAnalyzer = bundleAnalyzer({
  enabled: ANALYZE === true || ANALYZE === "true",
  openAnalyzer: false
});

module.exports = withBundleAnalyzer(withCss({
  distDir: 'build',
  env: { GOOGLE_PLACES_API_KEY }
}));
