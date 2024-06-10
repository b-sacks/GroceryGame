/* singleton class that represents a grocery list made up of items.
add items to the list, delete items from the list.
list gets saved to a realm database.
database functionalities are in the database directory.
store items as a list of item ids.
*/

const Item = require('./Item');

class GroceryList {
  
    constructor(items) {
      this.items = items;
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
  }

  module.exports = GroceryList;
  
  // Usage:
  // const list1 = new GroceryList();
  // const list2 = new GroceryList();
  // console.log(list1 === list2); // true