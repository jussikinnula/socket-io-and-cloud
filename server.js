var PORT = process.env.PORT || 5000;
var REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';
var DYNO_NAME = process.env.PS || process.env.DYNO || `local.${PORT}`;

var path = require('path');
var moment = require('moment');
var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var adapter = require('socket.io-redis');
io.adapter(adapter(REDIS_URL));

// Static assets
var routing = {
  '/socket.io.js': './node_modules/socket.io-client/dist/socket.io.js',
  '/socket.io.js.map': './node_modules/socket.io-client/dist/socket.io.js.map',
  '/jquery.min.js': './node_modules/jquery/dist/jquery.min.js',
  '/styles.css': './styles.css',
  '/client.js': './client.js',
  '/favicon.ico': './favicon.ico',
  '/': './index.html'
};

// Setup routing
for (var route in routing) {
  app.get(route, function(req, res) {
    // Send the correct file if the routing has been set
    res.sendFile(path.join(__dirname, routing[req.originalUrl]));
  });
}

// Socket.io connection
io.on('connection', function(socket) {
  console.log('Client connected');

  // Relay all received messages
  socket.on('chat message', function(msg) {
    msg.nickname = (msg.nickname && msg.nickname !== '') ? msg.nickname : 'Unnamed';
    console.log(`Received message: "${msg.message}" from "${msg.nickname}"`);
    io.sockets.emit('chat message', {
      dyno: DYNO_NAME,
      time:  moment().format('LTS'),
      nick: msg.nickname,
      message: msg.message
    });
  });
});

// Start server
server.listen(PORT).on('listening', function() {
  console.log(`Server listening on port ${PORT}.`);
  console.log(`Open up http://localhost:${PORT}/ in your browser.`);
});