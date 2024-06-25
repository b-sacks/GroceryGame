const db = require('../database/GroceryListDatabase');

class RecipeList {
  
  constructor(key) {
    this.key = key;
    this.initialize(key);
  }

  async initialize(key) {
    await db.getGroceryList(key);
  }

  // Your methods go here.
  async addItem(name) {
    await db.addItem(name, this.key);
  }

  async deleteItem(index) {
    await db.deleteItem(index, this.key);
  }

  async deleteAllItems(key) {
    await db.deleteAllItems(this.key);
  }

  async updateItem(index, name) {
    await db.updateItem(index, name, this.key);
  }

  async getItems() {
    return await db.getGroceryList(this.key);
  }
}

  module.exports = RecipeList;