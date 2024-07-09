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
      <View style={styles.header}>
        <Text style={styles.title}>Recipes</Text>
        <View style={styles.addButton}>
          <TouchableOpacity style={styles.addButton} onPress={() => setDialogVisible(true)}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView keyboardShouldPersistTaps='always'>
        <View style={{paddingTop: 20}}>
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
  
});

module.exports = RecipeListComponent;