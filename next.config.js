const CompressionPlugin = require('compression-webpack-plugin')
const { assocPath } = require('ramda');

module.exports = {
  webpack(config, { dev }) {
    config.plugins.push(new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    }))

    const eslintRule = {
      test: /\.js$/,
      enforce: 'pre',
      exclude: /node_modules/,
      loader: 'eslint-loader',
      options: {
        // Emit errors as warnings for dev to not break webpack build.
        // Eslint errors are shown in console for dev, yay :-)
        emitWarning: dev,
      },
    };

    config.module.rules.push(eslintRule)
    return config
  }
}
