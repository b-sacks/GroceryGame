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

const recipeListItemStyles = StyleSheet.create({
  listContainer: {
    ...masterStyles.listContainer,
  },
  itemName: {
    ...masterStyles.itemName,
  },
});

module.exports = { recipeListStyles, recipeListItemStyles };