const request = require('request');

module.exports = async function(ctx, next) {
  await ctx.render('login');
}