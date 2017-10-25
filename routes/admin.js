const router = require('koa-router')()
const login = require('../middlewares/admin/login')
router.prefix('/admin')

router.use(async function(ctx,next){
    if(ctx.request.session || ctx.url == '/admin/login'){
        await next()
    }else{
        console.log(222222222222);
        ctx.redirect('/admin/login')
    }
})
router.get('/login',async function(ctx, next){
    console.log(111111111111);
    await ctx.render('login',{})
})
router.post('/login',async function(ctx,next){
    var r = "";
    login.selectadmin({
        'name':ctx.request.body.name,
        'password':ctx.request.body.password
    },(result)=>{
        ctx.render('index',{
            title:'123'
        });
    })
})
router.get('/', async function (ctx, next) {
    await ctx.render('index',{
        title:'123'
    });
})
router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

module.exports = router