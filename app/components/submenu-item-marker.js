/**
 *  Submenu item marker component
 */

const path = require('path');

function submenuMenuItemMarkerComponent(app) {
  this.app = app;
  this.group = app.createGroup();
  this.group.w(320);
  this.group.h(72);

  this.marker = app.createImageView();
  this.marker.src(path.resolve(__dirname, '..', 'assets', 'images', 'submenu-item.png'));
  this.marker.w.bindTo(this.group.w);
  this.marker.h.bindTo(this.group.h);
  this.marker.x(0);
  this.marker.y(0);
  this.marker.opacity(0);

  this.markerLight = app.createImageView();
  this.markerLight.src(path.resolve(__dirname, '..', 'assets', 'images', 'submenu-item-light.png'));
  this.markerLight.w.bindTo(this.group.w);
  this.markerLight.h.bindTo(this.group.h);
  this.markerLight.x(0);
  this.markerLight.y(0);
  this.marker.opacity(1);

  this.group.add(this.marker);
  this.group.add(this.markerLight);
}

submenuMenuItemMarkerComponent.prototype.activate = function() {
  this.marker.opacity.anim().from(0).to(1).dur(250).start();
  this.markerLight.opacity.anim().from(1).to(0).dur(250).start();
}

submenuMenuItemMarkerComponent.prototype.deactivate = function() {
  this.marker.opacity.anim().from(1).to(0).dur(250).start();
  this.markerLight.opacity.anim().from(0).to(1).dur(250).start();
}

module.exports = submenuMenuItemMarkerComponent;
