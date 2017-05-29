/**
 *  Signage component
 */
const path = require('path');

const slideshowComponent = require('./slideshow');
const pictureComponent = require('./picture');

function signageComponent(app, mainGroup, menuItems) {
  this.app = app;
  this.mainGroup = mainGroup;
  this.menuItems = menuItems;
  this.scenes = [];
  this.activeScene = null;
  this.group = app.createGroup();
  this.group.w(app.w());
  this.group.h(app.h());

  this.mainGroup.insertAt(this.group, 0);

  /*
  // Create signage scenes
  menuItems.forEach((menuItem) => {
    console.log(menuItem);
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
  });*/
}

signageComponent.prototype.play = function(index) {
  console.log('signage index', index);

  if (this.activeScene !== index) {
    const sceneType = this.menuItems[index].type;
    const srcLocal = this.menuItems[index].srcLocal;

    // Create scene
    let scene = {};

    if (sceneType === 'picture') {
      let src = '';
      // Check if src is local or remote
      if (srcLocal) {
        src = path.resolve(__dirname, '..', 'assets', 'images', 'signage', srcLocal);
      }

      scene = pictureComponent(this.app, src);
      scene.opacity(0);
    }

    this.activeScene = index;

    // Check if group has a scene
    if (this.group.children.length > 0) {
      const currentChild = this.group.children[0];
      this.group.add(scene);

      scene.opacity.anim().from(0).to(1).dur(250).then(() => {
        this.group.remove(currentChild);
        currentChild.destroy();
      }).start();
    } else {
      this.group.add(scene);
      scene.opacity.anim().from(0).to(1).dur(250).start();
    }
  }
}

signageComponent.prototype.stop = function() {
  if (this.group.children.length > 0) {
    const currentChild = this.group.children[0];

    currentChild.opacity.anim().from(1).to(0).dur(250).then(() => {
      this.group.remove(currentChild);
    }).start();
  }
}

signageComponent.prototype.clear = function() {
  if (this.group.children.length > 0) {
    const currentChild = this.group.children[0];

    currentChild.opacity.anim().from(1).to(0).dur(250).then(() => {
      this.group.remove(currentChild);
      this.mainGroup.remove(this.group);
      this.group.destroy();
    }).start();
  } else {
    this.mainGroup.remove(this.group);
    this.group.destroy();
  }
}

module.exports = signageComponent;
