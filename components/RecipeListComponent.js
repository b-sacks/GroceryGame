//stacked recipe components

// components/GroceryListComponent.js
const React = require('react');
const { useState, useEffect } = React;
const { View, Button, TextInput, Text, ScrollView, StyleSheet, TouchableOpacity } = require('react-native');
const RecipeComponent = require('./RecipeComponent');
const GroceryList = require('../services/GroceryList');
import Dialog from "react-native-dialog";
const { getRecipes, deleteRecipe } = require('../database/RecipeDatabase');
import { useFocusEffect } from '@react-navigation/native';
const { recipeListStyles } = require('../styles/RecipeListStyles');

const RecipeListComponent = () => {

  const [newRecipeName, setNewRecipeName] = useState('');
  const [isDialogVisible, setDialogVisible] = useState(false);
  const [recipes, setRecipes] = useState([]);

  const fetchRecipes = async () => {
    const fetchedRecipes = await getRecipes();
    setRecipes(fetchedRecipes);
  };

  // useFocusEffect(
  //   React.useCallback(() => {
  //     fetchRecipes();
  //   }, [])
  // );

  useEffect(() => {
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

  return (
    <View style={{flex: 1}}>
      <View style={recipeListStyles.header}>
        <Text style={recipeListStyles.title}>Recipes</Text>
        <View style={recipeListStyles.addButton}>
          <TouchableOpacity style={recipeListStyles.addButton} onPress={() => setDialogVisible(true)}>
            <Text style={recipeListStyles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView keyboardShouldPersistTaps='always' backgroundColor='#F0F0E3'>
        <View>
          {recipes.map((groceryList, index) => (
            <RecipeComponent
              key={`${index}-${recipes.length}`}
              onDeleteRecipe={async () => {
                const newRecipes = recipes.filter((_, i) => i !== index);
                setRecipes(newRecipes);
                await deleteRecipe(groceryList.key);
              }}
              recipeName={groceryList.key}
            />
          ))}
          {/* <Button title="Add Recipe" onPress={() => setDialogVisible(true)} /> */}

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
    </View>
  );
};

module.exports = RecipeListComponent;