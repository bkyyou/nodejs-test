const koarouter = require('koa-router');
// const homeRouter = require('./modules/home/index.js');
const index = require('../modal/index.js');
const login = require('../modal/login.js');
const detail = require('../modal/detail.js');

const router = new koarouter();

router.get('/', async (ctx, next) => {
  await index(ctx, next);
})

router.get('/login', async (ctx, next) => {
  await login(ctx, next);
})

router.get('/detail/:id', async (ctx, next) => {
  await detail(ctx, next);
})

module.exports = router;