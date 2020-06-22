module.exports = {
  entry: './src/main.js',
  output: './build.js',
  plugin: [require('./plugin/plugin')],
  devServer: true
}