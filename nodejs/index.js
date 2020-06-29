const Koa = require('koa')
const router = require('koa-router')()
const bodyParser = require('koa-bodyparser');
const static = require('koa-static')
const path = require('path')

const initDB = require('./init_db').init;
const {scheduleCronstyle} = require('./daily_work')

const {login,logon,testUniqueID, sendCheckCode} = require('./web_api/log.js')
const {ipSearch} = require('./web_api/ip.js')
const {addSub, changeSub, confSubList} = require('./web_api/sub.js')
const {confCity} = require('./web_api/city.js')

var port = (process.env.NODE_ENV==='production')? 80 : 3000;

initDB();

const app = new Koa();
router.post('/api/login', async (ctx, next) => {
    ctx.response.body = await login(ctx.request.body)
})
router.post('/api/logon', async (ctx, next) => {
    ctx.response.body = await logon(ctx.request.body)
})
router.post('/api/sendCheckCode', async (ctx, next) => {
    ctx.response.body = await sendCheckCode(ctx.request.body)
})
router.get('/api/testUniqueID', async (ctx,next) => {
    ctx.response.body = await testUniqueID(ctx.query)
})



router.get('/api/ipSearch', async (ctx,next) => {
    ctx.response.body = await ipSearch(ctx.request)
})
router.post('/api/addSub', async (ctx,next) => {
    ctx.response.body = await addSub(ctx.request.body)
})
router.post('/api/changeSub', async (ctx,next) => {
    ctx.response.body = await changeSub(ctx.request.body)
})
router.post('/api/confSubList', async (ctx,next) => {
    ctx.response.body = await confSubList(ctx.request.body)
})
router.post('/api/confCity', async (ctx,next) => {
    ctx.response.body = await confCity(ctx.request.body)
})
const staticPath = './assets'
app.use(static(
    path.join( __dirname, staticPath)
))
app.use(bodyParser());
app.use(router.routes())
app.listen(port)
console.log('服务启动在 '+port+' 端口')

scheduleCronstyle();