/**
 *  Picture component
 */

function pictureComponent(app, src) {
  this.picture = app.createImageView();

  this.picture.src(src);
  this.picture.w(app.w());
  this.picture.h(app.h());

  return this.picture;
}

module.exports = pictureComponent;
