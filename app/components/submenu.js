/**
 *  Menu component
 */

const path = require('path');


const colors = require('../config/colors');
const circularBuffer = require('../helpers/circularBuffer');

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

  this.menuItemsGroup = app.createGroup();
  this.menuItemsGroup.w(320);
  this.menuItemsGroup.h(this.menuGroup.h());
  this.menuItemsGroup.x(dimensionsHelper.getCenterX(this.menuGroup.w(), this.menuItemsGroup.w()));
  this.menuItemsGroup.y(dimensionsHelper.getCenterY(this.menuGroup.h(), this.menuItemsGroup.h()));


  this.menuGroup.add(this.menuItemsGroup);
  this.menuGroup.add(this.background);
  this.menuGroup.add(this.backgroundMenu);
}

submenuComponent.prototype.show = function(menuItems) {
  this.menuItems = new circularBuffer(menuItems);

  const menuItemSpacing = 25;
  const menuItemHeight = 80;
  const menuItemWidth = 320;

  // Calculate maximum menu items
  const totalItems = (Math.round(this.menuGroup.h() / (menuItemHeight + menuItemSpacing)) - 1);
  const totalTopBottomItems = (totalItems - 1) / 2;

  if (menuItems.length < totalItems) {
   this.menuItemsGroup.h(menuItems.length * menuItemHeight);
   this.menuItemsGroup.y(this.backgroundMenu.y());
  }

  // Add menu items to the menuItemsGroup
  menuItems.forEach((menuItem, index) => {
    const item = this.app.createGroup();
    item.w(this.menuItemsGroup.w() - 10);
    item.h(this.backgroundMenu.h());
    item.x(10);
    item.y(menuItemHeight * index);

    const label = this.app.createText();
    label.text(menuItem.title);
    label.fill(colors.menuDark);
    label.fontSize(35);
    label.w(item.w());
    label.y(42);

    item.add(label);

    this.menuItemsGroup.add(item);
  });

  this.menuGroup.opacity.anim().from(0).to(1).delay(1000).dur(500).start();
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
