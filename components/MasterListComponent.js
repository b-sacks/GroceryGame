// components/GroceryListComponent.js
const React = require('react');
const { useState, useEffect } = React;
const { View, Button, TextInput, Text, ScrollView, StyleSheet, TouchableOpacity } = require('react-native');
const ItemComponent = require('./ItemComponent');
const MasterItemComponent = require('./MasterItemComponent');
const GroceryList = require('../services/GroceryList');
import Dialog from "react-native-dialog";

const MasterListComponent = () => {
  const [newItemName, setNewItemName] = useState('');
  const [groceryList, setGroceryList] = useState(new GroceryList('masterList'));
  const [isDialogVisible, setDialogVisible] = useState(false);
  const [isItemExistsDialogVisible, setItemExistsDialogVisible] = useState(false);
  const [itemExistsDialogMessage, setItemExistsDialogMessage] = useState('');
  const [isDeleteAllDialogVisible, setDeleteAllDialogVisible] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const fetchedItems = await groceryList.getItems();
      setItems(fetchedItems);
    };

    fetchItems();
  }, [groceryList]);

  const addItem = async () => {
    setDialogVisible(false);
    if (!newItemName.trim() || isInList(newItemName)) {
      setTimeout(() => {
        setItemExistsDialogMessage('Item already in the master list. Please pick a different name.');
        setItemExistsDialogVisible(true);
      }, 400);
      return;
    }
    const newList = new GroceryList('masterList');
    await newList.addItem(newItemName);
    setNewItemName('');
    setGroceryList(newList);
  };

  const deleteItem = async (index) => {
    const newList = new GroceryList('masterList');
    await newList.deleteItem(index);
    setGroceryList(newList);
  };

  const updateItem = async (index, name) => {
    if (items[index] === name) {
      return;
    }

    if (isInList(name)) {
      setTimeout(() => {
        setItemExistsDialogMessage('Item already in the master list. Please pick a different name.');
        setItemExistsDialogVisible(true);
      }, 400);
      return;
    }
    const newList = new GroceryList('masterList');
    await newList.updateItem(index, name);
    setGroceryList(newList);
  };

  const deleteAllItems = async () => {
    setDeleteAllDialogVisible(false);
    const newList = new GroceryList('masterList');
    await newList.deleteAllItems();
    setGroceryList(newList);
  }

  const addToGroceryList = async (index) => {
    const groceryList = new GroceryList('groceryList');
    const item = items[index];
    trimmed = item.trim().toLowerCase();
    const groceryItems = await groceryList.getItems();
    if (groceryItems.map(i => i.trim().toLowerCase()).includes(trimmed)) {
      setItemExistsDialogMessage('Item already in the grocery list. Please pick a different name.');
      setItemExistsDialogVisible(true);
      return;
    }
    await groceryList.addItem(item);
  }

  const isInList = (name) => {
    // not case sensitive or whitespace sensitive
    name = name.trim().toLowerCase();
    return items.map(i => i.trim().toLowerCase()).includes(name);
  }

  return (
    <View style={{flex: 1}}>
      <View style={styles.header}>
        <View style={styles.clearAllButton}>
          <TouchableOpacity style={styles.clearAllButton} onPress={() => setDeleteAllDialogVisible(true)}>
            <Text style={styles.clearAllButtonText}>Clear All</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>Master List</Text>
        <View style={styles.addButton}>
          <TouchableOpacity style={styles.addButton} onPress={() => setDialogVisible(true)}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView keyboardShouldPersistTaps='always'>
        <View style={{paddingTop: 20}}>
          {items.map((item, index) => (
            <MasterItemComponent
              key={index}
              item={item}
              onDelete={() => deleteItem(index)}
              onUpdate={(name) => updateItem(index, name)}
              onAddToGroceryList={() => addToGroceryList(index)}
            />
          ))}
          {/* <Button title="Add Item" onPress={() => setDialogVisible(true)} /> */}
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
            <Dialog.Description>{itemExistsDialogMessage}</Dialog.Description>
            <Dialog.Button label="OK" onPress={() => setItemExistsDialogVisible(false)} />
          </Dialog.Container>
          {/* <Button title="Delete All" onPress={() => setDeleteAllDialogVisible(true)} color="red" /> */}
          {/* <Text>{'DEBUG\n' + items.map((item, index) => index + ': ' + item).join(', ')}</Text> */}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 110,
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
    backgroundColor: 'white',
    borderWidth: 0.1,
    borderColor: 'gray',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0.5 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    },
  title: {
    position: 'absolute', // Make sure text is centered absolutely
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 50,
  },
  addButton: {
    position: 'absolute',
    right: 15,
    marginTop: 1,
  },
  addButtonText: {
    fontSize: 35, // Set your desired font size here
    fontWeight: 'bold',
    color: 'blue',
  },
  clearAllButton: {
    position: 'absolute',
    left: 8,
    marginTop: 19,
  },
  clearAllButtonText: {
    fontSize: 13, // Set your desired font size here
    fontWeight: 'bold',
    color: 'red',
  },
  
});

module.exports = MasterListComponent;