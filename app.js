var express = require("express"),
    app = express();

var router = express.Router();
const http = require('http');
const server = http.createServer(app);
var { Server } = require('socket.io');
var io = new Server(server);

var contador = 0;

router.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

router.get('/phaser.js', function(req, res) {
	res.sendFile(__dirname + '/phaser.js');
});

app.use('/', router);

server.listen(8010, function() {
  console.log("Node server running on http://localhost:8000");
});

var players;
io.on('connection', function (socket) {
 //
  contador++;
  console.log(contador);
  if (contador == 1) {
    socket.emit('jugador', { pos: 1 });
  }
  if (contador == 2) {
    socket.emit('jugador', { pos: 2 });
    socket.emit('empieza_bola');
  }
    

  socket.on('player_moved', function (data) {
    socket.broadcast.emit('player2_position', { position: data.position });
    //console.log(data.position);
  });

  socket.on('player_stopped', function (data) {
    //console.log('freno');
    //console.log(data.position);
  
    socket.broadcast.emit('player2_stopped', { move: data.move, position:0});
    });

  socket.on('ball_position_update', function (data) {
    socket.broadcast.emit('ball_position_updated', { positionY: data.positionY, positionX: data.positionX, speedX: data.speedX, speedY: data.speedY });
  });

  socket.on('muevo_bola', function (data) {
    socket.broadcast.emit('ball_position_updated', { positionY: data.positionY, positionX: data.positionX });
    
  });

  socket.on('disconnect', function() {
    contador--;
  });
});


