/**
 *  Menu component
 */

const colors = require('../config/colors');
const state = require('../config/state');

const submenuComponent = require('../components/submenu');
const menuItemComponent = require('./menu-item');

const stateHelper = require('../helpers/state');
const dimensionsHelper = require('../helpers/dimensions');

function menuComponent(app, mainGroup, menuItems) {
  const width = menuItems.length * 300;

  this.activeMenuItem = 0;
  this.playingMenuItem = null;
  this.menuHideTimer = 0;
  this.isHidden = false;
  this.app = app;
  this.menuItems = menuItems;
  this.mainGroup = mainGroup;
  this.menuGroup = app.createGroup();
  this.submenuGroup = app.createGroup();
  this.state = new stateHelper();
  this.state.set(state.menuActive);
  this.menuSmall = false;

  // Create submenu
  this.mainGroup.insertAt(this.submenuGroup, 0);

  this.menu = [];
  this.submenus = [];
  this.menuGroup.opacity(0);
  this.menuGroup.w(width);
  this.menuGroup.h(200);

  this.menuGroup.x(dimensionsHelper.getCenterX(this.app.w(), width));
  this.menuGroup.y(dimensionsHelper.getCenterY(this.app.h(), this.menuGroup.h()));

  this.menuItems.forEach((menuItem, index) => {
    const options = {
      x: (300 * index),
      y: 0,
      selected: false
    };

    if (index === 0) {
      options.selected = true;
    }

    // Create menu item
    const item = new menuItemComponent(app, menuItem.title, menuItem.icon, options);
    // Create submenu
    const submenu = new submenuComponent(this.app, this.mainGroup, menuItem.type, menuItem.submenu);

    this.menuGroup.add(item.menuItemGroup);
    this.submenuGroup.add(submenu.menuGroup);

    this.menu.push(item);
    this.submenus.push(submenu);

    this.menuGroup.opacity.anim().from(0).to(1).delay(500).dur(500).start();
  });

}

menuComponent.prototype.resize = function() {
  this.state.set(state.menuActive);
  this.menuContainerActive = true;
  this.menuSmall = true;

  const menuItemHeight = 120;
  const menuHeight = this.menu.length * menuItemHeight;
  const menuY = dimensionsHelper.getCenterY(this.app.h(), menuHeight);

  this.menuGroup.w.anim().from(this.menuGroup.w()).to(87).dur(500).start();
  this.menuGroup.x.anim().from(this.menuGroup.x()).to(-25).dur(500).start();
  this.menuGroup.y.anim().from(this.menuGroup.y()).to(menuY).dur(500).start();
  this.menu.forEach((menuItem, index) => {
    const delay = (index * 150);
    const menuItemY = (index * menuItemHeight);
    menuItem.resize(delay, menuItemY);
  });

  this.submenus[this.activeMenuItem].show();
  this.submenus[this.activeMenuItem].activate();
  this.menu[this.activeMenuItem].active(this.menuSmall);
  this.state.set(state.submenuActive);
}

menuComponent.prototype.changeMenuItem = function(direction) {
  const currentMenuItem = this.activeMenuItem;
  const currentState = this.state.get();

  switch (direction) {
    case 'up':
      if (currentState === state.menuActive) {
        if (this.menuItems.length > 1) {

          if (this.activeMenuItem === 0) {
            this.activeMenuItem = this.menu.length - 1;
          } else {
            this.activeMenuItem = this.activeMenuItem - 1;
          }

          this.menu[this.activeMenuItem].activate(this.menuSmall);
          this.menu[currentMenuItem].deactivate(this.menuSmall);

        }
      }

      if (currentState === state.submenuActive) {
        this.submenus[this.activeMenuItem].moveUp();
      }
      break;
    case 'right':
      if (currentState === state.menuActive) {
        if (this.menuItems.length > 1) {

          if (this.menuSmall) {
            this.submenus[this.activeMenuItem].hide();
          }

          if (this.activeMenuItem === (this.menu.length - 1)) {
            this.activeMenuItem = 0;
          } else {
            this.activeMenuItem = this.activeMenuItem + 1;
          }

          this.menu[this.activeMenuItem].activate(this.menuSmall);
          this.menu[currentMenuItem].deactivate(this.menuSmall);

          if (this.menuSmall) {
            this.submenus[this.activeMenuItem].show();
          }
        }
      }
      break;
    case 'down':
      if (currentState === state.menuActive) {
        if (this.menuItems.length > 1) {
          if (this.activeMenuItem === (this.menu.length - 1)) {
            this.activeMenuItem = 0;
          } else {
            this.activeMenuItem = this.activeMenuItem + 1;
          }

          this.menu[this.activeMenuItem].activate(this.menuSmall);
          this.menu[currentMenuItem].deactivate(this.menuSmall);

          if (this.menuSmall) {
             // this.submenus[this.activeMenuItem].update(this.menuItems[this.activeMenuItem].submenu);
          }
        }
      }

      if (currentState === state.submenuActive) {
        this.submenus[this.activeMenuItem].moveDown();
      }

      break;
    case 'left':
      if (currentState === state.menuActive) {
        if (this.menuItems.length > 1) {

          if (this.menuSmall) {
            this.submenus[this.activeMenuItem].hide();
          }

          if (this.activeMenuItem === 0) {
            this.activeMenuItem = this.menu.length - 1;
          } else {
            this.activeMenuItem = this.activeMenuItem - 1;
          }

          this.menu[this.activeMenuItem].activate(this.menuSmall);
          this.menu[currentMenuItem].deactivate(this.menuSmall);

          if (this.menuSmall) {
            this.submenus[this.activeMenuItem].show();
          }
        }
      }
      break;
  }
}

