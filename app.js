const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require("koa-session");

const index = require('./routes/index')
const users = require('./routes/users')
const admin = require('./routes/admin')

// error handler
onerror(app)

//session
const CONFIG = {
  key: 'koa:sess',
  maxAge: 86400000,
  httpOnly: true,
  path:"/",
};
 
app.use(session(CONFIG, app));
// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))
app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))
// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(admin.routes(), admin.allowedMethods())
app.use(index.routes(), index.allowedMethods())

module.exports = app
