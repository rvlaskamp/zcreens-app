/**
 *  Menu component
 */
const path = require('path');

const colors = require('../config/colors');

const dimensionsHelper = require('../helpers/dimensions');

function menuItemComponent(app, title, icon, options) {
  this.app = app;
  this.menuItemGroup = app.createGroup();

  this.menuItemGroup.w(274);
  this.menuItemGroup.h(274);
  this.menuItemGroup.x(options.x);
  this.menuItemGroup.y(options.y);


  // Create the icon image
  this.menuItemIcon = app.createImageView();
  this.menuItemIcon.src(path.resolve(__dirname, '..', 'assets', 'images', 'icons', `${icon}-light.png`));
  // this.menuItemIcon.size('stretch');
  this.menuItemIcon.w(174);
  this.menuItemIcon.h(174);
  this.menuItemIcon.x(dimensionsHelper.getCenterX(274, 174));
  this.menuItemIcon.y(dimensionsHelper.getCenterY(274, 174));

  this.menuItemIconActive = app.createImageView();
  this.menuItemIconActive.src(path.resolve(__dirname, '..', 'assets', 'images', 'icons', `${icon}-dark.png`));
  this.menuItemIconActive.w(174);
  this.menuItemIconActive.h(174);
  this.menuItemIconActive.x(dimensionsHelper.getCenterX(274, 174));
  this.menuItemIconActive.y(dimensionsHelper.getCenterY(274, 174));

  if (options.active) {
    this.menuItemIconActive.opacity(1);
  } else {
    this.menuItemIconActive.opacity(0);
  }

  // Create the title
  this.menuItemTitle = app.createText();
  this.menuItemTitle.text(title);
  this.menuItemTitle.fill(colors.menuDark);
  this.menuItemTitle.fontSize(50);
  this.menuItemTitle.w(274);
  this.menuItemTitle.x(0);
  this.menuItemTitle.y(274);
  this.menuItemTitle.align('center');
  this.menuItemTitle.opacity(options.opacity);

  this.menuItemGroup.add(this.menuItemIcon);
  this.menuItemGroup.add(this.menuItemIconActive);
  this.menuItemGroup.add(this.menuItemTitle);

}

menuItemComponent.prototype.resize = function(delay) {
  this.menuItemIcon.sx.anim().from(this.menuItemIcon.sx()).to(0.5).dur(250).delay(delay).start();
  this.menuItemIcon.sy.anim().from(this.menuItemIcon.sy()).to(0.5).dur(250).delay(delay).start();
  this.menuItemIcon.x.anim().from(this.menuItemIcon.x()).to(dimensionsHelper.getCenterX(274, (174 / 2))).dur(250).delay(delay).start();
  this.menuItemIconActive.sx.anim().from(this.menuItemIcon.sx()).to(0.5).dur(250).delay(delay).start();
  this.menuItemIconActive.sy.anim().from(this.menuItemIcon.sy()).to(0.5).dur(250).delay(delay).start();
  this.menuItemIconActive.x.anim().from(this.menuItemIcon.x()).to(dimensionsHelper.getCenterX(274, (174 / 2))).dur(250).delay(delay).start();
  this.menuItemTitle.opacity.anim().from(this.menuItemTitle.opacity()).to(0).dur(250).delay(delay).start();
}

menuItemComponent.prototype.activate = function() {
  this.menuItemIconActive.opacity.anim().from(0).to(1).dur(250).start();
  this.menuItemIcon.opacity.anim().from(1).to(0).dur(250).start();
  this.menuItemTitle.opacity.anim().from(0.5).to(1).dur(250).start();
}

menuItemComponent.prototype.deactivate = function() {
  this.menuItemIconActive.opacity.anim().from(1).to(0).dur(250).start();
  this.menuItemIcon.opacity.anim().from(0).to(1).dur(250).start();
  this.menuItemTitle.opacity.anim().from(1).to(0.5).dur(250).start();
}

module.exports = menuItemComponent;
