const webpack = require("webpack");
const withImages = require("next-images");
const withPlugins = require("next-compose-plugins");
const withOffline = require("next-offline");
require("dotenv").config();

const nextConfig = {
  target: "serverless",
  webpack: (config, options) => {
    config.plugins.push(
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        jquery: "jquery",
        "window.$": "jquery",
        "window.jQuery": "jquery",
        Popper: "popper.js",
      })
    );
    return config;
  },
  workboxOpts: {
    swDest: "static/service-worker.js",
    runtimeCaching: [
      {
        urlPattern: /^https?.*/,
        handler: "NetworkFirst",
        options: {
          cacheName: "https-calls",
          networkTimeoutSeconds: 15,
          expiration: {
            maxEntries: 150,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 1 month
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
    ],
  },
};

module.exports = withPlugins(
  [
    [
      withOffline,
      {
        workboxOpts: {
          swDest: "../public/service-worker.js",
        },
      },
    ],
    [
      {
        test: /\.js$/,
        loader: "babel-loader",
        query: {
          presets: ["es2015"],
        },
      },
    ],
    [withImages, { esModule: true }],
  ],
  nextConfig
);