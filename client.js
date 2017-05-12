$(function () {
  var host = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port;
  var socket = io(host);
  setSpacerHeight();

  function sendMessage() {
    socket.emit('chat message', {
      nickname: $('#nickname').val(),
      message: $('#message').val()
    });
    $('#message').val('');
  }

  function setSpacerHeight() {
    var formHeight = $('form').outerHeight();
    $('#spacer').height(formHeight);
  }

  $('form').submit(function(){
    sendMessage();
    return false;
  });

  socket.on('chat message', function(msg){
    $('#messages').append($('<li>')
      .append($('<span class="dyno">').text(msg.dyno))
      .append($('<span class="time">').text(msg.time))
      .append($('<span class="nick">').text(msg.nick))
      .append($('<span class="message">').text(msg.message))
    );
    $('html, body').animate({ scrollTop: $(document).height() }, 1000);
    setSpacerHeight();
  });
});