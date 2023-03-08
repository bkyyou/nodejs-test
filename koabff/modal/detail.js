const request = require('request');
const {  BASE_URL } = require('./constants.js');

const detailUrl = BASE_URL + '/detail';
module.exports = async function(ctx, next) {
  const _id = ctx.request.params.id;
  const res = await new Promise((resolve, reject) => {
    request.get(detailUrl + '?id=' + _id, (err, res, body) => {
      resolve(body);
    })
  });
  console.log('detail.js res', res);
  await ctx.render('detail', {...JSON.parse(res)});
}