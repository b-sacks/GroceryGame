// components/GroceryListComponent.js
const React = require('react');
const { useState, useEffect } = React;
const { View, Button, TextInput, Text, ScrollView, StyleSheet, TouchableOpacity } = require('react-native');
const ItemComponent = require('./ItemComponent');
const GroceryList = require('../services/GroceryList');
import Dialog from "react-native-dialog";
import { useFocusEffect } from '@react-navigation/native';
const { groceryListStyles } = require('../styles/GroceryListStyles');

const GroceryListComponent = () => {
  const [newItemName, setNewItemName] = useState('');
  const [groceryList, setGroceryList] = useState(new GroceryList('groceryList'));
  const [isDialogVisible, setDialogVisible] = useState(false);
  const [isItemExistsDialogVisible, setItemExistsDialogVisible] = useState(false);
  const [isDeleteAllDialogVisible, setDeleteAllDialogVisible] = useState(false);
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

  // useEffect(() => {
  //   fetchItems();
  // }, [groceryList]);

  const addItem = async () => {
    setDialogVisible(false);
    if (!newItemName.trim() || isInList(newItemName)) {
      setTimeout(() => {
        setItemExistsDialogVisible(true);
      }, 400);
      return;
    }
    const newList = new GroceryList('groceryList');
    await newList.addItem(newItemName);
    setNewItemName('');
    setGroceryList(newList);
  };

  const deleteItem = async (index) => {
    const newList = new GroceryList('groceryList');
    await newList.deleteItem(index);
    setGroceryList(newList);
  };

  const updateItem = async (index, name) => {
    if (items[index] === name) {
      return;
    }

    if (isInList(name)) {
      setTimeout(() => {
        setItemExistsDialogVisible(true);
      }, 400);
      return;
    }
    const newList = new GroceryList('groceryList');
    await newList.updateItem(index, name);
    setGroceryList(newList);
  };

  const deleteAllItems = async () => {
    setDeleteAllDialogVisible(false);
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

  const isInList = (name) => {
    // not case sensitive or whitespace sensitive
    name = name.trim().toLowerCase();
    return items.map(i => i.trim().toLowerCase()).includes(name);
  }

  return (
    <View style={{flex: 1}}>
      <View style={groceryListStyles.header}>
        <View style={groceryListStyles.clearAllButton}>
          <TouchableOpacity style={groceryListStyles.clearAllButton} onPress={() => setDeleteAllDialogVisible(true)}>
            <Text style={groceryListStyles.clearAllButtonText}>Clear All</Text>
          </TouchableOpacity>
        </View>
        <View style={groceryListStyles.clearCheckedButton}>
          <TouchableOpacity style={groceryListStyles.clearCheckedButton} onPress={clearCheckedItems}>
            <Text style={groceryListStyles.clearCheckedButtonText}>Clear Checked</Text>
          </TouchableOpacity>
        </View>
        <Text style={groceryListStyles.title}>Grocery List</Text>
        <View style={groceryListStyles.addButton}>
          <TouchableOpacity style={groceryListStyles.addButton} onPress={() => setDialogVisible(true)}>
            <Text style={groceryListStyles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView keyboardShouldPersistTaps='always' backgroundColor='#F0F0E3'>
        <View style={{paddingTop: 15}}>
          {items.map((item, index) => (
            <ItemComponent
              key={`${index}-${items.length}`}
              item={item}
              onDelete={() => deleteItem(index)}
              onUpdate={(name) => updateItem(index, name)}
              onCheck={(isChecked) => handleCheck(item, isChecked)}
              isChecked={checkedItems.includes(item)}
            />
          ))}
          {/* <Button title="Uncheck All Items" onPress={uncheckItems} /> */}
          {/* <Button title="Check All Items" onPress={checkAllItems} /> */}
          {/* <Button title="Clear Checked Items" onPress={clearCheckedItems} /> */}
          
          {/* <Button title="Delete All" onPress={() => setDeleteAllDialogVisible(true)} color="red" /> */}
          {/* <Text>{'DEBUG\n' + items.map((item, index) => index + ': ' + item).join(', ')}</Text> */}
        </View>
      </ScrollView>
      <Dialog.Container visible={isDialogVisible}>
        <Dialog.Title>Add Item</Dialog.Title>
        <Dialog.Input onChangeText={setNewItemName} placeholder="Enter item name" autoFocus={true} />
        <Dialog.Button label="Cancel" onPress={() => setDialogVisible(false)} />
        <Dialog.Button label="Add" onPress={addItem} />
      </Dialog.Container>
      <Dialog.Container visible={isDeleteAllDialogVisible}>
        <Dialog.Title>Delete All Items</Dialog.Title>
        <Dialog.Description>Are you sure?</Dialog.Description>
        <Dialog.Button label="Cancel" onPress={() => setDeleteAllDialogVisible(false)} />
        <Dialog.Button label="Delete All" onPress={deleteAllItems} color="red" />
      </Dialog.Container>
      <Dialog.Container visible={isItemExistsDialogVisible}>
        <Dialog.Title>Item Exists</Dialog.Title>
        <Dialog.Description>Item already in the list. Please pick a different name.</Dialog.Description>
        <Dialog.Button label="OK" onPress={() => setItemExistsDialogVisible(false)} />
      </Dialog.Container>
    </View>
  );
};

module.exports = GroceryListComponent;