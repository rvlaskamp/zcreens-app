/**
 *  Radio component
 */
const path = require('path');

// Helpers
const omxplayerHelper = require('../helpers/omxplayer');

// Components
const slideshowComponent = require('slideshow');

function radioComponent(app, mainGroup, menuItems) {
  const slideshowPictures = [
    path.resolve(__dirname, '..', 'assets', 'images', 'radio', 'radio1.jpg')),
    path.resolve(__dirname, '..', 'assets', 'images', 'radio', 'radio2.jpg')),
    path.resolve(__dirname, '..', 'assets', 'images', 'radio', 'radio3.jpg')),
    path.resolve(__dirname, '..', 'assets', 'images', 'radio', 'radio4.jpg'))
  ];

  this.streams = [];

  menuItems.forEach((menuItem) => {
    this.streams.push(menuItem.stream);
  });

  this.app = app;
  this.slideshow = new slideshowComponent(this.app, slideshowPictures);
  this.omxplayer = new omxplayerHelper();

  this.mainGroup.insertAt(this.slideshow.group, 0);
}

radioComponent.prototype.play(index) {
  this.slideshow.play();
  this.omxplayer.play(this.streams[index]);
}

radioComponent.prototype.stop() {
  this.slideshow.stop();
  this.omxplayer.stop();
}

radioComponent.prototype.clear() {
  this.slideshow.stop();
  this.omxplayer.stop();
  this.omxplayer = null;
  this.mainGroup.remove(this.slideshow.group);
}

module.exports = radioComponent;
