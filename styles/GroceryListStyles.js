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
  lottie: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
    pointerEvents: 'none',
  },
});

const groceryListItemStyles = StyleSheet.create({
  listContainer: {
    ...masterStyles.listContainer,
  },
  itemName: {
    ...masterStyles.itemName,
  },
  itemBorder: {
    ...masterStyles.itemBorder,
  },
  categoryButton: {
    position: 'absolute',
    right: 32,
    marginTop: -11.5,
  },
  categoryButtonText: {
    fontSize: 18,
    color: '#0A0903',
    fontFamily: 'Avenir',
  },
});

module.exports = { groceryListStyles, groceryListItemStyles };