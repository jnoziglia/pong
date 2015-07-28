var express = require("express"),
    app = express();

var router = express.Router();

router.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

router.get('/phaser.js', function(req, res) {
	res.sendFile(__dirname + '/phaser.js');
});

app.use('/', router);

var server = require('http').Server(app);

server.listen(8080, function() {
  console.log("Node server running on http://localhost:8000");
});
var sio = require('socket.io');
var io = sio.listen(server);
var players;
io.on('connection', function (socket) {
 //
 //players++;

  socket.on('player_moved', function (data) {
  
    socket.broadcast.emit('player2_position', { move: data.move, position:-200});
    socket.emit('player1_position', { move: data.move, position:-200});
    console.log(socket);
  });

  socket.on('player_stopped', function (data) {
  
    socket.broadcast.emit('player2_stopped', { move: data.move, position:0});
    socket.emit('player1_stopped', { move: data.move, position:0});
    console.log(socket);
  });
});


