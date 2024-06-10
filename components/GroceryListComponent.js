// components/GroceryListComponent.js
const React = require('react');
const { useState } = React;
const { View, Button, TextInput, Text } = require('react-native');
const ItemComponent = require('./ItemComponent');
const GroceryList = require('../services/GroceryList');
const Item = require('../services/Item');

const GroceryListComponent = () => {
  const [newItemName, setNewItemName] = useState('');
  const [groceryList, setGroceryList] = useState(new GroceryList([]));

  const addItem = () => {
    if (!newItemName.trim()) {
      return;
    }
    const newItem = new Item(newItemName);
    groceryList.addItem(newItem);
    setNewItemName('');
    setGroceryList(new GroceryList(groceryList.items));
  };

  const deleteItem = (index) => {
    groceryList.deleteItem(index);
    setGroceryList(new GroceryList(groceryList.items));
  };

  const updateItem = (index, name) => {
    groceryList.updateItem(index, name);
    setGroceryList(new GroceryList(groceryList.items));
  };

  return (
    <View>
      {groceryList.items.map((item, index) => (
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
      <Text>{groceryList.items.map((item) => item.name).join(', ')}</Text>
    </View>
  );
};

module.exports = GroceryListComponent;