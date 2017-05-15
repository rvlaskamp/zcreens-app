const omxmanager = require('omx-manager');

function omxplayer() {
  this.playerManager = new omxmanager();
}

omxplayer.prototype.play = function(url) {
  this.player = this.playerManager.create(url);
  this.player.play();
}

module.exports = omxplayer;
