const express = require('express');
// 文件上传得到获取文件
const multer = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'upload/')
  },
  filename: function (req, file, cb) {
    console.log('file', file);
    cb(null, Date.now() + '.jpg') //Appending .jpg
  }
})

const uploader = multer({
  // dest: 'upload/',
  // single: 'file',
  storage,
})

const router = express.Router();

// all 也是所有请求， * 匹配所有路径
router.all('*', (req, res, next) => {
  // console.log('3');
  next();
})

// /api1 也相当于中间件，但是只对 /api1 生效
router.get('/api1', (req, res) => {
  console.log(req.query);
  // res.end('11111');
  // res.sendFile()
  res.json({
    a: [1,2,3]
  })
})

router.post('/api2', (req, res) => {
  console.log(req.body);
  // res.end('11111');
  // res.sendFile()
  res.json({
    a: [1,2,3]
  })
})

router.post('/upload', uploader.single('file'), (req, res) => {
  console.log(req.body);
  // res.end('11111');
  // res.sendFile()
  res.json({
    msg: '文件已经接收'
  });
})
// router.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html')
// })

module.exports = router;