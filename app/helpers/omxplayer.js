const omxmanager = require('omx-manager');

function omxplayer() {
  this.playerManager = new omxmanager();
  this.playing = false;
}

omxplayer.prototype.play = function(url) {
  this.player = null;
  this.player = this.playerManager.create(url);
  this.player.play();
  this.playing = true;
}

omxplayer.prototype.stop = function() {
  this.player = null;
  this.playing = false;
}

omxplayer.prototype.isPlaying = function() {
  return this.playing;
}

module.exports = omxplayer;
