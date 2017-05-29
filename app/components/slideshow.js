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
  this.playing = false;

  // Create slideshowGroup
  this.group = this.app.createGroup();
  this.group.w(this.app.w());
  this.group.h(this.app.h());
  this.group.x(0);
  this.group.y(0);
  this.group.opacity(0);
}

slideshowComponent.prototype.play = function() {
  if (this.slideshowTimer) {
    clearInterval(this.slideshowTimer);
  }

  if (!this.playing) {
    this.playing = true;
    // Create first pictures for slideshow
    const picture1 = pictureComponent(this.app, this.slideshow.next());

    this.group.add(picture1);

    this.group.opacity.anim().from(0).to(1).dur(250).start();

    this.slideshowTimer = setInterval(() => {
      const picture1 = this.group.children[0];
      const picture2 = pictureComponent(this.app, this.slideshow.next());
      picture2.opacity(0);

      this.group.add(picture2);

      picture1.opacity.anim().from(1).to(0).dur(250).then(() => {
        this.group.remove(picture1);
        picture1.destroy();
      }).start();

      picture2.opacity.anim().from(0).to(1).dur(250).start();
    }, 10000);
  }
}

slideshowComponent.prototype.stop = function() {
  clearInterval(this.slideshowTimer);

  if (this.group.children.length > 0) {
    const picture = this.group.children[0];

    this.group.opacity.anim().from(1).to(0).dur(250).then(() => {
      this.group.clear();
      if (picture) {
        picture.destroy();
      }
    }).start();
  }
}

module.exports = slideshowComponent;
