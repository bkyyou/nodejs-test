// websocket包 ws nodejs-websocket 

const ws = require('ws');

const websocketServer = ws.Server;
const wss = new websocketServer({port: 4000});
// console.log('wss', wss);
wss.on('connection', (wsconnect) => {
  console.log('running')
  wsconnect.on('message', (msg, err) => {
    console.log(msg);
    wsconnect.send('hello', () => {})
  })
})
