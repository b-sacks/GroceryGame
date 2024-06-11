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

const realm = new Realm({schema: [GroceryListSchema, ItemSchema]});

function saveGroceryList(groceryList) {
  if (!realm.isInTransaction) {
    realm.write(() => {
      let existingGroceryList = realm.objects('GroceryList');
      if (existingGroceryList.length === 0) {
        // If no GroceryList exists, create one with a default id
        groceryList.id = 1;
      }
      realm.create('GroceryList', groceryList, 'modified');
    });
  }
}

function getGroceryList() {
  return realm.objects('GroceryList');
}

function addItemToGroceryList(groceryList, name) {
  if (!realm.isInTransaction) {
    realm.write(() => {
      const item = { name: name };
      groceryList.items.push(item);
      saveGroceryList(groceryList);
    });
  }
}

function deleteItem(groceryList, index) {
  if (!realm.isInTransaction) {
    realm.write(() => {
      groceryList.items.splice(index, 1);
      saveGroceryList(groceryList);
    });
  }
}

function deleteAllItems(groceryList) {
  if (!realm.isInTransaction) {
    for (let i = groceryList.items.length - 1; i >= 0; i--)
      deleteItem(groceryList, i);
  }
}

function updateItem(groceryList, index, name) {
  if (!realm.isInTransaction) {
    realm.write(() => {
      const item = groceryList.items[index];
      if (item) {
        item.name = name;
        saveGroceryList(groceryList);
      }
    });
  }
}

function loadGroceryList(groceryList) {
  getGroceryList().forEach((list) => {
    groceryList.items = list.items;
  });
}

module.exports = {saveGroceryList, getGroceryList, addItemToGroceryList, deleteItem, deleteAllItems, updateItem, loadGroceryList};