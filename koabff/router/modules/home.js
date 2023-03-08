
const homeRouter = {
  get(path, cb) {

  },
  post(path, cb) {

  },
}

homeRouter.get('/api1', (ctx, next) => {
  console.log('api1----', ctx.request.query);
  ctx.body = {
    a: 123,
    b: 3,
  }
})

module.exports = homeRouter;