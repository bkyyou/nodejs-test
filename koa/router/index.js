const koarouter = require('koa-router');

const router = new koarouter();

router.get('/api1', (ctx, next) => {
  console.log('api1----', ctx.request.query);
  ctx.body = {
    a: 123,
    b: 3,
  }
})

router.post('/api2', (ctx, next) => {
  console.log('api2----', ctx.request.body);
  // ctx.body = 'hello';
  ctx.body = {
    a: 123,
    b: 3,
  }
})

module.exports = router;