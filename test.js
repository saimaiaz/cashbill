var express = require('express')
var app = express()

var requestTime = function (req, res, next) {
  req.requestTime1 = Date.now()
  next()
}

app.use(requestTime)

app.get('/', function (req, res) {
  var responseText = 'Hello World!111<br>'
  responseText += '<small>Requested at: ' + req.requestTime1 + '</small>'
  res.send(responseText)
})

app.listen(3333)