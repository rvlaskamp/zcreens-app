/**
 *  Main view
 */

const backgroundComponent = require('../components/background');
const logoComponent = require('../components/logo');
const menuComponent = require('../components/menu');

function mainView(app) {
  this.app = app;
  this.mainGroup = app.createGroup();
  this.backgroundComponent = new backgroundComponent(app);
  this.logoComponent = new logoComponent(app);

  this.mainGroup.add(this.backgroundComponent.background);
  this.mainGroup.add(this.logoComponent.logo);
}

mainView.prototype.addMenu = function(menuItems) {
  this.logoComponent.move();
  this.menuComponent = new menuComponent(this.app, menuItems);

  this.mainGroup.add(this.menuComponent.menuGroup);
}

mainView.prototype.remotePressed = function(key) {
  switch(key) {
    case 0:
      // OK Button
      break;
    case 1:
      // UP
      break;
    case 2:
      // DOWN
      break;
    case 3:
      // LEFT
      this.menuComponent.changeMenuItem('left');
      break;
    case 4:
      // RIGHT
      this.menuComponent.changeMenuItem('right');
      break;
    default:
      // Default case
  }
}

module.exports = mainView;
