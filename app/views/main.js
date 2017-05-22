/**
 *  Main view
 */

const state = require('../config/state');
const colors = require('../config/colors');

const logoComponent = require('../components/logo');
const menuComponent = require('../components/menu');

const stateHelper = require('../helpers/state');
const dimensionsHelper = require('../helpers/dimensions');

function mainView(app) {
  this.app = app;
  this.state = null;

  // Create main Group
  this.mainGroup = app.createGroup();

  // Create background Rect
  this.background = app.createRect();
  this.background.w.bindTo(app.w);
  this.background.h.bindTo(app.h);
  this.background.fill(colors.background);
  this.background.opacity(1);

  // Create logo Component
  this.logoComponent = new logoComponent(app);

  // Add background and logo to mainGroup
  this.mainGroup.add(this.background);
  this.mainGroup.add(this.logoComponent.logo);
}

mainView.prototype.addMenu = function(menuItems) {
  this.state = state.menuLarge;
  this.logoComponent.move();

  console.log(menuItems);

  this.menuComponent = new menuComponent(this.app, this.mainGroup, menuItems);
  this.mainGroup.add(this.menuComponent.menuGroup);
}

mainView.prototype.remotePressed = function(key) {
  const currentState = this.state;

  switch(key) {
    case 0:
      // OK Button
      if (currentState === state.menuLarge) {
        this.state = state.menuSmall;

        // Resize background to 10% from App width
        this.background.w.anim().from(this.background.w()).to(dimensionsHelper.calcWidth(this.app.w(), 10)).dur(1000).start();
        this.background.opacity.anim().from(1).to(0.95).start();

        this.menuComponent.resize();
        this.logoComponent.hide();
      }

      if (currentState === state.menuSmall) {
        this.menuComponent.action('ok');
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
    case 68:
      // PLAY
      if (currentState === state.menuSmall) {
        this.menuComponent.action('play');
      }
      break;
    case 69:
      // Stop
      if (currentState === state.menuSmall) {
        this.menuComponent.action('stop');
      }
      break;
    default:
      // Default case
  }
}

module.exports = mainView;
