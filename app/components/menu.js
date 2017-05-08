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

  const width = menuItems.length * 174;

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
      x: (174 * index),
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

}

menuComponent.prototype.changeMenuItem = function(direction) {
  const currentMenuItem = this.activeMenuItem;
  if (direction === 'left') {
    if (this.activeMenuItem > 0) {

      this.activeMenuItem = this.activeMenuItem - 1;
      this.menu[this.activeMenuItem].activate();
      this.menu[currentMenuItem].deactivate();
    }
  }

  if (direction === 'right') {
    if (this.activeMenuItem < (this.menu.length - 1)) {
      this.activeMenuItem = this.activeMenuItem + 1;
      this.menu[this.activeMenuItem].activate();
      this.menu[currentMenuItem].deactivate();
    }
  }
}

module.exports = menuComponent;
