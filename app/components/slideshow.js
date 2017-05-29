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

  this.slideshowCurrent = 0;
  this.slideshowNext = 1;

  // Create slideshowGroup
  this.group = this.app.createGroup();
  this.group.w(this.app.w());
  this.group.h(this.app.h());
  this.group.x(0);
  this.group.y(0);
  this.group.opacity(0);
}

slideshowComponent.prototype.play = function() {
  if (!this.playing) {
    if (this.slideshowTimer) {
      clearInterval(this.slideshowTimer);
    }

    this.playing = true;

    this.picture1 = pictureComponent(this.app, this.slideshow.next());
    this.imageGroup1 = this.app.createGroup();
    this.imageGroup1.w(this.app.w());
    this.imageGroup1.h(this.app.h());
    this.imageGroup1.x(0);
    this.imageGroup1.y(0);
    this.imageGroup1.opacity(1);
    this.imageGroup1.add(this.picture1);

    this.picture2 = pictureComponent(this.app, this.slideshow.next());
    this.imageGroup2 = this.app.createGroup();
    this.imageGroup2.w(this.app.w());
    this.imageGroup2.h(this.app.h());
    this.imageGroup2.x(0);
    this.imageGroup2.y(0);
    this.imageGroup2.opacity(0);
    this.imageGroup2.add(this.picture2);

    this.group.add(this.imageGroup1);
    this.group.add(this.imageGroup2);

    this.group.opacity(1);

    this.slideshowTimer = setInterval(() => {

      this.group.children[this.slideshowCurrent].opacity.anim().from(1).to(0).dur(500).start();

      this.group.children[this.slideshowNext].opacity.anim().from(0).to(1).dur(500).then(() => {
        if (this.slideshowNext === 0) {
          this.slideshowNext = 1;
          this.slideshowCurrent = 0;
        } else {
          this.slideshowNext = 0;
          this.slideshowCurrent = 1;
        }
        this.group.children[this.slideshowNext].children[0].src(this.slideshow.next());
      }).start();
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
