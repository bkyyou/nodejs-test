/**
 * 这是 中间层 和 页面最终要求的 数据的服务
 */
const Koa = require('koa');
// const cors = require('koa-cors')
const koaRouter = require('koa-router');
const { koaBody } = require('koa-body');


const app = new Koa();
const router = new koaRouter();

router.post('/login', (ctx, next) => {
  // console.log(ctx.request.body, '---');
  ctx.body = {
    message: '登录成功'
  }
})

router.post('/list', (ctx, next) => {
  console.log(ctx.request.body, '---');
  const list = [
    {
      name: '电脑',
      id: 0,
    },
    {
      name: '手机',
      id: 1,
    },
    {
      name: '平板',
      id: 2,
    },
  ]
  ctx.body = JSON.stringify({ list })
})

const goodsArr = [
  {
    id: '0',
    name: '电脑',
    price: 1000,
    count: 1,
  },
  {
    id: '1',
    name: '手机',
    price: 1000,
    count: 1,
  },
  {
    id: '2',
    name: '平板',
    price: 1000,
    count: 1,
  },
]
// router.post('/detail/:id', (ctx, next) => {
router.get('/detail', (ctx, next) => {
  console.log('detail', ctx.query.id);
  const _id = ctx.query.id

  goodsArr.forEach(val => {
    if (val.id === _id) {
      ctx.body = val
    }
  })
})
// app.use(cors());
app.use(koaBody({
  multer: true,
}))
app.use((ctx, next) => {
  console.log(1);
  ctx.set({
    'Access-Control-Allow-Origin': 'http://localhost:5001',
    'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Headers': 'Content-Type',
    // 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, token',
    // 'Access-Control-Allow-Origin': '*',
  })
  // console.log(2222);
  next()
})
app.use((ctx, next) => {
  // console.log('url', ctx.url);
  if (ctx.method === 'OPTIONS') {
    // console.log(ctx.request.body);
    ctx.response.status = 200;
  } else {
    // console.log('next router');
    next()
  }
})
app.use(router.routes())

app.listen(5002, () => {
  console.log('koabff server running');
})

