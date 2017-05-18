/**
 *  Menu component
 */

const path = require('path');


const colors = require('../config/colors');
const circularBuffer = require('../helpers/circularBuffer');

const dimensionsHelper = require('../helpers/dimensions');
const omxplayerHelper = require('../helpers/omxplayer');

const menuItemComponent = require('./menu-item');

function submenuComponent(app) {
  this.app = app;
  this.menuGroup = app.createGroup();
  this.omxplayer = new omxplayerHelper();

  this.activeMenuItem = 0;

  const width = dimensionsHelper.calcWidth(this.app.w(), 20);

  this.menu = [];
  this.menuGroup.w(width);
  this.menuGroup.h(this.app.h() - 50);
  this.menuGroup.x(dimensionsHelper.calcWidth(this.app.w(), 10));
  this.menuGroup.y(50);

  this.backgroundImageMenu = app.createImageView();
  this.backgroundImageMenu.src(path.resolve(__dirname, '..', 'assets', 'images', 'submenu-item.png'));
  this.backgroundImageMenu.w(320);
  this.backgroundImageMenu.h(72);
  this.backgroundImageMenu.x(dimensionsHelper.getCenterX(this.menuGroup.w(), this.backgroundImageMenu.w()));
  // this.backgroundImageMenu.y(dimensionsHelper.getCenterY(this.menuGroup.h(), this.backgroundImageMenu.h()));
  this.backgroundImageMenu.y(0);
  this.backgroundImageMenu.opacity(0);

  this.menuItemsGroup = app.createGroup();
  this.menuItemsGroup.w(320);
  this.menuItemsGroup.h(this.menuGroup.h());
  this.menuItemsGroup.x(dimensionsHelper.getCenterX(this.menuGroup.w(), this.menuItemsGroup.w()));
  this.menuItemsGroup.y(dimensionsHelper.getCenterY(this.menuGroup.h(), this.menuItemsGroup.h()));
  this.menuItemsGroup.opacity(0);

  this.menuGroup.add(this.menuItemsGroup);
  this.menuGroup.add(this.backgroundImageMenu);
}

submenuComponent.prototype.show = function(menuItems) {
  this.currentIndex = 0;
  this.menuItems = new circularBuffer(menuItems);

  const menuItemSpacing = 20;
  const menuItemHeight = 72;
  const menuItemWidth = 320;

  // Calculate maximum menu items
  const totalItems = (Math.round(this.menuGroup.h() / (menuItemHeight + menuItemSpacing)) - 1);
  const totalBottomItems = (Math.round(totalItems - 1) / 2);

  console.log(totalItems);
  console.log(totalBottomItems);
  console.log(menuItems.length - 1);

  if (menuItems.length < totalItems) {
    this.menuItemsGroup.y(this.backgroundImageMenu.y());
  }

  // Add menu items to the menuItemsGroup
  menuItems.forEach((menuItem, index) => {
    const item = this.app.createGroup();
    item.w(this.menuItemsGroup.w() - 20);
    item.h(this.backgroundImageMenu.h());
    item.x(20);
    item.y(menuItemHeight * index);

    const label = this.app.createText();
    label.text(menuItem.title);
    label.fill(colors.menuDark);
    label.fontSize(35);
    label.w(item.w());
    label.y(45);

    item.add(label);

    this.menuItemsGroup.add(item);
  });

  this.menuItemsGroup.opacity.anim().from(0).to(0.25).delay(1000).dur(500).start();
  this.backgroundImageMenu.opacity.anim().from(0).to(0.25).delay(1000).dur(500).start();
}


submenuComponent.prototype.activate = function() {
  this.menuItemsGroup.opacity.anim().from(this.menuItemsGroup.opacity()).to(1).dur(500).start();
  this.backgroundImageMenu.opacity.anim().from(this.backgroundImageMenu.opacity()).to(1).dur(500).start();
}

submenuComponent.prototype.deactivate = function() {
  this.menuItemsGroup.opacity.anim().from(this.menuItemsGroup.opacity()).to(0.25).dur(500).start();
  this.backgroundImageMenu.opacity.anim().from(this.backgroundImageMenu.opacity()).to(0.25).dur(500).start();
}

submenuComponent.prototype.moveUp = function() {
  if (this.activeMenuItem > 0) {
    this.activeMenuItem = this.activeMenuItem - 1;
    const y = this.backgroundImageMenu.y() - this.backgroundImageMenu.h();
    this.backgroundImageMenu.y.anim().from(this.backgroundImageMenu.y()).to(y).dur(250).start();
  }
}

submenuComponent.prototype.moveDown = function() {
  if (this.activeMenuItem === (this.menuItems.length -1)) {
    this.activeMenuItem = this.activeMenuItem + 1;
    const y = this.backgroundImageMenu.y() + this.backgroundImageMenu.h();
    this.backgroundImageMenu.y.anim().from(this.backgroundImageMenu.y()).to(y).dur(250).start();
  }
}

submenuComponent.prototype.play = function() {
  if(!this.omxplayer.isPlaying()) {
    this.omxplayer.play(this.menuItems[this.activeMenuItem].stream);
  }
}

submenuComponent.prototype.stop = function() {
  if(this.omxplayer.isPlaying()) {
    this.omxplayer.stop();
  }
}

module.exports = submenuComponent;
