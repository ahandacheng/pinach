const router = require('koa-router')()
router.prefix('/users')
router.get('/test', async (ctx, next) => {
  ctx.body = "asdasd";
  await next()
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
