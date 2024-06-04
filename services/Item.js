/* class that represents an item of a grocery list.
Item just has a name for now.
Items get saved to a realm database.
Items can be added, deleted, and updated.
database funcitonalities are in the database directory.
*/
// Path: services/Item.js
// maybe make id private

import { v4 as uuidv4 } from 'uuid';

export default class Item {
  constructor(name) {
    this.id = uuidv4();
    this.name = name;
    //eg. database.addItem(this.id, name);
  }

  getName() {
    //get name from database functions
    //eg. return database.getItemName(this.id);
    return this.name;
  }

  setName(name) {
    this.name = name;
    //eg. database.setItemName(this.id, name);
  }
}

const item = new Item('apple');