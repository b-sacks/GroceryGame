/* singleton class that represents a grocery list made up of items.
add items to the list, delete items from the list.
list gets saved to a realm database.
database functionalities are in the database directory.
store items as a list of item ids.
*/

const db = require('../database/GroceryListDatabase');

class GroceryList {
  
    constructor() {
      db.getGroceryList().forEach((groceryList) => {
        this.items = groceryList.items;
      });
    }
  
    // Your methods go here.
    addItem(item) {
      this.items.push(item);
      db.saveGroceryList(this);
    }
  
    deleteItem(index) {
      this.items.splice(index, 1);
      db.saveGroceryList(this);
    }

    updateItem(index, name) {
      const item = this.items[index];
      if (item) {
        item.setName(name);
      }
      db.saveGroceryList(this);
    }
  }

  module.exports = GroceryList;
  
  // Usage:
  // const list1 = new GroceryList();
  // const list2 = new GroceryList();
  // console.log(list1 === list2); // true