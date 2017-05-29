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

  // Create slideshowGroup
  this.group = this.app.createGroup();
  this.group.w(this.app.w());
  this.group.h(this.app.h());
  this.group.x(0);
  this.group.y(0);
  this.group.opacity(0);
}

slideshowComponent.prototype.play() {
  // Create first pictures for slideshow
  const picture1 = pictureComponent(app, this.slideshow.next());

  this.group.add(picture1);

  this.group.opacity.anim().from(0).to(1).dur(250).start();

  this.slideshowTimer = setInterval(() => {
    const picture1 = this.group.children[0];
    const picture2 = pictureComponent(app, this.slideshow.next());

    this.group.insertAt(picture2, 0);

    picture1.opacity.anim().from(1).to(0).dur(250).then(() => {
      this.group.remove(picture1);
    }).start();
  }, 5000);
}

slideshowComponent.prototype.stop() {
  clearInterval(this.slideshowTimer);

  this.group.opacity.anim().from(1).to(0).dur(250).then(() => {
    this.group.clear();
  }).start();
}

module.exports = slideshowComponent;
