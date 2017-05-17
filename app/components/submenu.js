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
  this.menuGroup.opacity(0);
  this.menuGroup.w(width);
  this.menuGroup.h(this.app.h());
  this.menuGroup.x(dimensionsHelper.calcWidth(this.app.w(), 10));
  this.menuGroup.y(40);

  this.background = app.createRect();
  this.background.w(this.menuGroup.w());
  this.background.h(this.menuGroup.h());
  this.background.x(0);
  this.background.y(0);
  this.background.fill(colors.background);
  this.background.opacity(1);

  this.backgroundImage = app.createImageView();
  this.backgroundImage.src(path.resolve(__dirname, '..', 'assets', 'images', 'background-submenu.png'));
  this.backgroundImage.w(this.menuGroup.w());
  this.backgroundImage.h(this.menuGroup.h());
  this.backgroundImage.size('stretch');
  this.backgroundImage.y(dimensionsHelper.getCenterY(this.menuGroup.h(), this.backgroundImage.h()));

  this.backgroundImageMenu = app.createImageView();
  this.backgroundImageMenu.src(path.resolve(__dirname, '..', 'assets', 'images', 'submenu-item.png'));
  this.backgroundImageMenu.w(320);
  this.backgroundImageMenu.h(72);
  this.backgroundImageMenu.x(dimensionsHelper.getCenterX(this.menuGroup.w(), this.backgroundImageMenu.w()));
  this.backgroundImageMenu.y(dimensionsHelper.getCenterY(this.menuGroup.h(), this.backgroundImageMenu.h()));

  this.menuItemsGroup = app.createGroup();
  this.menuItemsGroup.w(320);
  this.menuItemsGroup.h(this.menuGroup.h());
  this.menuItemsGroup.x(dimensionsHelper.getCenterX(this.menuGroup.w(), this.menuItemsGroup.w()));
  this.menuItemsGroup.y(dimensionsHelper.getCenterY(this.menuGroup.h(), this.menuItemsGroup.h()));

  this.menuGroup.add(this.background);
  this.menuGroup.add(this.menuItemsGroup);
  this.menuGroup.add(this.backgroundImage);
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

  if ((menuItems.length - 1) < totalItems) {
    this.rotatingMenu = false;
    this.menuItemsGroup.h(menuItems.length * menuItemHeight);
    this.menuItemsGroup.y(this.backgroundImageMenu.y());
  }

  // Add menu items to the menuItemsGroup
  menuItems.forEach((menuItem, index) => {
    const item = this.app.createGroup();
    item.w(this.menuItemsGroup.w() - 10);
    item.h(this.backgroundImageMenu.h());
    item.x(10);
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

  this.menuGroup.opacity.anim().from(0).to(0.5).delay(1000).dur(500).start();
}

submenuComponent.prototype.activate = function() {
  this.menuGroup.opacity.anim().from(this.menuGroup.opacity()).to(1).delay(1000).dur(500).start();
}

submenuComponent.prototype.deactivate = function() {
  this.menuGroup.opacity.anim().from(this.menuGroup.opacity()).to(0.5).delay(1000).dur(500).start();
}

submenuComponent.prototype.play = function() {
  if (!this.omxplayer.isPlaying) {
    this.omxplayer.play('http://download.blender.org/peach/bigbuckbunny_movies/big_buck_bunny_1080p_h264.mov');
  }
}

module.exports = submenuComponent;
