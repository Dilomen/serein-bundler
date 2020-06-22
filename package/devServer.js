const express = require('express')
const app = express()
const debounce = require('../utils/debounce')
var http = require('http').Server(app)
var io = require('socket.io')(http)
const fs = require('fs')
const path = require('path')
app.get('/', function(req, res){
  res.writeHead(200, { "Content-Type": "text/html" });
  const filePath = path.resolve(__dirname, './index.html')
  const content = fs.readFileSync(filePath, 'utf-8')
  res.end(content)
})
const filePath = path.resolve(__dirname, './build.js')
io.on('connection', function(socket) {
  fs.watch(filePath, () => {
    debounce(() => {
      const content = fs.readFileSync(filePath, 'utf-8')
      io.emit('change file', content)
    }, 500)()
  })
});

app.use(express.static(path.join(__dirname, "./")));
http.listen('8010', () => {
  console.log('http://localhost:8010')
})
