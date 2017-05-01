/**
 *  this.logo component
 */
const path = require('path');

const dimensionsHelper = require('../helpers/dimensions');

const colors = require('../config/colors');

function logoComponent(app) {
  this.app = app;
  this.logo = app.createImageView();

  this.logo.src(path.resolve(__dirname, '..', 'assets', 'images', 'logo.png'));
  this.logo.w(768);
  this.logo.h(768);
  this.logo.x(dimensionsHelper.getCenterY(app.w(), this.logo.w()));
  this.logo.y(dimensionsHelper.getCenterY(app.h(), this.logo.h()));
}

logoComponent.prototype.move = function() {
  this.logo.sx.anim().from(this.logo.sx()).to(0.8).dur(1000).start();
  this.logo.sy.anim().from(this.logo.sy()).to(0.8).dur(1000).start();
  this.logo.x.anim().from(this.logo.x()).to(this.logo.x() + 60).dur(1000).start();
  this.logo.y.anim().from(this.logo.y()).to(-80).dur(1000).start();
}

module.exports = logoComponent;
