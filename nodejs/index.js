const Koa = require('koa')
const router = require('koa-router')()
const bodyParser = require('koa-bodyparser');
const static = require('koa-static')
const path = require('path')

const mockData = require('./mock_data')
const initDB = require('./init_db').init;

const {login,logon,testUniqueID} = require('./web_api/log.js')

var port = (process.env.NODE_ENV==='production')? 80 : 3000;

initDB();

const app = new Koa()

router.get('/api/mock', async (ctx, next) => {
    ctx.body = mockData
})
router.post('/api/login', async (ctx, next) => {
    ctx.response.body = await login(ctx.request.body)
})
router.post('/api/logon', async (ctx, next) => {
    ctx.response.body = await logon(ctx.request.body)
})
router.get('/api/testUniqueID', async (ctx,next) => {
    ctx.response.body = await testUniqueID(ctx.query)
})

const staticPath = './assets'
app.use(static(
    path.join( __dirname, staticPath)
))
app.use(bodyParser());
app.use(router.routes())
app.listen(port)
console.log('服务启动在 '+port+' 端口')