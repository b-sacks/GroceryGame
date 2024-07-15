// individual recipe

// components/GroceryListComponent.js
const React = require('react');
const { useState, useEffect } = React;
const { View, Button, TextInput, Text, ScrollView, TouchableOpacity } = require('react-native');
const RecipeItemComponent = require('./RecipeItemComponent');
const GroceryList = require('../services/GroceryList');
import Dialog from "react-native-dialog";
import { useFocusEffect } from '@react-navigation/native';
const { recipeStyles } = require('../styles/RecipeListStyles');

const RecipeComponent = ({ onDeleteRecipe, recipeName }) => {
  const [newItemName, setNewItemName] = useState('');
  const [groceryList, setGroceryList] = useState(new GroceryList(recipeName));
  const [items, setItems] = useState([]);
  const [isRecipeInGroceryList, setIsRecipeInGroceryList] = useState(false);
  const [checked, setChecked] = useState(false);
  
  const [isDialogVisible, setDialogVisible] = useState(false);
  const [isItemExistsDialogVisible, setItemExistsDialogVisible] = useState(false);
  const [isDeleteAllDialogVisible, setDeleteAllDialogVisible] = useState(false);
  const [isDeleteRecipeDialogVisible, setDeleteRecipeDialogVisible] = useState(false);

  const [gItems, setGItems] = useState([]);

  const fetchItems = async () => {
    const fetchedItems = await groceryList.getItems();
    setItems(fetchedItems);

    const gList = new GroceryList('groceryList');
    const fetchedGItems = await gList.getItems();
    setGItems(fetchedGItems);
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchItems();
      isInGroceryList();
    }, [groceryList, isRecipeInGroceryList, checked])
  );

  // useEffect(() => {
  //   fetchItems();
  //   isInGroceryList();
  // }, [groceryList, isRecipeInGroceryList]);

  const addItem = async () => {
    setDialogVisible(false);
    if (!newItemName.trim() || isInList(newItemName)) {
      setTimeout(() => {
        setItemExistsDialogVisible(true);
      }, 400);
      return;
    }
    const newList = new GroceryList(recipeName);
    await newList.addItem(newItemName);
    setNewItemName('');
    await fetchItems();
    setGroceryList(newList);
  };

  const deleteItem = async (index) => {
    const newList = new GroceryList(recipeName);
    await newList.deleteItem(index);
    await fetchItems();
    setGroceryList(newList);
  };

  function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

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
    const newList = new GroceryList(recipeName);
    await newList.updateItem(index, name);
    await fetchItems();
    setGroceryList(newList);
  };

  const deleteAllItems = async () => {
    setDeleteAllDialogVisible(false);
    const newList = new GroceryList(recipeName);
    await newList.deleteAllItems();
    await fetchItems();
    setGroceryList(newList);
  }

  const isInList = (name) => {
    // not case sensitive or whitespace sensitive
    name = name.trim().toLowerCase();
    return items.map(i => i.trim().toLowerCase()).includes(name);
  }

  const addToGroceryList = async () => {
    const groceryList = new GroceryList('groceryList');
    const groceryListItems = await groceryList.getItems();
    const itemsToAdd = items.filter(item => !groceryListItems.includes(item));
    for (const item of itemsToAdd) {
      await groceryList.addItem(item);
    }
    setIsRecipeInGroceryList(true);
  }

  const isInGroceryList = async () => {
    await fetchItems();
    const groceryList = new GroceryList('groceryList');
    const groceryListItems = await groceryList.getItems();
    for (const item of items) {
      //validfation here
      if (!groceryListItems.includes(item)) {
        setIsRecipeInGroceryList(false);
        return;
      }
    }
    setIsRecipeInGroceryList(true);
    return;
  }
  const handleCheck = async (item, isChecked) => {
    const newGroceryList = new GroceryList('groceryList');
    if (isChecked) {
      await newGroceryList.addItem(item);
    } else {
      const groceryListItems = await newGroceryList.getItems();
      await newGroceryList.deleteItem(groceryListItems.indexOf(item));
    }
    setChecked(!checked);
  };

  const isItemGroceryList = (name) => {
    name = name.trim().toLowerCase();
    return gItems.map(i => i.trim().toLowerCase()).includes(name);
  }

  return (
    <View keyboardShouldPersistTaps='always' style={recipeStyles.recipeContainer}>
      <View style={recipeStyles.header}>
        <View style={recipeStyles.deleteRecipeButton}>
          <TouchableOpacity style={recipeStyles.deleteRecipeButton} onPress={() => setDeleteRecipeDialogVisible(true)}>
            <Text style={recipeStyles.deleteRecipeButtonText}>Delete Recipe</Text>
          </TouchableOpacity>
        </View>
        <View style={recipeStyles.addToListButton}>
          <TouchableOpacity style={recipeStyles.addToListButton} onPress={addToGroceryList} disabled={isRecipeInGroceryList}>
            <Text style={[recipeStyles.addToListButtonText, isRecipeInGroceryList && recipeStyles.addToListButtonDisabled]}>
              {isRecipeInGroceryList ? "Already In Grocery List": "Add To Grocery List"}
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={recipeStyles.recipeName}>{recipeName}</Text>
        <View style={recipeStyles.addButton}>
          <TouchableOpacity style={recipeStyles.addButton} onPress={() => setDialogVisible(true)}>
            <Text style={recipeStyles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={recipeStyles.listMap}>
        {items.map((item, index) => (
          <RecipeItemComponent
            key={`${index}-${items.length}`}
            item={item}
            onDelete={() => deleteItem(index)}
            onUpdate={(name) => updateItem(index, name)}
            onCheck={(isChecked) => handleCheck(item, isChecked)}
            isChecked={isItemGroceryList(item)}
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
        <Dialog.Container visible={isDeleteRecipeDialogVisible}>
          <Dialog.Title>Delete Recipe</Dialog.Title>
          <Dialog.Description>Are you sure?</Dialog.Description>
          <Dialog.Button label="Cancel" onPress={() => setDeleteRecipeDialogVisible(false)} />
          <Dialog.Button label="Delete" onPress={onDeleteRecipe} color="red" />
        </Dialog.Container>
        <Dialog.Container visible={isItemExistsDialogVisible}>
          <Dialog.Title>Item Exists</Dialog.Title>
          <Dialog.Description>Item already in the list. Please pick a different name.</Dialog.Description>
          <Dialog.Button label="OK" onPress={() => setItemExistsDialogVisible(false)} />
        </Dialog.Container>

        {/* <Button
          title={isRecipeInGroceryList ? "Recipe Already In Grocery List": "Add Recipe To Grocery List"}
          onPress={addToGroceryList}
          disabled={isRecipeInGroceryList}
        /> */}
        {/* <Button title="Delete All Items From Recipe" onPress={() => setDeleteAllDialogVisible(true)} color="red" /> */}
        {/* <Button title="Delete Recipe" onPress={() => setDeleteRecipeDialogVisible(true)} color="red" /> */}
        {/* <Text>{'DEBUG\n' + items.map((item, index) => index + ': ' + item).join(', ')}</Text> */}
      </View>
    </View>
  );
};

module.exports = RecipeComponent;