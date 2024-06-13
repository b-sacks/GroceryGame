/* singleton class that represents a grocery list made up of items.
add items to the list, delete items from the list.
list gets saved to a realm database.
database functionalities are in the database directory.
store items as a list of item ids.
*/

const db = require('../database/GroceryListDatabase');

class GroceryList {
  
  constructor() {
    this.initialize();
  }

  async initialize() {
    await db.getGroceryList();
  }

  // Your methods go here.
  async addItem(name) {
    await db.addItem(name);
  }

  async deleteItem(index) {
    await db.deleteItem(index);
  }

  async deleteAllItems() {
    await db.deleteAllItems();
  }    
  async updateItem(index, name) {
    await db.updateItem(index, name);
  }

  async getItems() {
    return await db.getGroceryList();
  }
}

  module.exports = GroceryList;
  
  // Usage:
  // const list1 = new GroceryList();
  // const list2 = new GroceryList();
  // console.log(list1 === list2); // true