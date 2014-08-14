(function () {
  if (typeof Hanoi === "undefined") {
    window.Hanoi = {};
  }

  var Game = Hanoi.Game = function (size) {
    this.towers = [[], [], []];
    for (var i = size; i > 0; i--) {
      this.towers[0].push(i);
    }
  };

  Game.prototype.isWon = function () {
    // move all the discs to the last tower
    return (this.towers[0].length == 0) &&
          (this.towers[1].length == 0 || this.towers[2].length == 0);
  };

  Game.prototype.isValidMove = function (startTowerIdx, endTowerIdx) {
    var startTower = this.towers[startTowerIdx];
    var endTower = this.towers[endTowerIdx];

    if (startTower.length === 0) {
      return false;
    } else if (endTower.length == 0) {
      return true;
    } else {
      var topStartDisc = startTower[startTower.length - 1];
      var topEndDisc = endTower[endTower.length - 1];
      return topStartDisc < topEndDisc;
    }
  };

  Game.prototype.move = function (startTowerIdx, endTowerIdx) {
    console.log("start--> ", startTowerIdx, " | end-->", endTowerIdx);
    if (!this.isValidMove(startTowerIdx, endTowerIdx)) {
      return false;
    }
    this.towers[endTowerIdx].push(this.towers[startTowerIdx].pop());
    return true;
  };

})();
