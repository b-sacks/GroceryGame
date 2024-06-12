/* singleton class that represents a grocery list made up of items.
add items to the list, delete items from the list.
list gets saved to a realm database.
database functionalities are in the database directory.
store items as a list of item ids.
*/

const db = require('../database/GroceryListDatabase');
const Realm = require('realm');

class GroceryList {
  
  constructor(items=[]) {
    db.loadGroceryList(this);
    this.items = items;
  }

  // Your methods go here.
  addItem(name) {
    db.addItemToGroceryList(this, name);
  }

  deleteItem(index) {
    db.deleteItem(this, index);
  }

  deleteAllItems() {
    db.deleteAllItems(this);
  }    
  updateItem(index, name) {
    db.updateItem(this, index, name);
  }
}

  module.exports = GroceryList;
  
  // Usage:
  // const list1 = new GroceryList();
  // const list2 = new GroceryList();
  // console.log(list1 === list2); // true