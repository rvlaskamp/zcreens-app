const menuItems = require('../data/menu-items.json');

function getMenuItems() {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(menuItems);
    }, 5000);
  });

  return promise;
}

module.exports = {
  menuItems: getMenuItems
}
