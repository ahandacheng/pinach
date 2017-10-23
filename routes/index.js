const router = require('koa-router')()
const Vue = require('vue')
const Koa = require('koa')
const app = new Koa()
const renderer = require('vue-server-renderer').createRenderer()
const mongo = require('../controllers/JDBC');
var fs = require('fs');
var path = require('path');
router.get('/test', async (ctx, next) => {
  mongo.connect(function(err){
    console.log(err);
  });
  await next()
  fs.readFile(path.join(__dirname, '../page/index.html'),function(err,file){
    console.log(file);
    renderer.renderToString(app, (err, html) => {
      ctx.response.body = file;
    })
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
