(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Player = Asteroids.Player = function (options) {
    this.points = 50;
    this.color = options.color || this.randomColor();
    this.game = options.game;
  };

  Player.prototype.randomColor = function () {
    var hexChars = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += hexChars[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  Player.prototype.getObjectSize = function () {
    var radius = this.points / 10;
    this.points -= Math.floor(radius / 3);
    return radius;
  };

  Player.prototype.incrementPoints = function (moonSize) {
    this.points += Math.floor(moonSize / 3);
  };
})();
