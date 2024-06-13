const AsyncStorage = require('@react-native-async-storage/async-storage');

const groceryListKey = 'groceryList';

const addItem = async (item) => {
  try {
    const groceryList = await AsyncStorage.getItem(groceryListKey);
    if (groceryList !== null) {
      const newGroceryList = JSON.parse(groceryList).push(item);
      const jsonGroceryList = JSON.stringify(newGroceryList);
      await AsyncStorage.setItem(groceryListKey, jsonGroceryList);
    } else {
      const jsonGroceryList = JSON.stringify([item]);
      await AsyncStorage.setItem(groceryListKey, jsonGroceryList);
    }
  } catch (e) {
    console.error('Adding error:', e);
  }
}

const deleteItem = async (index) => {
  try {
    const groceryList = await AsyncStorage.getItem(groceryListKey);
    const newGroceryList = JSON.parse(groceryList).splice(index, 1);
    const jsonGroceryList = JSON.stringify(newGroceryList);
    await AsyncStorage.setItem(groceryListKey, jsonGroceryList);
  } catch (e) {
    console.error('Deleting error:', e);
  }
}

const deleteAllItems = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    console.error('Delete All error:', e);
  }
}

const updateItem = async (index, name) => {
  try {
    const groceryList = await AsyncStorage.getItem(groceryListKey);
    const newGroceryList = JSON.parse(groceryList);
    newGroceryList[index] = name;
    const jsonGroceryList = JSON.stringify(newGroceryList);
    await AsyncStorage.setItem(groceryListKey, jsonGroceryList);
  } catch (e) {
    console.error('Update Item error:', e);
  }
}

const getGroceryList = async () => {
  try {
    const groceryList = await AsyncStorage.getItem(groceryListKey);
    if (groceryList !== null) {
      return JSON.parse(groceryList);
    } else {
      return [];
    }
  } catch (e) {
    console.error('Get Grocery List error:', e);
  }
}

module.exports = {getGroceryList, addItem, deleteItem, deleteAllItems, updateItem};