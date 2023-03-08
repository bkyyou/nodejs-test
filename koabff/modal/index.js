const request = require('request');

const { BASE_URL } = require('./constants.js');

const listUrl = BASE_URL + '/list';

console.log('BASE_URL', BASE_URL);

module.exports = async function(ctx, next) {
  const res = await new Promise((resolve, reject) => {
    request.post(listUrl, (err, res, body) => {
      resolve(body);
    })
  });
  console.log('index.js res', res);
  await ctx.render('index', {...JSON.parse(res), user: null});
  // await ctx.render('index', { word: 'hello'});
}