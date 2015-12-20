(function() {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Asteroid = Asteroids.Asteroid = function (options) {
    options.pos = options.pos || options.game.randomPosition();
    options.vel = options.vel || Asteroids.Util.randomVec(1);
    options.color = options.color || Asteroid.COLOR;
    options.image = options.image;
    options.radius = options.radius || Asteroid.randomSize();

    Asteroids.MovingObject.call(this, options);
  };

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

  Asteroid.COLOR = "#fff";

  Asteroid.randomSize = function () {
    return Math.floor( ((Math.random() * 1.5) + 1) * 10 );
  };

  Asteroid.prototype.receivePull = function (vector) {
    this.pullVectors = this.pullVectors.concat([vector]);
  };

  Asteroid.prototype.dup = function () {
    var options = {
      pos: [this.pos[0], this.pos[1]],
      vel: [this.vel[0], this.vel[1]],
      image: this.image,
      radius: this.radius
    };

    return new Asteroid(options);
  };

})();
