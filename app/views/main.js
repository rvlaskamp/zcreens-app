/**
 *  Main view
 */

const state = require('../config/state');

const backgroundComponent = require('../components/background');
const logoComponent = require('../components/logo');
const menuComponent = require('../components/menu');

const stateHelper = require('../helpers/state');
const dimensionsHelper = require('../helpers/dimensions');

function mainView(app) {
  this.app = app;
  this.mainGroup = app.createGroup();
  this.backgroundComponent = new backgroundComponent(app);
  this.logoComponent = new logoComponent(app);
  this.state = new stateHelper();

  this.mainGroup.add(this.backgroundComponent.background);
  this.mainGroup.add(this.logoComponent.logo);
}

mainView.prototype.addMenu = function(menuItems) {
  this.state.set(state.menuLarge);
  this.logoComponent.move();
  this.menuComponent = new menuComponent(this.app, this.mainGroup, menuItems);

  this.mainGroup.add(this.menuComponent.menuGroup);

  if (process.argv[2]) {
    setTimeout(() => {
      this.state.set(state.menuSmall);
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

      if (currentState === state.menuLarge) {
        this.state.set(state.menuSmall);
        this.menuComponent.resize();
        this.backgroundComponent.resize();
        this.logoComponent.hide();
      }

      if (currentState === state.menuSmall) {
        this.menuComponent.action();
      }


      break;
    case 1:
      // UP
      if (currentState === state.menuSmall) {
        this.menuComponent.changeMenuItem('up', currentState);
      }
      break;
    case 2:
      // DOWN
      if (currentState === state.menuSmall) {
        this.menuComponent.changeMenuItem('down', currentState);
      }
      break;
    case 3:
      // LEFT
      if (currentState === state.menuLarge) {
        this.menuComponent.changeMenuItem('left', currentState);
      }

      if (currentState === state.menuSmall) {
        this.menuComponent.activateMenu();
      }
      break;
    case 4:
      // RIGHT
      if (currentState === state.menuLarge) {
        this.menuComponent.changeMenuItem('right', currentState);
      }

      if (currentState === state.menuSmall) {
        this.menuComponent.activateSubmenu();
      }
      break;
    default:
      // Default case
  }
}

module.exports = mainView;
