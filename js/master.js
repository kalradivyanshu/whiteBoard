var socket = io('http://localhost:3000');
$('#whiteboard').keydown(function(){
   socket.emit('changed', $('#whiteboard').val()); 
});
$('#whiteboard').keyup(function(){
   socket.emit('changed', $('#whiteboard').val()); 
});