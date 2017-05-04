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

  this.menuItemOuterCircle = app.createCircle();
  this.menuItemOuterCircle.fill(options.outerFill);
  this.menuItemOuterCircle.radius(options.innerRadius);

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
  this.menuItemOuterCircle.fill.anim().from(colors.menuLight).to(colors.menuDark).dur(250).start();
  this.menuItemInnerCircle.fill.anim().from(colors.background).to(colors.menuDark).dur(250).start();
  this.menuItemTitle.fill.anim().from(colors.menuLight).to(colors.menuDark).dur(250).start();
}

menuItemComponent.prototype.deactivate = function() {
  this.menuItemOuterCircle.fill.anim().from(colors.menuDark).to(colors.menuLight).dur(250).start();
  this.menuItemInnerCircle.fill.anim().from(colors.menuDark).to(colors.background).dur(250).start();
  this.menuItemTitle.fill.anim().from(colors.menuDark).to(colors.menuLight).dur(250).start();
}

module.exports = menuItemComponent;
