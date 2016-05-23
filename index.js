var express = require('express')
var app = new express()
var http = require('http').Server(app)
var io = require('socket.io')(http)
var port = process.env.PORT || 3000
var apiai = require('apiai')
var ai = apiai('f300bfa7236a429e915cbd51ce064db8')


// var request = ai.textRequest('go')
// request.on('response', function(response) {
//     console.log(response)
// })
// request.end()


app.get('/', function(req, res){
  res.sendfile('index.html')
})

var request
io.on('connection', function(socket){
  socket.on('message', function(msg){
    console.log(socket.id + '> message : ' + msg)
    request = ai.textRequest('' + msg)
    request.on('response', function(response) {
      console.log(response.result.fulfillment.speech)
      // text = response.result.fulfillment.speech
      io.emit('message', response.result.fulfillment.speech)
    })
    // io.emit('message', text)
    request.end()
  })
})




http.listen(port, function(){
  console.log('localhost', port)
})
