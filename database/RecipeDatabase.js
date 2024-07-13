const GroceryList = require('../services/GroceryList');
import AsyncStorage from '@react-native-async-storage/async-storage';
const { getGroceryList, deleteAllItems } = require('./GroceryListDatabase');

const getRecipes = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    if (keys === null) {
      return [];
    }
    keys.splice(keys.indexOf('groceryList'), 1);
    keys.splice(keys.indexOf('masterList'), 1);
    keys.splice(keys.indexOf('checked'), 1);
    const recipes = [];
    for (let i = 0; i < keys.length; i++) {
      const recipe = await getGroceryList(keys[i]);
      const groceryList = new GroceryList(keys[i]);
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