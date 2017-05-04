/**
 *  Main view
 */

const backgroundComponent = require('../components/background');
const logoComponent = require('../components/logo');
const menuComponent = require('../components/menu');

function mainView(app) {
  this.app = app;
  this.mainGroup = app.createGroup();
  this.backgroundComponent = new backgroundComponent(app);
  this.logoComponent = new logoComponent(app);

  this.mainGroup.add(this.backgroundComponent.background);
  this.mainGroup.add(this.logoComponent.logo);
}

mainView.prototype.addMenu = function(menuItems) {
  this.logoComponent.move();
  this.menuComponent = new menuComponent(this.app, menuItems);

  this.mainGroup.add(this.menuComponent.menuGroup);
}

module.exports = mainView;
