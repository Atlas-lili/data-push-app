const Koa = require('koa')   //koa2中间件依赖
const static = require('koa-static')   //静态资源服务插件
const path = require('path')           //路径管理

var port = (process.env.NODE_ENV==='production')? 80 : 3000;
const staticPath = './assets'

const app = new Koa()       //js的继承
app.use(static(
    path.join( __dirname, staticPath)
))

app.listen(port)
console.log('服务启动在 '+port+' 端口')