/**
 *  Menu component
 */

const colors = require('../config/colors');

const dimensionsHelper = require('../helpers/dimensions');

const menuItemComponent = require('./menu-item');

function menuComponent(app, menuItems) {
  this.app = app;
  this.menuGroup = app.createGroup();

  const width = menuItems.length * 200;

  this.menuGroup.opacity(0);
  this.menuGroup.w(width);
  this.menuGroup.h(100);

  this.menuGroup.x(dimensionsHelper.getCenterX(this.app.w(), width));
  this.menuGroup.y(dimensionsHelper.getCenterY(this.app.h(), this.menuGroup.h()));

  menuItems.forEach((menuItem, index) => {
    const options = {
      innerRadius: 50,
      outerRadius: 45,
      innerFill: colors.background,
      outerFill: colors.menuLight,
      iconPostfix: 'dark',
      x: 75 + (200 * index),
      y: 50
    };

    if (index === 0) {
      options.innerFill = colors.menuDark;
      options.outerFill = colors.menuDark;
      options.iconPostfix = 'light';
    }

    const item = new menuItemComponent(app, menuItem.title, menuItem.icon, options);
    this.menuGroup.add(item.menuItemGroup);

    this.menuGroup.opacity.anim().from(0).to(1).delay(500).dur(500).start();
  });

}

menuComponent.prototype.resize = function() {

}

module.exports = menuComponent;
