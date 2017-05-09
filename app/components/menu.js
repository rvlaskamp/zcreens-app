/**
 *  Menu component
 */

const colors = require('../config/colors');

const dimensionsHelper = require('../helpers/dimensions');

const menuItemComponent = require('./menu-item');

function menuComponent(app, menuItems) {
  this.app = app;
  this.menuGroup = app.createGroup();

  this.activeMenuItem = 0;

  const width = menuItems.length * 300;

  this.menu = [];
  this.menuGroup.opacity(0);
  this.menuGroup.w(width);
  this.menuGroup.h(200);

  this.menuGroup.x(dimensionsHelper.getCenterX(this.app.w(), width));
  this.menuGroup.y(dimensionsHelper.getCenterY(this.app.h(), this.menuGroup.h()));

  menuItems.forEach((menuItem, index) => {
    const options = {
      iconPostfix: 'light',
      opacity: 0.5,
      x: (300 * index),
      y: 0,
      active: false
    };

    if (index === 0) {
      options.opacity = 1;
      options.active = true;
    }

    const item = new menuItemComponent(app, menuItem.title, menuItem.icon, options);
    this.menuGroup.add(item.menuItemGroup);
    this.menu.push(item);

    this.menuGroup.opacity.anim().from(0).to(1).delay(500).dur(500).start();
  });

}

menuComponent.prototype.resize = function() {
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
}

menuComponent.prototype.changeMenuItem = function(direction, state) {
  const currentMenuItem = this.activeMenuItem;
  if (direction === 'left' || direction === 'up') {
    if (this.activeMenuItem === 0) {
      this.activeMenuItem = this.menu.length - 1;
    } else {
      this.activeMenuItem = this.activeMenuItem - 1;
    }

    this.menu[this.activeMenuItem].activate(state);
    this.menu[currentMenuItem].deactivate(state);
  }

  if (direction === 'right' || direction === 'down') {
    if (this.activeMenuItem === (this.menu.length - 1)) {
      this.activeMenuItem = 0;
    } else {
      this.activeMenuItem = this.activeMenuItem + 1;
    }

    this.menu[this.activeMenuItem].activate(state);
    this.menu[currentMenuItem].deactivate(state);
  }
}

module.exports = menuComponent;
