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
  this.menuComponent = new menuComponent(this.app, this.mainGroup, menuItems);

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
  const currentState = this.state.get();

  switch(key) {
    case 0:
      // OK Button

      if (currentState === 'menuLargeActive') {
        this.state.set('menuSmallActive');
        this.menuComponent.resize();
        this.backgroundComponent.resize();
        this.logoComponent.hide();
      }

      if (currentState === 'menuSmallActive') {

      }


      break;
    case 1:
      // UP
      if (currentState === 'menuSmallActive') {
        this.menuComponent.changeMenuItem('up', currentState);
      }
      break;
    case 2:
      // DOWN
      if (currentState === 'menuSmallActive') {
        this.menuComponent.changeMenuItem('down', currentState);
      }
      break;
    case 3:
      // LEFT
      if (currentState === 'menuLargeActive') {
        this.menuComponent.changeMenuItem('left', currentState);
      }
      break;
    case 4:
      // RIGHT
      if (currentState === 'menuLargeActive') {
        this.menuComponent.changeMenuItem('right', currentState);
      }
      break;
    default:
      // Default case
  }
}

module.exports = mainView;
