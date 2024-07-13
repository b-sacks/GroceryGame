import { StyleSheet } from 'react-native';
import masterStyles from './masterStyles';

const recipeListStyles = StyleSheet.create({
  header: {
    ...masterStyles.header,
  },
  title: {
    ...masterStyles.title,
  },
  addButton: {
    ...masterStyles.addButton,
  },
  addButtonText: {
    ...masterStyles.addButtonText,
  },
});

const recipeStyles = StyleSheet.create({
  header: {
    height: 60,
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
    // backgroundColor: '#DDDDC1',
    borderBottomWidth: 0.2,
    borderColor: 'gray',
    borderBottomStartRadius: 15,
    borderBottomEndRadius: 15,
  },
  recipeName: {
    ...masterStyles.title,
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'regular',
    paddingTop: 0,
  },
  deleteRecipeButton:
  {
    ...masterStyles.clearAllButton,
    marginTop: -20,
  },
  deleteRecipeButtonText: {
    ...masterStyles.clearAllButtonText,
  },
  addToListButton: {
    ...masterStyles.clearCheckedButton,
    marginTop: 10,
  },
  addToListButtonDisabled : {
    color: 'gray',
  },
  addToListButtonText: {
    ...masterStyles.clearCheckedButtonText,
  },
  addButton: {
    ...masterStyles.addButton,
    marginTop: -23,
  },
  addButtonText: {
    ...masterStyles.addButtonText,
    fontWeight: 'regular',
  },
  listMap: {
    ...masterStyles.listMap,
    paddingTop: 0,
  },
  recipeContainer: {
    ...masterStyles.listMap,
    // paddingTop: 0,
  },
});

const recipeListItemStyles = StyleSheet.create({
  listContainer: {
    ...masterStyles.listContainer,
  },
  itemName: {
    ...masterStyles.itemName,
  },
  itemBorder: {
    ...masterStyles.itemBorder,
  },
});

module.exports = { recipeListStyles, recipeStyles, recipeListItemStyles };