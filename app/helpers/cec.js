const mappings = {
  0: 'enter',
  1: 'up',
  2: 'down',
  3: 'left',
  4: 'right'
}

function getKey(key) {
  return mappings[key];
}

module.exports = {
  getKey
}
