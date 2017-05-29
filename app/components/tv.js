/**
 *  TV component
 */
const path = require('path');

// Helpers
const omxplayerHelper = require('../helpers/omxplayer');

function tvComponent(app, mainGroup, menuItems) {

  this.streams = [];

  menuItems.forEach((menuItem) => {
    this.streams.push(menuItem.stream);
  });

  this.app = app;
  this.omxplayer = new omxplayerHelper();
}

tvComponent.prototype.play(index) {
  this.omxplayer.play(this.streams[index], 'tv');
}

tvComponent.prototype.stop() {
  this.omxplayer.stop();
}

tvComponent.prototype.clear() {
  this.omxplayer.stop();
  this.omxplayer = null;
}

module.exports = tvComponent;
