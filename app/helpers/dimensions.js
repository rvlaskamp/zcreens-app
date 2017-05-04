function getCenterX(containerWidth, elementWidth) {
  const center = containerWidth / 2;
  const centerX = center - (elementWidth / 2);

  return centerX;
}

function getCenterY(containerHeight, elementHeight) {
  const center = containerHeight / 2;
  const centerY = center - (elementHeight / 2);

  return centerY;
}

function calcWidth(containerWidth, percentage) {
  const width = (containerWidth * percentage) / 100;

  return width;
}

module.exports = {
  getCenterX,
  getCenterY,
  calcWidth,
};
