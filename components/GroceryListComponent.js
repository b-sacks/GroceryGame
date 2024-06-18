// components/GroceryListComponent.js
const React = require('react');
const { useState, useEffect } = React;
const { View, Button, TextInput, Text, ScrollView } = require('react-native');
const ItemComponent = require('./ItemComponent');
const GroceryList = require('../services/GroceryList');
import Dialog from "react-native-dialog";
import { useFocusEffect } from '@react-navigation/native';

const GroceryListComponent = () => {
  const [newItemName, setNewItemName] = useState('');
  const [groceryList, setGroceryList] = useState(new GroceryList('groceryList'));
  const [isDialogVisible, setDialogVisible] = useState(false);
  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    const fetchedItems = await groceryList.getItems();
    setItems(fetchedItems);
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchItems();
    }, [groceryList])
  );

  useEffect(() => {
    fetchItems();
  }, [groceryList]);

  const addItem = async () => {
    if (!newItemName.trim()) {
      return;
    }
    const newList = new GroceryList('groceryList');
    await newList.addItem(newItemName);
    setNewItemName('');
    setGroceryList(newList);
    setDialogVisible(false);
  };

  const deleteItem = async (index) => {
    const newList = new GroceryList('groceryList');
    await newList.deleteItem(index);
    setGroceryList(newList);
  };

  const updateItem = async (index, name) => {
    const newList = new GroceryList('groceryList');
    await newList.updateItem(index, name);
    setGroceryList(newList);
  };

  const deleteAllItems = async () => {
    const newList = new GroceryList('groceryList');
    await newList.deleteAllItems();
    setGroceryList(newList);
  }

  return (
    <ScrollView keyboardShouldPersistTaps='always'>
      <View style={{paddingTop: 20}}>
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
          <Dialog.Input onChangeText={setNewItemName} placeholder="Enter item name" autoFocus={true} />
          <Dialog.Button label="Cancel" onPress={() => setDialogVisible(false)} />
          <Dialog.Button label="Add" onPress={addItem} />
        </Dialog.Container>
        <Button title="Delete All" onPress={deleteAllItems} color="red" />
        <Text>{items.map((item, index) => index + ': ' + item).join(', ')}</Text>
      </View>
    </ScrollView>
  );
};

module.exports = GroceryListComponent;