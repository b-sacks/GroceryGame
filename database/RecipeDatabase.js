const GroceryList = require('../services/GroceryList');
import AsyncStorage from '@react-native-async-storage/async-storage';
const { getGroceryList, deleteAllItems } = require('./GroceryListDatabase');

const getRecipes = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    if (keys === null) {
      return [];
    }
    const filteredKeys = keys.filter(key => key !== 'groceryList' && key !== 'masterList' && key !== 'checked');
    const recipes = [];
    for (let i = 0; i < filteredKeys.length; i++) {
      const recipe = await getGroceryList(filteredKeys[i]);
      const groceryList = new GroceryList(filteredKeys[i]);
      await groceryList.deleteAllItems();
      for (let j = 0; j < recipe.length; j++) {
        await groceryList.addItem(recipe[j]);
      }
      recipes.push(groceryList);
    }
    return recipes;
  } catch (e) {
    console.error('Get Recipes error:', e);
  }
}

const deleteRecipe = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.error('Delete Recipe error:', e);
  }
}

module.exports = {getRecipes, deleteRecipe};