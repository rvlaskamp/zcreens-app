/**
 *  Radio component
 */
const path = require('path');

// Helpers
const omxplayerHelper = require('../helpers/omxplayer');

// Components
const slideshowComponent = require('slideshow');

function tvComponent(app, mainGroup, menuItems) {

  this.streams = [];

  menuItems.forEach((menuItem) => {
    this.streams.push(menuItem.stream);
  });

  this.app = app;
  this.omxplayer = new omxplayerHelper();
}

tvComponent.prototype.play(index) {
  this.omxplayer.play(this.streams[index]);
}

tvComponent.prototype.stop() {
  this.omxplayer.stop();
}

module.exports = tvComponent;
