/**
 *  Main view
 */

const backgroundComponent = require('../components/background');
const logoComponent = require('../components/logo');
const menuComponent = require('../components/menu');
const state = require('../helpers/state');

function mainView(app) {
  this.app = app;
  this.mainGroup = app.createGroup();
  this.backgroundComponent = new backgroundComponent(app);
  this.logoComponent = new logoComponent(app);
  this.state = new state();

  this.mainGroup.add(this.backgroundComponent.background);
  this.mainGroup.add(this.logoComponent.logo);
}

mainView.prototype.addMenu = function(menuItems) {
  this.state.set('menuLargeActive');
  this.logoComponent.move();
  this.menuComponent = new menuComponent(this.app, menuItems);

  this.mainGroup.add(this.menuComponent.menuGroup);

  if (process.argv[2]) {
    setTimeout(() => {
      this.state.set('menuSmallActive');
      this.menuComponent.resize();
      this.backgroundComponent.resize();
      this.logoComponent.hide();
    }, 2000);
  }
}

mainView.prototype.remotePressed = function(key) {
  switch(key) {
    case 0:
      // OK Button
      this.state.set('menuSmallActive');
      this.menuComponent.resize();
      this.backgroundComponent.resize();
      this.logoComponent.hide();
      break;
    case 1:
      // UP
      this.menuComponent.changeMenuItem('up', this.state.get());
      break;
    case 2:
      // DOWN
      this.menuComponent.changeMenuItem('down', this.state.get());
      break;
    case 3:
      // LEFT
      this.menuComponent.changeMenuItem('left', this.state.get());
      break;
    case 4:
      // RIGHT
      this.menuComponent.changeMenuItem('right', this.state.get());
      break;
    default:
      // Default case
  }
}

module.exports = mainView;
