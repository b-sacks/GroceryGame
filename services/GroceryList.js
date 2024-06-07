/* singleton class that represents a grocery list made up of items.
add items to the list, delete items from the list.
list gets saved to a realm database.
database functionalities are in the database directory.
store items as a list of item ids.
*/

const Item = require('./Item');

class GroceryList {
    // The Singleton instance is stored in a static variable.
    // static instance;
  
    constructor() {
      // If the instance already exists, return it.
      if (GroceryList.instance) {
        return GroceryList.instance;
      }
  
      // Otherwise, create a new instance and store it.
      GroceryList.instance = this;
  
      // Initialize your instance variables here.
      this.items = [];
    }
  
    // Your methods go here.
    addItem(item) {
      this.items.push(item);
    }
  
    deleteItem(index) {
      this.items.splice(index, 1);
    }

    updateItem(index, name) {
      const item = this.items[index];
      if (item) {
        item.setName(name);
      }
    }
  
    getItems() {
      return this.items;
    }
  }

  const a = new GroceryList();
  a.addItem(new Item('apple'));
  a.addItem(new Item('banana'));
  a.addItem(new Item('carrot'));
  a.deleteItem(1);
  console.log(a.items);

  module.exports = GroceryList;
  
  // Usage:
  // const list1 = new GroceryList();
  // const list2 = new GroceryList();
  // console.log(list1 === list2); // true