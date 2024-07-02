//stacked recipe components

// components/GroceryListComponent.js
const React = require('react');
const { useState, useEffect } = React;
const { View, Button, TextInput, Text, ScrollView } = require('react-native');
const RecipeComponent = require('./RecipeComponent');
const GroceryList = require('../services/GroceryList');
import Dialog from "react-native-dialog";
const { getRecipes } = require('../database/GroceryListDatabase');

const RecipeListComponent = () => {

  const [newRecipeName, setNewRecipeName] = useState('');
  const [isDialogVisible, setDialogVisible] = useState(false);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      const fetchedRecipes = await getRecipes();
      setRecipes(fetchedRecipes);
    };

    fetchRecipes();
  }, []);

  const addRecipe = async () => {
    if (!newRecipeName.trim()) {
      // Optionally handle validation or feedback here
      return;
    }
    const newList = new GroceryList(newRecipeName);
    setRecipes([...recipes, newList]);
    setNewRecipeName('');
    setDialogVisible(false);
  };

  // const fetchItems = async () => {
  //   const fetchedItems = await recipeList.getItems();
  //   setItems(fetchedItems);
  // };

  // useFocusEffect(
  //   React.useCallback(() => {
  //     fetchItems();
  //   }, [recipeList])
  // );

  // useEffect(() => {
  //   fetchItems();
  // }, [recipeList]);

  // const addRecipe = async () => {
  //   setDialogVisible(false);
  //   if (!newItemName.trim() || isInList(newItemName)) {
  //     setTimeout(() => {
  //       setItemExistsDialogVisible(true);
  //     }, 400);
  //     return;
  //   }
  //   const newList = new GroceryList(recipeID);
  //   await newList.addItem(newItemName);
  //   setNewItemName('');
  //   setRecipeList(newList);
  // };

  return (
    <ScrollView keyboardShouldPersistTaps='always'>
      <View style={{paddingTop: 20}}>
        {recipes.map((groceryList, index) => (
          <RecipeComponent
            key={index}
            onDeleteRecipe={() => {
              const newRecipes = recipes.filter((_, i) => i !== index);
              setRecipes(newRecipes);
            }}
            recipeName={groceryList.key}
          />
        ))}
        <Button title="Add Recipe" onPress={() => setDialogVisible(true)} />

        <Dialog.Container visible={isDialogVisible}>
          <Dialog.Title>Add Recipe</Dialog.Title>
          <Dialog.Input
            onChangeText={setNewRecipeName}
            placeholder="Enter recipe name"
            autoFocus={true}
          />
          <Dialog.Button label="Cancel" onPress={() => setDialogVisible(false)} />
          <Dialog.Button label="Add" onPress={addRecipe} />
        </Dialog.Container>
      </View>
    </ScrollView>
  );
};

module.exports = RecipeListComponent;