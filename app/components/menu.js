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
  this.activeMenuItem = 0;
  this.app = app;
  this.menuItems = menuItems;
  this.mainGroup = mainGroup;
  this.menuGroup = app.createGroup();
  this.submenuGroup = app.createGroup();
  this.state = new stateHelper();
  this.state.set(state.menuActive);
  this.menuSmall = false;

  // Create submenu
  // this.submenu = new submenuComponent(this.app);
  // this.mainGroup.add(this.submenu.menuGroup);

  const width = menuItems.length * 300;

  this.menu = [];
  this.submenus = [];
  this.menuGroup.opacity(0);
  this.menuGroup.w(width);
  this.menuGroup.h(200);

  this.menuGroup.x(dimensionsHelper.getCenterX(this.app.w(), width));
  this.menuGroup.y(dimensionsHelper.getCenterY(this.app.h(), this.menuGroup.h()));

  this.menuItems.forEach((menuItem, index) => {

    // Create submenu
    const submenu = new submenuComponent(this.app, menuItem.submenu);

    const options = {
      x: (300 * index),
      y: 0,
      active: false
    };

    if (index === 0) {
      options.active = true;
    }

    const item = new menuItemComponent(app, menuItem.title, menuItem.icon, options);

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
  this.activateSubmenu();
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

          this.menu[this.activeMenuItem].activate(state);
          this.menu[currentMenuItem].deactivate(state);
        }
      }

      if (currentState === state.submenuActive) {
        this.submenu.moveUp();
      }
      break;
    case 'right':
      if (currentState === state.menuActive) {
        if (this.menuItems.length > 1) {
          if (this.activeMenuItem === (this.menu.length - 1)) {
            this.activeMenuItem = 0;
          } else {
            this.activeMenuItem = this.activeMenuItem + 1;
          }

          this.menu[this.activeMenuItem].activate(state);
          this.menu[currentMenuItem].deactivate(state);

          if (this.menuSmall) {
            this.submenu.update(this.menuItems[this.activeMenuItem].submenu);
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

          this.menu[this.activeMenuItem].activate(state);
          this.menu[currentMenuItem].deactivate(state);

          if (this.menuSmall) {
            this.submenu.update(this.menuItems[this.activeMenuItem].submenu);
          }
        }
      }

      if (currentState === state.submenuActive) {
        this.submenu.moveDown();
      }

      break;
    case 'left':
      if (currentState === state.menuActive) {
        if (this.menuItems.length > 1) {
          if (this.activeMenuItem === 0) {
            this.activeMenuItem = this.menu.length - 1;
          } else {
            this.activeMenuItem = this.activeMenuItem - 1;
          }

          this.menu[this.activeMenuItem].activate(state);
          this.menu[currentMenuItem].deactivate(state);

          if (this.menuSmall) {
            this.submenu.update(this.menuItems[this.activeMenuItem].submenu);
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
    this.menu[this.activeMenuItem].activate();
    this.submenus[this.activeMenuItem].deactivate();
  }
}

menuComponent.prototype.activateSubmenu = function() {
  const currentState = this.state.get();

  if (currentState !== state.submenuActive) {
    this.state.set(state.submenuActive);
    this.menu[this.activeMenuItem].deactivate();
    this.submenus[this.activeMenuItem].activate();
  }
}

menuComponent.prototype.action = function(action) {
  const currentState = this.state.get();

  switch (action) {
    case 'ok':
      if (currentState === state.menuActive) {
        this.state.set(state.submenuActive);
        this.menuGroup.opacity.anim().from(this.menuGroup.opacity()).to(0.25).dur(500).start();
        this.submenu.activate();
      }

      if (currentState === state.submenuActive) {
        this.submenu.play();
      }
      break;
    case 'play':
      if (currentState === state.submenuActive) {
        this.submenu.play();
      }
    case 'stop':
      if (currentState === state.submenuActive) {
        this.submenu.stop();
      }
  }

}

module.exports = menuComponent;
