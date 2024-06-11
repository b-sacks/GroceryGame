// components/GroceryListComponent.js
const React = require('react');
const { useState } = React;
const { View, Button, TextInput, Text } = require('react-native');
const ItemComponent = require('./ItemComponent');
const GroceryList = require('../services/GroceryList');
const Item = require('../services/Item');
import Dialog from "react-native-dialog";

const GroceryListComponent = () => {
  const [newItemName, setNewItemName] = useState('');
  const [groceryList, setGroceryList] = useState(new GroceryList());
  const [isDialogVisible, setDialogVisible] = useState(false);

  const addItem = () => {
    if (!newItemName.trim()) {
      return;
    }
    const newList = new GroceryList();
    newList.addItem(newItemName);
    setNewItemName('');
    setGroceryList(newList);
    setDialogVisible(false);
  };

  const deleteItem = (index) => {
    const newList = new GroceryList();
    newList.deleteItem(index);
    setGroceryList(newList);
  };

  const updateItem = (index, name) => {
    const newList = new GroceryList();
    newList.updateItem(index, name);
    setGroceryList(newList);
  };

  const deleteAllItems = () => {
    const newList = new GroceryList();
    newList.deleteAllItems();
    setGroceryList(newList);
  }

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
      <Button title="Add Item" onPress={() => setDialogVisible(true)} />
      <Dialog.Container visible={isDialogVisible}>
        <Dialog.Title>Add Item</Dialog.Title>
        <Dialog.Input onChangeText={setNewItemName} placeholder="Enter item name" />
        <Dialog.Button label="Cancel" onPress={() => setDialogVisible(false)} />
        <Dialog.Button label="Add" onPress={addItem} />
      </Dialog.Container>
      <Button title="Delete All" onPress={deleteAllItems} color="red" />
      <Text>{groceryList.items.map((item) => item.name).join(', ')}</Text>
    </View>
  );
};

module.exports = GroceryListComponent;