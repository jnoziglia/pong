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
var io = require('socket.io')(server);
io.on('connection', function (socket) {
 // 
  socket.on('player1_position_update', function (data) {
    console.log(data);
    console.log('llego server');
    socket.broadcast.emit('player1_position_updated', { player1_position_updated: data.player1_position_update });
  });
});