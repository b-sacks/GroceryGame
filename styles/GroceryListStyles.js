import { StyleSheet } from 'react-native';
import masterStyles from './masterStyles';

const groceryListStyles = StyleSheet.create({
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
  clearAllButton: {
    ...masterStyles.clearAllButton,
  },
  clearAllButtonText: {
    ...masterStyles.clearAllButtonText,
  },
  clearCheckedButton: {
    ...masterStyles.clearCheckedButton,
    marginTop: 31,
  },
  clearCheckedButtonText: {
    ...masterStyles.clearCheckedButtonText,
  },
  listMap: {
    ...masterStyles.listMap,
  },
});

const groceryListItemStyles = StyleSheet.create({
  listContainer: {
    ...masterStyles.listContainer,
  },
  itemName: {
    ...masterStyles.itemName,
  },
});

module.exports = { groceryListStyles, groceryListItemStyles };