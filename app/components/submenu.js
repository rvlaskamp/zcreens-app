/**
 *  Menu component
 */

const path = require('path');

const colors = require('../config/colors');
const circularBuffer = require('../helpers/circularBuffer');

const dimensionsHelper = require('../helpers/dimensions');
const omxplayerHelper = require('../helpers/omxplayer');

const menuItemComponent = require('./menu-item');
const submenuItemMarker = require('./submenu-item-marker');

function submenuComponent(app, items) {
  const width = dimensionsHelper.calcWidth(app.w(), 20);
  const totalWidth = dimensionsHelper.calcWidth(app.w(), 30);
  const menuItemSpacing = 20;
  const menuItemHeight = 72;
  const menuItemWidth = 320;

  this.app = app;
  this.activeMenuItem = 0;
  this.menuItems = items;

  this.menuGroup = app.createGroup();
  this.omxplayer = new omxplayerHelper();

  // Create marker
  this.marker = new submenuItemMarker(this.app);
  this.marker.group.y(0);

  // Create background
  this.menu = [];
  this.menuGroup.w(width);
  this.menuGroup.h(this.app.h());
  this.menuGroup.x(-totalWidth);
  this.menuGroup.y(0);
  this.menuGroup.opacity(0);

  this.background = app.createRect();
  this.background.fill(colors.background);
  this.background.opacity(0.95);
  this.background.w(this.menuGroup.w());
  this.background.h(this.menuGroup.h());
  this.background.x(0);
  this.background.y(0);

  this.menuItemsGroup = app.createGroup();
  this.menuItemsGroup.w(320);
  this.menuItemsGroup.h(this.menuGroup.h() - 50);
  this.menuItemsGroup.x(dimensionsHelper.getCenterX(this.menuGroup.w(), this.menuItemsGroup.w()));
  this.menuItemsGroup.y(50);


  // Add menu items to the menuItemsGroup
  this.menuItems.forEach((menuItem, index) => {
    const item = this.app.createGroup();
    item.w(this.menuItemsGroup.w() - 20);
    item.h(menuItemHeight);
    item.x(20);
    item.y(menuItemHeight * index);

    const label = this.app.createText();
    label.text(menuItem.title);
    label.fill(colors.menuLight);
    label.fontSize(35);
    label.w(item.w());
    label.y(45);

    if (index === this.activeMenuItem) {
      label.fill(colors.menuDark);
    }

    item.add(label);

    this.menuItemsGroup.add(item);
  });

  this.menuGroup.add(this.background);
  this.menuGroup.add(this.menuItemsGroup);
  this.menuGroup.add(this.marker.group);
}

submenuComponent.prototype.show = function(menuItems) {
  this.menuGroup.opacity.anim().from(0).to(1).dur(500).start();
  this.menuGroup.x().anim().from(this.menuGroup.x()).to(dimensionsHelper.calcWidth(this.app.w(), 10)).dur(500).start();
}

submenuComponent.prototype.hide = function(menuItems) {
  this.menuGroup.opacity.anim().from(1).to(0).dur(500).start();
  this.menuGroup.x().anim().from(this.menuGroup.x()).to(-(dimensionsHelper.calcWidth(this.app.w(), 30))).dur(500).start();
}

submenuComponent.prototype.update = function(menuItems) {
  console.log('update', menuItems);
}


submenuComponent.prototype.activate = function() {
  this.marker.activate();

  this.menuItems[this.activeMenuItem].fill(colors.menuDark);
}

submenuComponent.prototype.deactivate = function() {
  this.marker.deactivate();

  this.menuItems[this.activeMenuItem].fill(colors.menuLight);
}

submenuComponent.prototype.moveUp = function() {
  this.menuItems[this.activeMenuItem].fill(colors.menuLight);

  if (this.activeMenuItem === 0) {
    this.activeMenuItem = this.menuItems.length - 1;
    const y = this.marker.group.h() * (this.menuItems.length - 1);
    this.marker.group.y.anim().from(this.marker.group.y()).to(y).dur(250).start();
  } else {
    this.activeMenuItem = this.activeMenuItem - 1;

    const y = this.marker.group.h() * (this.activeMenuItem);
    this.marker.group.y.anim().from(this.marker.group.y()).to(y).dur(250).start();
  }

  this.menuItems[this.activeMenuItem].fill(colors.menuDark);
}

submenuComponent.prototype.moveDown = function() {
  this.menuItems[this.activeMenuItem].fill(colors.menuLight);

  if (this.activeMenuItem === (this.menuItems.length - 1)) {
    this.activeMenuItem = 0;
    this.marker.group.y.anim().from(this.marker.group.y()).to(0).dur(250).start();
  } else {
    this.activeMenuItem = this.activeMenuItem + 1;

    const y = this.marker.group.h() * (this.activeMenuItem);
    this.marker.group.y.anim().from(this.marker.group.y()).to(y).dur(250).start();
  }

  this.menuItems[this.activeMenuItem].fill(colors.menuDark);
}

submenuComponent.prototype.play = function() {
  console.log('play', this.menuItems[this.activeMenuItem].stream);
  this.omxplayer.play(this.menuItems[this.activeMenuItem].stream);
}

submenuComponent.prototype.stop = function() {
  if(this.omxplayer.isPlaying()) {
    this.omxplayer.stop();
  }
}

module.exports = submenuComponent;
