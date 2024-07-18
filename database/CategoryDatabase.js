const GroceryList = require('../services/GroceryList');
import AsyncStorage from '@react-native-async-storage/async-storage';
const { getGroceryList } = require('./GroceryListDatabase');
const { getRecipes } = require('./RecipeDatabase');

const getCategories = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    if (keys === null) {
      return [];
    }
    const basicFilteredKeys = keys.filter(key => key !== 'groceryList' && key !== 'masterList' && key !== 'checked');
    const recipes = await getRecipes();
    const recipeKeys = recipes.map(recipe => recipe.key);

    const filteredKeys = basicFilteredKeys.filter(key => !recipeKeys.includes(key));
    const categories = [];
    for (let i = 0; i < filteredKeys.length; i++) {
      const category = await getGroceryList(filteredKeys[i]);
      const groceryList = new GroceryList(filteredKeys[i]);
      await groceryList.deleteAllItems();
      for (let j = 0; j < category.length; j++) {
        await groceryList.addItem(category[j]);
      }
      categories.push(groceryList);
    }
    return categories;
  } catch (e) {
    console.error('Get Categories error:', e);
  }
}

const deleteCategory = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.error('Delete Category error:', e);
  }
}

module.exports = {getCategories, deleteCategory};