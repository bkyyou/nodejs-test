const http = require('http');
const url = require('url');
const fs = require('fs');

const server = http.createServer();

server.on('request', (req, res) => {

  // 获取请求头
  console.log(req.headers);
  // 设置响应头
  // res.setHeader('a', '123');
  // res.writeHead(400, {
  //   a: 123,
  //   b: 123
  // })
  // const urlObj = url.parse(req.url);
  const urlObj = url.parse(req.url, true); // true 可以将 query 解析成对象
  console.log('urlObj', urlObj);
  if (urlObj.pathname === '/page1') {
    res.write('hello'); // 写入流
    res.write('hello'); // 写入流
    res.end('hello world'); // 结束
  }
  if (urlObj.pathname === '/page2') {
    res.write('hello2'); // 写入流
    res.write('hello2'); // 写入流
    res.end('hello world2'); // 结束
  }
  if (urlObj.pathname === '/htmlpage') {
    const _html = fs.createReadStream('./web/index.html');
    _html.on('data', chunk => {
      res.write(chunk);
    });
    _html.on('end', () => {
      res.end();
    })
  }
  if (urlObj.pathname === '/text.css') {
    const _css = fs.createReadStream('./web/text.css');
    _css.on('data', chunk => {
      res.write(chunk);
    });
    _css.on('end', () => {
      res.end();
    })
  }
  if (urlObj.pathname === '/api1') {
    if (req.method !== 'GET') {
      res.statusCode = 400;
      res.end()
    }
    const query = urlObj.query;
    res.end(JSON.stringify({
      data: [1, 2, 3],
      a: query.a,
    }))
  }
  // Post 请求 - 请求体 body
  if (urlObj.pathname === '/api2') {
    if (req.method !== 'POST') {
      res.statusCode = 400;
      res.end()
    }
    let post = '';
    req.on('data', (chunk) => {
      post += chunk;
    })
    req.on('end', () => {
      res.end('请求了post接口，请求参数是：' + post)
    })
  }
})

server.listen(3100, () => {
  console.log('running');
})