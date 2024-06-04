/* singleton class that represents a grocery list made up of items.
add items to the list, delete items from the list.
list gets saved to a realm database.
database functionalities are in the database directory.
store items as a list of item ids.
*/

import { Item } from './Item';

class GroceryList {
    // The Singleton instance is stored in a static variable.
    static instance;
  
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
    addItem(name) {
      const item = new Item(name);
      this.items.push(item);
    }
  
    removeItem(id) {
      this.items = this.items.filter((item) => item.id !== id);
    }

    updateItem(id, newName) {
      const item = this.items.find((item) => item.id === id);
      item.setName(newName);
      // Update item in database
    }
  
    getItems() {
      return this.items;
    }
  }
  
  // Usage:
  const list1 = new GroceryList();
  const list2 = new GroceryList();
  console.log(list1 === list2); // true