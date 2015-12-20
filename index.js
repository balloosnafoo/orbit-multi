var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(path.join(__dirname, 'static')));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

var liveMoons = {};
var nextMoonId = 0;
var livePlayers = 0;

io.on('connection', function (socket) {
  livePlayers++;

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

  socket.on('disconnect', function () {
    livePlayers--;
    if (livePlayers <= 0) {
      liveMoons = {};
      nextMoonId = 0;
    }
  });

  io.to(socket.id).emit('setup space', liveMoons);
});

http.listen(app.get('port'), function(){
  console.log('listening on ' + app.get('port'));
});
