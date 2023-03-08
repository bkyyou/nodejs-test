// 可以在浏览器中运行
// const ws = new WebSocket('ws://localhost:4000/');
// ws.onopen = function() {
//   console.log('connect');
// }
// ws.onmessage = function(msg) {
//   console.log('client msg:', msg);
// }
// ws.send('1111')

// 服务端连服务端
const websocket = require('ws');
const wsclient = new websocket('ws://localhost:4000');
wsclient.on('open', function() {
  wsclient.send('hi');
})
wsclient.on('message', function(msg) {
  console.log('msg', msg.toString());
})
