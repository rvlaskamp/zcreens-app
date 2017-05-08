/**
 *  Menu component
 */
const path = require('path');

const colors = require('../config/colors');

const dimensionsHelper = require('../helpers/dimensions');

function menuItemComponent(app, title, icon, options) {
  this.app = app;
  this.menuItemGroup = app.createGroup();

  // Create the icon image
  this.menuItemIcon = app.createImageView();
  this.menuItemIcon.src(path.resolve(__dirname, '..', 'assets', 'images', 'icons', `${icon}-light.png`));
  // this.menuItemIcon.size('stretch');
  this.menuItemIcon.w(174);
  this.menuItemIcon.h(174);
  this.menuItemIcon.x(-25);
  this.menuItemIcon.y(-25);

  this.menuItemIconActive = app.createImageView();
  this.menuItemIconActive.src(path.resolve(__dirname, '..', 'assets', 'images', 'icons', `${icon}-dark.png`));
  this.menuItemIconActive.w(174);
  this.menuItemIconActive.h(174);
  this.menuItemIconActive.x(-25);
  this.menuItemIconActive.y(-25);
  this.menuItemIconActive.opacity(0);

  // Create the title
  this.menuItemTitle = app.createText();
  this.menuItemTitle.text(title);
  this.menuItemTitle.fill(options.outerFill);
  this.menuItemTitle.fontSize(30);
  this.menuItemTitle.w(200);
  this.menuItemTitle.x(-100);
  this.menuItemTitle.y(80);
  this.menuItemTitle.align('center');
  this.menuItemTitle.opacity(options.opacity);

  this.menuItemGroup.x(options.x);
  this.menuItemGroup.y(options.y);

  this.menuItemGroup.add(this.menuItemIcon);
  this.menuItemGroup.add(this.menuItemIconActive);
  this.menuItemGroup.add(this.menuItemTitle);

}

menuItemComponent.prototype.resize = function() {

}

menuItemComponent.prototype.activate = function() {
  this.menuItemIconActive.opacity.anim().from(0).to(1).dur(250).start();
  this.menuItemIcon.opacity.anim().from(1).to(0).dur(250).start();
}

menuItemComponent.prototype.deactivate = function() {
  this.menuItemIconActive.opacity.anim().from(1).to(0).dur(250).start();
  this.menuItemIcon.opacity.anim().from(0).to(1).dur(250).start();
}

module.exports = menuItemComponent;
