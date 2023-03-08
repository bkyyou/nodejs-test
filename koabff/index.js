/**
 * 中间层的服务
 */
const Koa = require('koa');
// const koarouter = require('koa-router');
const views = require('koa-views');
const ejs = require('ejs');
const fs = require('fs');
const koaStatic = require('koa-static');
const router = require('./router/index.js');

const app = new Koa();
// const router = new koarouter();

app.use(views('./views', {
  extension: 'ejs',
}));
app.use(koaStatic('./static'))

// 返回页面
// router.get('/', async (ctx, next) => {
//   // 第一种
//   // const _template = fs.readFileSync('./views/index.ejs').toString();
//   // const _html = await ejs.render(_template, {
//   //   word: 'hello ejs',
//   // });
//   // ctx.body = _html;

//   // 第二种
//   // ejs.renderFile('./views/index.ejs', {
//   //   word: 'hello ejs2'
//   // }, (err, _html) => {
//   //   ctx.body = _html;
//   // })

//   // 第三种 使用 views 中间件 ctx 的 render 方法是 views 设置的
//   ctx.body = await ctx.render('index', {
//     word: 'hello ejs3 --',
//   })
// })

app.use((ctx, next) => {
  if (ctx.url !== '/login') {
    const username = ctx.cookies.get('username');
    if (!username) {
      ctx.redirect('/login');
    } else {
      return next()
    }
  } else {
    return next()
  }
})

app.use(router.routes());

app.listen(5001, () => {
  console.log('koa bff running');
})