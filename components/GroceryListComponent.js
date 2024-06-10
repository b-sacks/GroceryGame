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
    const newItem = new Item(newItemName);
    groceryList.addItem(newItem);
    setNewItemName('');
    setGroceryList(new GroceryList());
    setDialogVisible(false);
  };

  const deleteItem = (index) => {
    groceryList.deleteItem(index);
    setGroceryList(new GroceryList());
  };

  const updateItem = (index, name) => {
    groceryList.updateItem(index, name);
    setGroceryList(new GroceryList());
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
      <Button title="Add Item" onPress={() => setDialogVisible(true)} />
      <Dialog.Container visible={isDialogVisible}>
        <Dialog.Title>Add Item</Dialog.Title>
        <Dialog.Input onChangeText={setNewItemName} placeholder="Enter item name" />
        <Dialog.Button label="Cancel" onPress={() => setDialogVisible(false)} />
        <Dialog.Button label="Add" onPress={addItem} />
      </Dialog.Container>
      <Button title="Delete All" onPress={() => setGroceryList(new GroceryList([]))} color="red" />
      <Text>{groceryList.items.map((item) => item.name).join(', ')}</Text>
    </View>
  );
};

module.exports = GroceryListComponent;