const router = require('koa-router')()

const mongo = require('../controllers/JDBC');
router.get('/', async (ctx, next) => {
  mongo.connect(function(err){
    console.log(err);
  });
  await ctx.render('index', {
    title: 'Hello Koa 2!' 
  })
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
