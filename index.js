var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

app.use(express.static(path.join(__dirname, 'static')));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

var liveMoons = {};
var nextMoonId = 0;

io.on('connection', function (socket) {
  socket.on('new moon', function(data){
    data.id = nextMoonId++;
    io.emit('new moon', data);
    liveMoons[data.id] = data;
  });

  socket.on('collision', function (ids) {
    for(var i = 0; i < ids.length; i++) {
      delete liveMoons[ids[i]];
    }
  });

  socket.on('update-moons', function (data) {
    var moons = data.moons;
    for (var i = 0; i < moons.length; i++) {
      liveMoons[moons[i].id].pos = moons[i].pos;
      liveMoons[moons[i].id].vel = moons[i].vel;
    }
    io.emit('update space', liveMoons);
  });

  io.to(socket.id).emit('setup space', liveMoons);
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
