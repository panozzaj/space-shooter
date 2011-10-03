(function() {
  var bullets, canvas, context, score, ship, targets;
  canvas = null;
  context = null;
  ship = null;
  bullets = [];
  targets = [];
  score = 0;
  $(function() {
    var clearCanvas, drawBullets, drawStats, drawTargets, gameLoop, generateTarget, init, updateBullets, updateTargets;
    init = function() {
      canvas = $("#canvas");
      context = canvas.get(0).getContext("2d");
      ship = new Ship(canvas);
      $(document).keydown(ship.handleKeys({
        down: true
      }));
      $(document).keyup(ship.handleKeys({
        down: false
      }));
      return setInterval(gameLoop, 17);
    };
    gameLoop = function() {
      updateBullets();
      updateTargets();
      ship.update();
      generateTarget();
      clearCanvas();
      ship.draw();
      drawBullets(bullets);
      drawTargets(targets);
      return drawStats();
    };
    updateTargets = function() {
      var target, _i, _len;
      for (_i = 0, _len = targets.length; _i < _len; _i++) {
        target = targets[_i];
        if (target.expired) {
          score += 100;
        }
        if (Math.random() < 0.01) {
          bullets.push({
            width: 4,
            height: 4,
            x: target.x + target.width / 2 - 2,
            y: target.y + target.height + 1,
            velocity: 4,
            owner: target
          });
        }
      }
      return targets = (function() {
        var _j, _len2, _results;
        _results = [];
        for (_j = 0, _len2 = targets.length; _j < _len2; _j++) {
          target = targets[_j];
          if (!target.expired) {
            _results.push(target);
          }
        }
        return _results;
      })();
    };
    updateBullets = function() {
      var bullet, target, _i, _j, _len, _len2;
      for (_i = 0, _len = bullets.length; _i < _len; _i++) {
        bullet = bullets[_i];
        bullet.y += bullet.velocity;
        if (bullet.y <= 0) {
          bullet.expired = true;
        }
        for (_j = 0, _len2 = targets.length; _j < _len2; _j++) {
          target = targets[_j];
          if (bullet.y < target.y + target.height && bullet.y > target.y && bullet.x < target.x + target.width && bullet.x > target.x) {
            target.expired = true;
            bullet.expired = true;
          }
          if (bullet.y < ship.y + ship.height && bullet.y > ship.y && bullet.x < ship.x + ship.width && bullet.x > ship.x && ship.isAlive()) {
            if (!ship.invincible) {
              ship.expired = true;
            }
            bullet.expired = true;
          }
        }
      }
      return bullets = (function() {
        var _k, _len3, _results;
        _results = [];
        for (_k = 0, _len3 = bullets.length; _k < _len3; _k++) {
          bullet = bullets[_k];
          if (!bullet.expired) {
            _results.push(bullet);
          }
        }
        return _results;
      })();
    };
    generateTarget = function() {
      var targetWidth;
      if (Math.random() < 0.01) {
        targetWidth = 30;
        return targets.push({
          width: targetWidth,
          height: 30,
          x: Math.random() * (canvas.width() - targetWidth),
          y: 30
        });
      }
    };
    clearCanvas = function() {
      return context.clearRect(0, 0, canvas.width(), canvas.height());
    };
    drawBullets = function(bullets) {
      var bullet, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = bullets.length; _i < _len; _i++) {
        bullet = bullets[_i];
        _results.push(canvas.get(0).getContext("2d").fillRect(bullet.x, bullet.y, bullet.width, bullet.height));
      }
      return _results;
    };
    drawTargets = function(targets) {
      var target, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = targets.length; _i < _len; _i++) {
        target = targets[_i];
        _results.push(canvas.get(0).getContext("2d").fillRect(target.x, target.y, target.width, target.height));
      }
      return _results;
    };
    drawStats = function() {
      $('#score').text(score);
      return $('#lives').text(ship.lives);
    };
    return init();
  });
}).call(this);
