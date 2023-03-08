const request = require('request');

module.exports = async function(ctx, next) {
  ctx.body = await ctx.render('login');
}