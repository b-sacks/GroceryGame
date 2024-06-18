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
  const [checkedItems, setCheckedItems] = useState([]);

  const fetchItems = async () => {
    const fetchedItems = await groceryList.getItems();
    setItems(fetchedItems);
  };

  const handleCheck = (item, isChecked) => {
    if (isChecked) {
      setCheckedItems([...checkedItems, item]);
    } else {
      setCheckedItems(checkedItems.filter(i => i !== item));
    }
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

  const uncheckItems = () => {
    setCheckedItems([]);
  };

  // const checkAllItems = () => {
  //   setCheckedItems(items);
  // }

  const clearCheckedItems = async () => {
    const newList = new GroceryList('groceryList');
    for (const item of checkedItems) {
      const index = items.indexOf(item);
      await newList.deleteItem(index);
    }
    setGroceryList(newList);
    uncheckItems();
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
            onCheck={(isChecked) => handleCheck(item, isChecked)}
            isChecked={checkedItems.includes(item)}
          />
        ))}
        <Button title="Add Item" onPress={() => setDialogVisible(true)} />
        <Button title="Uncheck All Items" onPress={uncheckItems} />
        {/* <Button title="Check All Items" onPress={checkAllItems} /> */}
        <Button title="Clear Checked Items" onPress={clearCheckedItems} />
        <Dialog.Container visible={isDialogVisible}>
          <Dialog.Title>Add Item</Dialog.Title>
          <Dialog.Input onChangeText={setNewItemName} placeholder="Enter item name" autoFocus={true} />
          <Dialog.Button label="Cancel" onPress={() => setDialogVisible(false)} />
          <Dialog.Button label="Add" onPress={addItem} />
        </Dialog.Container>
        <Button title="Delete All" onPress={deleteAllItems} color="red" />
        <Text>{'DEBUG\n' + items.map((item, index) => index + ': ' + item).join(', ')}</Text>
      </View>
    </ScrollView>
  );
};

module.exports = GroceryListComponent;