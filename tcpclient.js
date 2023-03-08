const net = require('net');

let client = net.Socket();
client.connect(5000, 'localhost', () => {
  client.write('你好')
})

client.on('data', (msg) => {
  console.log('msg', msg.toString());
})