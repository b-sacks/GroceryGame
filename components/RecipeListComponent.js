//stacked recipe components

// components/GroceryListComponent.js
const React = require('react');
const { useState, useEffect } = React;
const { View, Button, TextInput, Text, ScrollView } = require('react-native');
const RecipeItemComponent = require('./RecipeItemComponent');
const GroceryList = require('../services/GroceryList');
import Dialog from "react-native-dialog";
import { useFocusEffect } from '@react-navigation/native';

const RecipeListComponent = () => {

  const [newItemName, setNewItemName] = useState('');
  const [recipeList, setRecipeList] = useState(new GroceryList('recipeList'));

  const [isDialogVisible, setDialogVisible] = useState(false);
  const [isItemExistsDialogVisible, setItemExistsDialogVisible] = useState(false);
  const [isDeleteAllDialogVisible, setDeleteAllDialogVisible] = useState(false);

  const fetchItems = async () => {
    const fetchedItems = await recipeList.getItems();
    setItems(fetchedItems);
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchItems();
    }, [recipeList])
  );

  useEffect(() => {
    fetchItems();
  }, [recipeList]);

  const addRecipe = async () => {
    setDialogVisible(false);
    if (!newItemName.trim() || isInList(newItemName)) {
      setTimeout(() => {
        setItemExistsDialogVisible(true);
      }, 400);
      return;
    }
    const newList = new GroceryList(recipeID);
    await newList.addItem(newItemName);
    setNewItemName('');
    setRecipeList(newList);
  };

  return (
    <ScrollView keyboardShouldPersistTaps='always'>
      <View style={{paddingTop: 20}}>
        {items.map((item, index) => (
          <RecipeItemComponent
            key={index}
            item={item}
            onDelete={() => deleteItem(index)}
            onUpdate={(name) => updateItem(index, name)}
          />
        ))}
        <Button title="Add Recipe" onPress={ null } />

        <Dialog.Container visible={isDialogVisible}>
          <Dialog.Title>Add Item</Dialog.Title>
          <Dialog.Input onChangeText={setNewItemName} placeholder="Enter item name" autoFocus={true} />
          <Dialog.Button label="Cancel" onPress={() => setDialogVisible(false)} />
          <Dialog.Button label="Add" onPress={addRecipe} />
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
        
        <Button title="Delete All Recipes" onPress={() => setDeleteAllDialogVisible(true)} color="red" />
        <Text>{'DEBUG\n' + items.map((item, index) => index + ': ' + item).join(', ')}</Text>
      </View>
    </ScrollView>
  );
};

module.exports = RecipeListComponent;