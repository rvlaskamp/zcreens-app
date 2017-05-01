/**
 *  Startup view
 */

function create(gfx) {
  const background = gfx.createRect();

  background.w(gfx.w());
  background.h(gfx.h());

  return background;
}

const startupModule = {
  create,
};

module.exports = startupModule;
