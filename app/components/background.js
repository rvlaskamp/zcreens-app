/**
 *  Background component
 */

const colors = require('../config/colors');

const dimensionsHelper = require('../helpers/dimensions');

function backgroundComponent(app) {
  this.app = app;
  this.background = app.createRect();

  this.background.w.bindTo(app.w);
  this.background.h.bindTo(app.h);
  this.background.fill(colors.background);
}

backgroundComponent.prototype.resize = function() {
  this.background.w.anim().from(this.background.w()).to(dimensionsHelper.calcWidth(this.app.w(), 30)).dur(1000).start();
}

module.exports = backgroundComponent;
