(function () {
  if (typeof Hanoi === "undefined") {
    window.Hanoi = {};
  };

  var TowerUI = Hanoi.TowerUI = function (game) {
    this.game = game;
    this.firstPile = null;
    this.render();
  };

  TowerUI.prototype.render = function () {
    for (var i = 0; i < 3; i++) {
      console.log("i-->", i);
      var ul = $("#tower" + (i + 1));
      console.log("towers[", i, "]--> ", this.game.towers[i]);
      for (var j = this.game.towers[i].length - 1; j > -1; j--) {
        console.log("j-->", j);
        var str = "<li id=" + (this.game.towers[i][j]);
        str += " class='piece'";
        str += " style='width:" + (this.game.towers[i][j] + 1) * 14;
        str += "px;'></li>";
        ul.append(str);
      }
    }
  };

  TowerUI.prototype.reset = function (game) {
    this.game = game;
    this.firstPile = null;
    $(".piece").remove();
    $(".won_label").removeClass("won");
    this.render();
  }

  String.prototype.last = function() {
    return this[this.length-1];
  }

  TowerUI.prototype.onClick = function (event) {
    if (this.game.isWon()) {
      return;
    } else if (this.firstPile != null) {
      console.log("moving to: ", event.currentTarget.id);
      this.game.move(this.firstPile, parseInt(event.currentTarget.id.last()) - 1);
      this.firstPile = null;
      $(".piece").remove();
      this.render();
    } else {
      console.log("moving from: ", event.currentTarget.id);
      this.firstPile = parseInt(event.currentTarget.id.last()) - 1;
      var selected_id = this.game.towers[this.firstPile][this.game.towers[this.firstPile].length - 1];
      $("#" + selected_id).addClass("selected_piece");
    }
    if (this.game.isWon()) {
      $(".won_label").addClass("won");
    }
  };


})();