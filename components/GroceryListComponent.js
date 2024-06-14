// components/GroceryListComponent.js
const React = require('react');
const { useState, useEffect } = React;
const { View, Button, TextInput, Text } = require('react-native');
const ItemComponent = require('./ItemComponent');
const GroceryList = require('../services/GroceryList');
import Dialog from "react-native-dialog";

const GroceryListComponent = () => {
  const [newItemName, setNewItemName] = useState('');
  const [groceryList, setGroceryList] = useState(new GroceryList());
  const [isDialogVisible, setDialogVisible] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const fetchedItems = await groceryList.getItems();
      setItems(fetchedItems);
    };

    fetchItems();
  }, [groceryList]);

  const addItem = async () => {
    if (!newItemName.trim()) {
      return;
    }
    const newList = new GroceryList();
    await newList.addItem(newItemName);
    setNewItemName('');
    setGroceryList(newList);
    setDialogVisible(false);
  };

  const deleteItem = async (index) => {
    const newList = new GroceryList();
    await newList.deleteItem(index);
    setGroceryList(newList);
  };

  const updateItem = async (index, name) => {
    const newList = new GroceryList();
    await newList.updateItem(index, name);
    setGroceryList(newList);
  };

  const deleteAllItems = async () => {
    const newList = new GroceryList();
    await newList.deleteAllItems();
    setGroceryList(newList);
  }

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
      <Button title="Add Item" onPress={() => setDialogVisible(true)} />
      <Dialog.Container visible={isDialogVisible}>
        <Dialog.Title>Add Item</Dialog.Title>
        <Dialog.Input onChangeText={setNewItemName} placeholder="Enter item name" />
        <Dialog.Button label="Cancel" onPress={() => setDialogVisible(false)} />
        <Dialog.Button label="Add" onPress={addItem} />
      </Dialog.Container>
      <Button title="Delete All" onPress={deleteAllItems} color="red" />
      <Text>{items.map((item, index) => index + ': ' + item).join(', ')}</Text>
    </View>
  );
};

module.exports = GroceryListComponent;