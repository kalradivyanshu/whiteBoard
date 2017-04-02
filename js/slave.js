var socket = io('http://localhost:3000');
socket.on('changed', function(msg){
	$('#white').html(msg);
});