import { StyleSheet } from 'react-native';
import masterStyles from './masterStyles';

const masterListStyles = StyleSheet.create({
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
    marginTop: 20,
  },
  clearAllButtonText: {
    ...masterStyles.clearAllButtonText,
  },
  listMap: {
    ...masterStyles.listMap,
  },
});

const masterListItemStyles = StyleSheet.create({
  listContainer: {
    ...masterStyles.listContainer,
  },
  itemName: {
    ...masterStyles.itemName,
  },
  addToListButton: {
  },
  addToListButtonText: {
    fontSize: 13,
    color: '#2F52E0',
    fontWeight: 'bold',
  },
});

module.exports = { masterListStyles, masterListItemStyles };