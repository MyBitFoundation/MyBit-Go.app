// https://nextjs.org/docs/api-reference/next.config.js/introduction

const { join } = require("path");
const get = require("lodash/get");
const set = require("lodash/set");
const merge = require("lodash/merge");
const { DefinePlugin } = require("webpack");
const { ANALYZE, GOOGLE_PLACES_API_KEY = "none", NODE_ENV } = process.env;
const isPrd = NODE_ENV === "production";
const isDev = NODE_ENV === "development";
const analyze = [true, "true", "1"].includes(ANALYZE);

/**
 * Allow all modules to import without ../
 * e.g. import MyButton from "ui/MyButton";
 * @type {object}
 */
const customAliases = {
  public: join(__dirname, "public"),
  components: join(__dirname, "components"),
  constants: join(__dirname, "constants"),
  utils: join(__dirname, "utils"),
  ui: join(__dirname, "components", "UI"),
  hooks: join(__dirname, "hooks")
};

/**
 * Import an svg as a react component
 * @type {object}
 */
const reactSvgRule = {
  test: /\.svg$/,
  loader: '@svgr/webpack'
}

/**
 * Customize next's webpack configuration
 * @method webpack
 * @param {object} cfg
 * @returns {object}
 */
function webpack(cfg, { isServer }) {
  if (isDev) {
    // see this for the rationale
    // https://github.com/gaearon/react-hot-loader/issues/1227#issuecomment-482514844
    set(cfg, "resolve.alias.react-dom", "@hot-loader/react-dom");
  }

  if (isPrd) {
    // Terser is mangling some things and causing an error with `process.env`
    // As a work-around we need to remove it and we can fix later
    cfg.optimization.minimizer = cfg.optimization.minimizer.filter(function(item) {
      return item.constructor.name !== "TerserPlugin";
    });
  }

  // use our aliases
  let alias = get(cfg, "resolve.alias", {});
  alias = merge(alias, customAliases)
  set(cfg, "resolve.alias", alias);

  // import svg as a react component
  cfg.module.rules.push(reactSvgRule);

  return cfg;
}

/**
 * Next config
 * @type {object}
 */
const nextConfig = {
  exportTrailingSlash: isPrd,
  compress: isPrd,
  generateEtags: isPrd,
  webpack
};

// use ANALYZE=true environment to run the bundle analyzer
if (analyze) {
  const bundleAnalyzer = require("@next/bundle-analyzer");
  const withBundleAnalyzer = bundleAnalyzer({
    openAnalyzer: false
  });
  nextConfig = withBundleAnalyzer(nextConfig);
}

module.exports = nextConfig;
