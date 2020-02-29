// https://nextjs.org/docs/api-reference/next.config.js/introduction

const withCss = require('@zeit/next-css');
const set = require("lodash/set");
const { ANALYZE, GOOGLE_PLACES_API_KEY, NODE_ENV } = process.env;
const isPrd = NODE_ENV === "production";
const analyze = [true, "true", "1"].includes(ANALYZE);

function webpack(cfg) {
  set(cfg, "watchOptions.ignored", [
    "**/.git/**",
    "**/.next/**",
    "**/node_modules/**",
    "**/out/**",
  ]);
  return cfg;
}

const nextConfig = withCss({
  env: { GOOGLE_PLACES_API_KEY },
  exportTrailingSlash: isPrd,
  compress: isPrd,
  generateEtags: isPrd,
  webpack,
});

if (analyze) {
  const bundleAnalyzer = require('@next/bundle-analyzer');
  const withBundleAnalyzer = bundleAnalyzer({
    openAnalyzer: false
  });
  nextConfig = withBundleAnalyzer(nextConfig);
}

module.exports = nextConfig;
