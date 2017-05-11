$(function () {
  var socket = io();

  function sendMessage() {
    var nickname = $('#nickname').val();
    var message = $('#message').val();
    socket.emit('chat message', `<${nickname}> ${message}`);
    $('#message').val('');
  }

  $('form').submit(function(){
    sendMessage();
    return false;
  });

  socket.on('chat message', function(msg){
    $('#messages').append($('<li>').text(msg));
  });
});