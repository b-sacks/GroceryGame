/* class that represents an item of a grocery list.
Item just has a name and an id.
Items get saved to a realm database via grocery list class.
Items can be added, deleted, and updated.
*/
// Path: services/Item.js
// maybe make id private

const { v4: uuidv4 } = require('uuid');
require('react-native-get-random-values');

class Item {
  constructor(name) {
    this.id = uuidv4();
    this.name = name;
  }

  getName() {
    return this.name;
  }

  setName(name) {
    this.name = name;
  }
}
module.exports = Item;

// const item = new Item('apple');
// item.setName('banana');
// console.log(item.getName()); // apple