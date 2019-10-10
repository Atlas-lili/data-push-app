var path  = require('path');
module.exports = {
 baseUrl: './',
 outputDir: path.join(__dirname,'../nodejs/assets'),
 assetsDir: '', // 相对于outputDir的静态资源(js、css、img、fonts)目录
 lintOnSave: false,
 runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本
 productionSourceMap: false, // 生产环境的 source map
 parallel: require('os').cpus().length > 1,
 pwa: {}
};