/**
 *  Menu component
 */
const path = require('path');

const colors = require('../config/colors');

const dimensionsHelper = require('../helpers/dimensions');

function menuItemComponent(app, title, icon, options) {
  this.app = app;
  this.menuItemGroup = app.createGroup();

  // Create the inner and outer circle
  this.menuItemInnerCircle = app.createCircle();
  this.menuItemInnerCircle.fill(options.innerFill);
  this.menuItemInnerCircle.radius(options.outerRadius);
  this.menuItemInnerCircle.opacity(options.opacity);

  this.menuItemOuterCircle = app.createCircle();
  this.menuItemOuterCircle.fill(options.outerFill);
  this.menuItemOuterCircle.radius(options.innerRadius);
  this.menuItemOuterCircle.opacity(options.opacity);

  // Create the icon image
  this.menuItemIcon = app.createImageView();
  this.menuItemIcon.src(path.resolve(__dirname, '..', 'assets', 'images', 'icons', `${icon}-${options.iconPostfix}.png`));
  this.menuItemIcon.size('stretch');
  this.menuItemIcon.w(50);
  this.menuItemIcon.h(50);
  this.menuItemIcon.x(-25);
  this.menuItemIcon.y(-25);

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

  this.menuItemGroup.add(this.menuItemOuterCircle);
  this.menuItemGroup.add(this.menuItemInnerCircle);
  this.menuItemGroup.add(this.menuItemIcon);
  this.menuItemGroup.add(this.menuItemTitle);

}

menuItemComponent.prototype.resize = function() {

}

menuItemComponent.prototype.activate = function() {
  this.menuItemInnerCircle.opacity.anim().from(0.5).to(1).dur(500).start();
  this.menuItemOuterCircle.opacity.anim().from(0.5).to(1).dur(500).start();
  this.menuItemTitle.opacity.anim().from(0.5).to(1).dur(500).start();
}

menuItemComponent.prototype.deactivate = function() {
  this.menuItemInnerCircle.opacity.anim().from(1).to(0.5).dur(500).start();
  this.menuItemOuterCircle.opacity.anim().from(1).to(0.5).dur(500).start();
  this.menuItemTitle.opacity.anim().from(1).to(0.5).dur(500).start();
}

module.exports = menuItemComponent;
