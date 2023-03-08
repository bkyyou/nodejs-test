// 应用规则：
// express 中 use 的第一个参数是匹配路径 不传相当于"/"
// 中间件匹配机制是惰性匹配，即匹配路径为/a的中间件，访问/aa时同样会被执行（这也意味着不传匹配路径时即所有请求都会应用此中间件）

const express = require('express');
const router = require('./router/index.js');

const app = express();

// 只对 /b 有效，不写对所有 路径有效
// app.use('/b', (req, res, next) => {

// })

app.use((req, res, next) => {
  // console.log('1');
  // header 方法可以设置多个，参数可以是一个对象， setHeader 只能设置一个
  // res.header === res.set
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  // res.header('Content-Type', 'application/json');
  next();
})

// 设置静态目录
app.use(express.static(__dirname + '/static' ));
/**
 * 解析post请求获取参数设置的中间件
 */
// urlencoded 针对 content-type 是 application/x-www-form-urlencoded 的解析 表单提交的参数
app.use(express.urlencoded());
// json 针对 content-type 是 application/json 的解析
app.use(express.json());
// epxress.raw() application/octet-stream 解析流形式
// epxress.text() text/plain 

app.use((req, res, next) => {
  // console.log('2');
  next();
})

app.use('/', router); // / 是前缀
// app.use('/mode', router); // /mode 是前缀 请求的接口就是 /mode/api1

app.listen(5000, () => {
  console.log('express running');
})