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

  this.menuHideTimer = 0;

  // Create main Group
  this.mainGroup = app.createGroup();

  // Create background Rect
  this.background = app.createRect();
  this.background.w.bindTo(app.w);
  this.background.h.bindTo(app.h);
  this.background.fill(colors.background);
  this.background.opacity(1);
  this.background.id('background');

  // Create logo Component
  this.logoComponent = new logoComponent(app);

  // Add background and logo to mainGroup
  this.mainGroup.add(this.background);
  this.mainGroup.add(this.logoComponent.logo);
}

mainView.prototype.addMenu = function(menuItems) {
  this.state = state.menuLarge;
  this.logoComponent.move();
  this.menuComponent = new menuComponent(this.app, this.mainGroup, menuItems);
  this.mainGroup.add(this.menuComponent.menuGroup);
}

mainView.prototype.remotePressed = function(key) {
  const currentState = this.state;
  const menuComponent = this.menuComponent;

  switch(key) {
    case 0:
      // OK Button
      if (currentState === state.menuLarge) {
        this.state = state.menuSmall;

        // Resize background to 10% from App width
        this.background.w.anim().from(this.background.w()).to(dimensionsHelper.calcWidth(this.app.w(), 10)).dur(1000).start();
        this.menuComponent.resize();
        this.menuComponent.setHideTimer();
        this.logoComponent.hide();
      }

      if (currentState === state.menuSmall) {

        if (this.menuComponent.getHidden()) {
          this.menuComponent.show();
        } else {
          this.menuComponent.action('ok');
          this.menuComponent.setHideTimer();
        }
      }

      break;
    case 1:
      // UP
      if (currentState === state.menuSmall) {
        this.menuComponent.changeMenuItem('up', currentState);
        this.menuComponent.setHideTimer();
      }
      break;
    case 2:
      // DOWN
      if (currentState === state.menuSmall) {
        this.menuComponent.changeMenuItem('down', currentState);
        this.menuComponent.setHideTimer();
      }
      break;
    case 3:
      // LEFT
      if (currentState === state.menuLarge) {
        this.menuComponent.changeMenuItem('left', currentState);
        this.menuComponent.setHideTimer();
      }

      if (currentState === state.menuSmall) {
        if (!this.menuComponent.getHidden() && this.menuComponent.getActiveMenu() === state.menuActive) {
          this.menuComponent.hide();
        } else {
          this.menuComponent.activateMenu();
          this.menuComponent.setHideTimer();
        }
      }
      break;
    case 4:
      // RIGHT
      if (currentState === state.menuLarge) {
        this.menuComponent.changeMenuItem('right', currentState);
        this.menuComponent.setHideTimer();
      }

      if (currentState === state.menuSmall) {
        if (this.menuComponent.getHidden()) {
          this.menuComponent.show();
        } else {
          this.menuComponent.activateSubmenu();
          this.menuComponent.setHideTimer();
        }
      }
      break;
    case 68:
      // PLAY
      if (currentState === state.menuSmall) {
        this.menuComponent.action('play');
        this.menuComponent.setHideTimer();
      }
      break;
    case 69:
      // Stop
      if (currentState === state.menuSmall) {
        this.menuComponent.action('stop');
        this.menuComponent.setHideTimer();
      }
      break;
    default:
      // Default case
      this.menuComponent.setHideTimer();
  }
}

module.exports = mainView;
