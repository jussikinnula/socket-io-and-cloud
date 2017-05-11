var PORT = process.env.PORT || 5000;
var DYNO_NAME = process.env.PS || process.env.DYNO || `local-${PORT}`;

var path = require('path');
var moment = require('moment');
var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

// Static assets
var routing = {
  '/socket.io.js': './node_modules/socket.io-client/dist/socket.io.js',
  '/socket.io.js.map': './node_modules/socket.io-client/dist/socket.io.js.map',
  '/jquery.min.js': './node_modules/jquery/dist/jquery.min.js',
  '/styles.css': './styles.css',
  '/client.js': './client.js'
};

// Router
app.get('*', function(req, res) {
  if (routing[req.originalUrl]) {
    // Send the correct file if the routing has been set
    res.sendFile(path.join(__dirname, routing[req.originalUrl]));
  } else {
    // Otherwise serve the SPA
    res.sendFile(path.join(__dirname, './index.html'));
  }
});

// On Socket.io connection
io.on('connection', function(socket) {
  console.log('Client connected');

  // Relay all received messages
  socket.on('chat message', function(msg) {
    console.log(`Received message: "${msg}"`);
    var time = moment().toISOString();
    socket.emit('chat message', `${DYNO_NAME} ${time} ${msg}`);
  });
});

// Start server
server.listen(PORT).on('listening', function() {
  console.log(`Server listening on port ${PORT}.`);
  console.log(`Open up http://localhost:${PORT}/ in your browser.`);
});