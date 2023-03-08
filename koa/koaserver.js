const Koa = require('koa');
const { koaBody } = require('koa-body');
const router = require('./router/index.js')

const app = new Koa();

app.use(koaBody({
  multer: true,
  // json: true,
  // text: true,
  // urlencoded: true,
}))

app.use((ctx, next) => {
  console.log(1);
  // ctx.body = 'hello1';
  ctx.set({
    // 'Access-Control-Allow-Origin': 'http://127.0.0.1:5173',
    'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE, OPTIONS',
    // 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    // 'Content-Type': 'application/json',
    // 'Access-Control-Allow-Credentials': true,

    'Access-Control-Allow-Origin': '*',
    // 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
    'Access-Control-Allow-Headers': 'Content-Type',
  })
  next()
})


app.use((ctx, next) => {
  // console.log(2);
  console.log('url', ctx.url);
  console.log('query', ctx.query);
  console.log('ctx.method', ctx.method);
  if (ctx.method === 'OPTIONS') {
    console.log(ctx.request.body);
    ctx.response.status = 200;
  } else {
    next()
  }
  // ctx.body = 'hello2';
})
app.use(router.routes())

// app.use((ctx, next) => {
//   // console.log(3);
//   ctx.body = 'hello3';
//   next()
// })

app.listen(5000, () => {
  console.log('koa running');
})