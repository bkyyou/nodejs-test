// npm i mkcert -g
// mkcert create-ca
const https = require('https');
const fs = require('fs');

const options = {
  key: fs.readFileSync(__dirname + '/cert.key'),
  cert: fs.readFileSync(__dirname + '/cert.crt'),
}

const app = https.createServer(options, (req, res) => {

})

app.listen(3200)