// components/GroceryListComponent.js
const React = require('react');
const { useState } = React;
const { View, Button, TextInput } = require('react-native');
const ItemComponent = require('./ItemComponent');
const GroceryList = require('../services/GroceryList');
const Item = require('../services/Item');

const GroceryListComponent = () => {
  const groceryList = new GroceryList();
  const [items, setItems] = useState(groceryList.getItems());
  const [newItemName, setNewItemName] = useState('');

  const addItem = () => {
    const newItem = new Item(newItemName);
    groceryList.addItem(newItem);
    setItems([...groceryList.getItems()]);
    setNewItemName('');
  };

  const deleteItem = (index) => {
    groceryList.deleteItem(index);
    setItems([...groceryList.getItems()]);
  };

  const updateItem = (index, name) => {
    groceryList.updateItem(index, name);
    setItems([...groceryList.getItems()]);
  };

  return (
    <View>
      {items.map((item, index) => (
        <ItemComponent
          key={index}
          item={item}
          onDelete={() => deleteItem(index)}
          onUpdate={(name) => updateItem(index, name)}
        />
      ))}
      <TextInput
        value={newItemName}
        onChangeText={setNewItemName}
        placeholder="New item name"
      />
      <Button title="Add Item" onPress={addItem} />
    </View>
  );
};

module.exports = GroceryListComponent;