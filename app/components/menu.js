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

  const width = menuItems.length * 200;

  this.menu = [];
  this.menuGroup.opacity(0);
  this.menuGroup.w(width);
  this.menuGroup.h(100);

  this.menuGroup.x(dimensionsHelper.getCenterX(this.app.w(), width));
  this.menuGroup.y(dimensionsHelper.getCenterY(this.app.h(), this.menuGroup.h()));

  menuItems.forEach((menuItem, index) => {
    const options = {
      innerRadius: 50,
      outerRadius: 45,
      innerFill: colors.menuDark,
      outerFill: colors.menuDark,
      iconPostfix: 'dark',
      opacity: 0.5,
      x: 75 + (200 * index),
      y: 50
    };

    if (index === 0) {
      options.opacity = 1;
      options.iconPostfix = 'light';
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
    if (this.activeMenuItem < this.menu.length) {
      this.activeMenuItem = this.activeMenuItem + 1;
      this.menu[this.activeMenuItem].activate();
      this.menu[currentMenuItem].deactivate();
    }
  }
}

module.exports = menuComponent;
