var path  = require('path');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const productionGzipExtensions = ['js', 'css'];
const isProduction = process.env.NODE_ENV === 'production';
module.exports = {
 publicPath: './',
 outputDir: path.join(__dirname,'../nodejs/assets'),
 assetsDir: '', // 相对于outputDir的静态资源(js、css、img、fonts)目录
 lintOnSave: false,
 runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本
 productionSourceMap: false, // 生产环境的 source map
 parallel: require('os').cpus().length > 1,
 pwa: {},
 configureWebpack: config => {
    if (isProduction) {
      config.plugins.push(new CompressionWebpackPlugin({
        algorithm: 'gzip',
        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
        threshold: 10240,
        minRatio: 0.8
      }))
    }
  },
  devServer: {
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3000/', //对应自己的接口
        changeOrigin: true,
        ws: true,
      }
    },
  }
};