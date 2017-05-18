const omxmanager = require('omx-manager');

function omxplayer() {
  this.playerManager = new omxmanager();
  this.player = null;
  this.playing = false;
}

omxplayer.prototype.play = function(url) {
  if (this.player) {
    this.player.stop();
    this.player = null;
  }

  this.player = this.playerManager.create(url);
  this.player.play();
  this.playing = true;
}

omxplayer.prototype.stop = function() {
  if (this.player && this.playing) {
    this.player.stop();
    this.player = null;
    this.playing = false;
  }
}

omxplayer.prototype.isPlaying = function() {
  return this.playing;
}

module.exports = omxplayer;
