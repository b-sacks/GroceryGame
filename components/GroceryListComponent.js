// components/GroceryListComponent.js
const React = require('react');
const { useState, useEffect, useRef } = React;
const { View, Button, TextInput, Text, ScrollView, StyleSheet, TouchableOpacity } = require('react-native');
const GroceryItemComponent = require('./GroceryItemComponent');
const GroceryList = require('../services/GroceryList');
import Dialog from "react-native-dialog";
import { useFocusEffect } from '@react-navigation/native';
const { groceryListStyles } = require('../styles/GroceryListStyles');
import LottieView from 'lottie-react-native';
const CategoryComponent = require('./CategoryComponent');

const GroceryListComponent = () => {
  const [newItemName, setNewItemName] = useState('');
  const [groceryList, setGroceryList] = useState(new GroceryList('groceryList'));
  const [checkedGroceryList, setCheckedGroceryList] = useState(new GroceryList('checked'));
  const [isDialogVisible, setDialogVisible] = useState(false);
  const [isItemExistsDialogVisible, setItemExistsDialogVisible] = useState(false);
  const [isDeleteAllDialogVisible, setDeleteAllDialogVisible] = useState(false);
  const [items, setItems] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);
  const [chosenConfettiFile, setChosenConfettiFile] = useState('');
  const [itemsByCategory, setItemsByCategory] = useState({'Other': []});

  const fetchItems = async () => {
    const fetchedItems = await groceryList.getItems();
    setItems(fetchedItems);
    // setItemsByCategory({'Other': await (new GroceryList('groceryList')).getItems()});
    setItemsByCategory({'Baby': await (new GroceryList('Baby')).getItems(),
                        'Bakery': await (new GroceryList('Bakery')).getItems(),
                        'Baking': await (new GroceryList('Baking')).getItems(),
                        'Beverages': await (new GroceryList('Beverages')).getItems(),
                        'Breakfast': await (new GroceryList('Breakfast')).getItems(),
                        'Canned Goods': await (new GroceryList('Canned Goods')).getItems(),
                        'Condiments': await (new GroceryList('Condiments')).getItems(),
                        'Dairy': await (new GroceryList('Dairy')).getItems(),
                        'Deli': await (new GroceryList('Deli')).getItems(),
                        'Desserts': await (new GroceryList('Desserts')).getItems(),
                        'Dressings': await (new GroceryList('Dressings')).getItems(),
                        'Frozen': await (new GroceryList('Frozen')).getItems(),
                        'Grains & Pasta': await (new GroceryList('Grains & Pasta')).getItems(),
                        'Health': await (new GroceryList('Health')).getItems(),
                        'Household': await (new GroceryList('Household')).getItems(),
                        'Meat': await (new GroceryList('Meat')).getItems(),
                        'Office': await (new GroceryList('Office')).getItems(),
                        'Personal Care': await (new GroceryList('Health')).getItems(),
                        'Pet': await (new GroceryList('Pet')).getItems(),
                        'Produce': await (new GroceryList('Produce')).getItems(),
                        'Seafood': await (new GroceryList('Seafood')).getItems(),
                        'Snacks': await (new GroceryList('Snacks')).getItems(),
                        'Spices': await (new GroceryList('Spices')).getItems(),
                        'Travel': await (new GroceryList('Travel')).getItems(),
                        'Wine & Beer': await (new GroceryList('Wine & Beer')).getItems(),
                        'Other': await (new GroceryList('groceryList')).getItems()
    });

    const fetchedCheckedItems = await checkedGroceryList.getItems();
    setCheckedItems(fetchedCheckedItems);
    setCheckedGroceryList(new GroceryList('checked'));

    for (const checkedItem of fetchedCheckedItems) {
      // string validation
      const parsedCheckedItem = checkedItem.trim().toLowerCase();
      if (!fetchedItems.map(i => i.trim().toLowerCase()).includes(parsedCheckedItem)) {
        // fetch new checked list for updating on time
        const newCheckedGroceryList = new GroceryList('checked');
        const newCheckedItems = await newCheckedGroceryList.getItems();
        await newCheckedGroceryList.deleteItem(newCheckedItems.indexOf(checkedItem));
        newCheckedItems.filter(i => i !== checkedItem);
        setCheckedItems(newCheckedItems);
        setCheckedGroceryList(new GroceryList('checked'));
      }
    }
    //update checked list again
    const updatedCheckedItems = await checkedGroceryList.getItems();
    setCheckedItems(updatedCheckedItems);
  };

  const handleCheck = async (item, isChecked) => {
    const newCheckedGroceryList = new GroceryList('checked');
    if (isChecked) {
      setCheckedItems([...checkedItems, item]);
      await newCheckedGroceryList.addItem(item);
    } else {
      setCheckedItems(checkedItems.filter(i => i !== item));
      await newCheckedGroceryList.deleteItem(checkedItems.indexOf(item));
    }
    setCheckedGroceryList(newCheckedGroceryList);
    const newerCheckedGroceryList = new GroceryList('checked');
    const newerCheckedItems = await newerCheckedGroceryList.getItems(item);
    if (items.length === newerCheckedItems.length && items.length !== 0) {
      setChosenConfettiFile(confettiFiles[Math.floor(Math.random() * confettiFiles.length)]);
      triggerConfetti();
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

    const itemName = items[index];
    setCheckedItems(checkedItems.filter(i => i !== itemName));
    const newCheckedGroceryList = new GroceryList('checked');
    const i = checkedItems.indexOf(itemName);
    await newCheckedGroceryList.deleteItem(i);
    setCheckedGroceryList(newCheckedGroceryList);
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
    fetchItems();
  };

  const deleteAllItems = async () => {
    setDeleteAllDialogVisible(false);
    const newList = new GroceryList('groceryList');
    await newList.deleteAllItems();
    setGroceryList(newList);
    await uncheckAllItems();
  }

  const uncheckAllItems = async () => {
    setCheckedItems([]);
    await checkedGroceryList.deleteAllItems();
    setCheckedGroceryList(new GroceryList('checked'));
  };

  // const checkAllItems = () => {
  //   setCheckedItems(items);
  // }

  const clearCheckedItems = async () => {
    fetchItems();
    const newList = new GroceryList('groceryList');
    for (const item of checkedItems) {
      const index = items.indexOf(item);
      await newList.deleteItem(index);
    }
    await uncheckAllItems();
    setGroceryList(new GroceryList('groceryList'));
  }

  const isInList = (name) => {
    name = name.trim().toLowerCase();
    return items.map(i => i.trim().toLowerCase()).includes(name);
  }

  const confettiRef = useRef(null);
  const confettiFiles = [
    require('../assets/confetti1.json'),
    require('../assets/confetti2.json'),
    require('../assets/confetti3.json')
  ];

  const triggerConfetti = () => {
    confettiRef.current?.play(0);
  };

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
        {Object.keys(itemsByCategory).map((category) => (
          itemsByCategory[category].length !== 0 && (
            <View key={category}>
              <CategoryComponent categoryName={category} />
              <View style={groceryListStyles.listMap}>
                {itemsByCategory[category].map((item, index) => (
                  <GroceryItemComponent
                    key={`${index}-${items.length}`}
                    item={item}
                    onDelete={() => deleteItem(index)}
                    onUpdate={(name) => updateItem(index, name)}
                    onCheck={(isChecked) => handleCheck(item, isChecked)}
                    isChecked={checkedItems.includes(item)}
                  />
                ))}
              </View>
            </View>
          )
        ))}
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
      <LottieView
        ref={confettiRef}
        source={chosenConfettiFile}
        autoPlay={false}
        loop={false}
        style={groceryListStyles.lottie}
        resizeMode='cover'
      />
    </View>
  );
};

module.exports = GroceryListComponent;