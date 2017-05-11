/**
 *  Menu component
 */

const path = require('path');


const colors = require('../config/colors');

const dimensionsHelper = require('../helpers/dimensions');

const menuItemComponent = require('./menu-item');

function submenuComponent(app) {
  this.app = app;
  this.menuGroup = app.createGroup();

  this.activeMenuItem = 0;

  const width = dimensionsHelper.calcWidth(this.app.w(), 20);

  this.menu = [];
  this.menuGroup.opacity(0);
  this.menuGroup.w(width);
  this.menuGroup.h(this.app.h());
  this.menuGroup.x(dimensionsHelper.calcWidth(this.app.w(), 10));
  this.menuGroup.y(0);

  this.background = app.createImageView();
  this.background.src(path.resolve(__dirname, '..', 'assets', 'images', 'background-submenu.png'));
  this.background.w(this.menuGroup.w());
  this.background.h(1080);
  this.background.size('stretch');
  this.background.y(dimensionsHelper.getCenterY(this.menuGroup.h(), this.background.h()));

  this.backgroundMenu = app.createImageView();
  this.backgroundMenu.src(path.resolve(__dirname, '..', 'assets', 'images', 'submenu-item.png'));
  this.backgroundMenu.w(320);
  this.backgroundMenu.h(72);
  this.backgroundMenu.x(dimensionsHelper.getCenterX(this.menuGroup.w(), this.backgroundMenu.w()));
  this.backgroundMenu.y(dimensionsHelper.getCenterY(this.menuGroup.h(), this.backgroundMenu.h()));

  this.menuGroup.add(this.background);
  this.menuGroup.add(this.backgroundMenu);




  /*
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
  */

}

submenuComponent.prototype.show = function(menuItems) {
  let menuSort = [];
  const menuItemSpacing = 20;
  const menuItemHeight = 72;
  const menuItemWidth = 320;

  // Calculate maximum menu items
  const totalItems = (Math.round(this.menuGroup.h() / (menuItemHeight + menuItemSpacing)) - 1);

  const totalTopBottomItems = (totalItems - 1) / 2;

  if (menuItems.length > totalTopBottomItems) {

  } else {
    menuSort = menuItems;
  }
  /*
  this.rect = app.createRect();
  this.rect.w(320);
  this.rect.h(72);
  this.rect.x(dimensionsHelper.getCenterX(this.menuGroup.w(), 320));
  this.rect.y(100);
  this.rect.fill('#3d3d3d');
  */


  menuItems.forEach((menuItem, index) => {
    console.log(menuItem)

  });

  this.menuGroup.opacity.anim().from(0).to(1).dur(500).start();
}

submenuComponent.prototype.changeMenuItem = function(direction, state) {
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

module.exports = submenuComponent;
