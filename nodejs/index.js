var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


io.on('connection', function(socket){
  console.log("userconnected");
  socket.on('changed', function(msg){
    console.log('message: ' + msg);
    io.emit('changed', msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});