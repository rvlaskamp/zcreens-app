/**
 *  Signage component
 */
const path = require('path');

const slideshowComponent = require('slideshow');
const pictureComponent = require('./picture');

function signageComponent(app, menuGroup, menuItems) {
  this.app = app;
  this.menuGroup = menuGroup;
  this.scenes = [];
  this.activeScene = 0;
  this.group = app.createGroup();
  this.group.w(app.w());
  this.group.h(app.h());

  this.menuGroup.insertAt(this.group, 0);

  // Create signage scenes
  menuItems.forEach((menuItem) => {
    let scene = {};
    if (menuItem.type === 'picture') {
      let src = '';
      // Check if src is local or remote
      if (menuItem.srcLocal) {
        src = path.resolve(__dirname, '..', 'assets', 'images', 'signage', menuItem.srcLocal);
      }

      scene = pictureComponent(this.app, src);
    }

    this.scenes.push(scene);
  });
}

signageComponent.prototype.play = function(index) {
  if (this.activeScene !== index) {
    // Get scene
    const scene = this.scenes[index];
    scene.opacity(0);

    // Check if group has a scene
    if (this.group.children > 0) {
      const currentChild = this.group.children[0];
      this.group.add(scene);

      scene.opacity.anim().from(0).to(1).dur(250).then(() {
        this.group.remove(currentChild);
      }).start();
    } else {
      this.group.add(scene);
      scene.opacity.anim().from(0).to(1).dur(250).start();
    }
  }
}

signageComponent.prototype.stop = function() {
  if (this.group.children > 0) {
    const currentChild = this.group.children[0];

    currentChild.opacity.anim().from(1).to(0).dur(250).then(() {
      this.group.remove(currentChild);
    }).start();
  }
}

signageComponent.prototype.clear = function() {
  if (this.group.children > 0) {
    const currentChild = this.group.children[0];

    currentChild.opacity.anim().from(1).to(0).dur(250).then(() {
      this.group.remove(currentChild);
      this.mainGroup.remove(this.group);
    }).start();
  }
}

module.exports = signageComponent;