menuComponent.prototype.activateMenu = function() {
  const currentState = this.state.get();

  if (currentState !== state.menuActive) {
    this.state.set(state.menuActive);
    this.menu[this.activeMenuItem].activate(this.menuSmall);
    this.submenus[this.activeMenuItem].hide(this.menuSmall);
  }
}

menuComponent.prototype.activateSubmenu = function() {
  const currentState = this.state.get();

  if (currentState !== state.submenuActive) {
    this.state.set(state.submenuActive);
    this.menu[this.activeMenuItem].active();
    this.submenus[this.activeMenuItem].show(this.menuSmall);
  }
}

menuComponent.prototype.hide = function() {
  clearTimeout(this.menuHideTimer);
  this.submenus[this.activeMenuItem].hide(this.menuSmall);
  this.menuGroup.x.anim().from(this.menuGroup.x()).to(-(dimensionsHelper.calcWidth(this.app.w(), 10))).delay(250).dur(250).start();
  this.isHidden = true;
}

menuComponent.prototype.setHideTimer = function() {
  clearTimeout(this.menuHideTimer);

  // Set timer
  this.menuHideTimer = setTimeout(() => {
    this.submenus[this.activeMenuItem].hide(this.menuSmall);
    this.mainGroup.x.anim().from(this.mainGroup.x()).to(-(dimensionsHelper.calcWidth(this.app.w(), 10))).delay(250).dur(250).start();
    this.isHidden = true;
  }, 5000);
}

menuComponent.prototype.getHidden = function() {
  return this.isHidden;
}

menuComponent.prototype.getActiveMenu = function() {
  return this.state.get();
}

menuComponent.prototype.show = function() {
  clearTimeout(this.menuHideTimer);
  this.menu[this.activeMenuItem].active();
  this.submenus[this.activeMenuItem].show();
  this.menuGroup.x.anim().from(this.menuGroup.x()).to(0).dur(250).start();
  this.isHidden = false;
  this.state.set(state.submenuActive);


  // Set timer
  this.menuHideTimer = setTimeout(() => {
    this.submenus[this.activeMenuItem].hide(this.menuSmall);
    this.mainGroup.x.anim().from(this.mainGroup.x()).to(-(dimensionsHelper.calcWidth(this.app.w(), 10))).delay(250).dur(250).start();
    this.isHidden = true;
  }, 5000);
}

menuComponent.prototype.action = function(action) {
  const currentState = this.state.get();

  switch (action) {
    case 'ok':
      if (currentState === state.menuActive) {
        this.state.set(state.submenuActive);
        this.menu[this.activeMenuItem].active();
        this.submenus[this.activeMenuItem].show();
      }

      if (currentState === state.submenuActive) {
        if (this.playingMenuItem && this.playingMenuItem !== this.activeMenuItem) {
          this.submenus[this.playingMenuItem].clear();
        }

        this.playingMenuItem = this.activeMenuItem;
        this.submenus[this.playingMenuItem].play();
      }
      break;
    case 'play':
      if (currentState === state.submenuActive) {
        this.playingMenuItem = this.activeMenuItem;
        this.submenus[this.playingMenuItem].play();
      }
    case 'stop':
      if (currentState === state.submenuActive) {
        this.submenus[this.playingMenuItem].stop();
      }
  }
}

module.exports = menuComponent;
