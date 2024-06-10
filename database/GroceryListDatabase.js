const Realm = require('realm');
const GroceryList = require('../services/GroceryList');

const GroceryListSchema = {
  name: 'GroceryList',
  primaryKey: 'id',
  properties: {
    id: 'int',
    items: 'Item[]',
  },
};

const ItemSchema = {
  name: 'Item',
  properties: {
    name: 'string',
  },
};

let realm = new Realm({schema: [GroceryListSchema, ItemSchema]});

function saveGroceryList(groceryList) {
  realm.write(() => {
    let existingGroceryList = realm.objects('GroceryList');
    if (existingGroceryList.length === 0) {
      // If no GroceryList exists, create one with a default id
      groceryList.id = 1;
    }
    realm.create('GroceryList', groceryList, 'modified');
  });
}

function getGroceryList() {
  return realm.objects('GroceryList');
}

module.exports = {saveGroceryList, getGroceryList};