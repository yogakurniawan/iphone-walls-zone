const CompressionPlugin = require('compression-webpack-plugin')

module.exports = {
  webpack: function (config) {
    config.plugins.push(new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    }))

    return config
  }
}