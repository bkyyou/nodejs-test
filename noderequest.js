const http = require('http');

http.get('http://localhost:3100/api1?a=123', res => {
  let _data = '';
  res.on('data', chunk => {
    _data += chunk;
  })

  res.on('end', () => {
    console.log(JSON.parse(_data));
  })
})

const req = http.request({
  hostname: 'localhost',
  port: '3100',
  path: '/api2?a=123',
  method: 'POST',
}, res => {
  let _data = '';
  res.on('data', chunk => {
    _data += chunk;
  })
  res.on('end', () => {
    console.log(_data);
  })
})
// req.setHeader('a', '123');
// req.writeHead(400, {
//   a: 123,
//   b: 123
// })
req.write(JSON.stringify({a: 123, b: 1, c: 1}));
req.end();