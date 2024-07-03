import AsyncStorage from '@react-native-async-storage/async-storage';

const addItem = async (item, key) => {
  try {
    const groceryList = await AsyncStorage.getItem(key);
    if (groceryList !== null) {
      const newGroceryList = JSON.parse(groceryList);
      newGroceryList.push(item);
      const jsonGroceryList = JSON.stringify(newGroceryList);
      await AsyncStorage.setItem(key, jsonGroceryList);
    } else {
      const jsonGroceryList = JSON.stringify([item]);
      await AsyncStorage.setItem(key, jsonGroceryList);
    }
  } catch (e) {
    console.error('Adding error:', e);
  }
  // await clearDatabase();
}

const deleteItem = async (index, key) => {
  try {
    const groceryList = await AsyncStorage.getItem(key);
    const newGroceryList = JSON.parse(groceryList);
    newGroceryList.splice(index, 1);
    const jsonGroceryList = JSON.stringify(newGroceryList);
    await AsyncStorage.setItem(key, jsonGroceryList);
  } catch (e) {
    console.error('Deleting error:', e);
  }
}

const deleteAllItems = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.error('Delete All error:', e);
  }
}

const clearDatabase = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    console.error('Clear Database error:', e);
  }
}

const updateItem = async (index, name, key) => {
  try {
    const groceryList = await AsyncStorage.getItem(key);
    const newGroceryList = JSON.parse(groceryList);
    newGroceryList[index] = name;
    const jsonGroceryList = JSON.stringify(newGroceryList);
    await AsyncStorage.setItem(key, jsonGroceryList);
  } catch (e) {
    console.error('Update Item error:', e);
  }
}

const getGroceryList = async (key) => {
  try {
    const groceryList = await AsyncStorage.getItem(key);
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