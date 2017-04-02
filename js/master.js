var socket = io('http://localhost:3000');
var x1 = -1,x2 = -1,y1 = -1,y2 = -1;
window.draw = true;
clicked = false;
/*$('#whiteboard').keydown(function(){
   socket.emit('changed', $('#whiteboard').val()); 
});
$('#whiteboard').keyup(function(){
   socket.emit('changed', $('#whiteboard').val()); 
});*/
socket.on("drawn", function(x,y){
    console.log("drawn");
    clicked = true;
    drawstroke( $("#whiteboard")[0].getContext('2d'),x,y, true);
});
$('#whiteboard').mousedown(function(){
    clicked = true;
});
$('#whiteboard').mouseup(function(){
    clicked = false;
});
$('#whiteboard').mouseleave(function() {
	clicked = false;
	x1 = -1;
});
$('#whiteboard').mousemove(function(evt){
    var left = $("#whiteboard")[0].offsetLeft;
	var top = $("#whiteboard")[0].offsetTop;
	var x = evt.pageX - this.offsetLeft;
	var y = evt.pageY - this.offsetTop;
    drawstroke( $("#whiteboard")[0].getContext('2d'),x,y);
    
});
function drawstroke(canvas,x,y, socketed = false)
{
  if(window.draw == true)
  {
  	if(clicked == true)
  	{
      var flag = false;
      if(x1 == -1|| y1 == -1)
      {
  	     x1 = x;
         y1 = y;
         flag = true;
       }
       else
       {
         x2 = x1;
         y2 = y1;
         x1 = x;
         y1 = y;
       }
  	    if(flag == false) {
  	    	  joincircles(canvas);
              if(socketed == false)
                socket.emit('drawn',x,y);
        }
  	}
  }
}
function joincircles(canvas)
{
	if(x1 != -1 && x2 != -1)
	{
        canvas.beginPath();
        canvas.lineWidth = 5;
        canvas.shadowBlur = 5;
        canvas.lineJoin = canvas.lineCap = 'round';
        canvas.shadowColor = "black";
        canvas.strokeStyle = "black";
        canvas.moveTo(x2,y2);
        canvas.lineTo(x1,y1);
        canvas.stroke();
	}
}
