/**
 *  Slideshow component
 */

// Helpers
const circularBuffer = require('../helpers/circularBuffer');

// External components
const pictureComponent = require('./picture');

const slideshowComponent = function(app, images) {
  this.app = app;
  this.slideshow = new circularBuffer(images);
  this.slideshowTimer = null;
  this.pictureIndex = 1;

  // Create slideshowGroup
  this.group = this.app.createGroup();
  this.group.w(this.app.w());
  this.group.h(this.app.h());
  this.group.x(0);
  this.group.y(0);
  this.group.opacity(0);
}

slideshowComponent.prototype.play = function() {
  // Create first pictures for slideshow
  const picture1 = pictureComponent(this.app, this.slideshow.next());
  const picture2 = pictureComponent(this.app, this.slideshow.next());

  this.group.add(picture2);
  this.group.add(picture1);

  this.group.opacity.anim().from(0).to(1).dur(250).start();

  this.slideshowTimer = setInterval(() => {
    this.group.children[this.pictureIndex].opacity.anim().from(1).to(0).dur(250).then(() => {
      console.log('slideshow next image',this.slideshow.next());
      this.group.children[this.pictureIndex].src(this.slideshow.next());
      this.pictureIndex = 0;
    }).start();
  }, 5000);
}

slideshowComponent.prototype.stop = function() {
  clearInterval(this.slideshowTimer);

  this.group.opacity.anim().from(1).to(0).dur(250).then(() => {
    this.group.clear();
  }).start();
}

module.exports = slideshowComponent;
