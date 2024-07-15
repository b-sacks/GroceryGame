// components/ItemComponent.js
const React = require('react');
const { useState, useEffect } = React;
const { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, Animated } = require('react-native');
import { Swipeable, GestureHandlerRootView } from 'react-native-gesture-handler';
import Dialog from "react-native-dialog";
const { masterListItemStyles } = require('../styles/MasterListStyles');
const GroceryList = require('../services/GroceryList');
import { useFocusEffect } from '@react-navigation/native';

const MasterItemComponent = ({ item, onDelete, onUpdate, onAddToGroceryList }) => {
  const [isDialogVisible, setDialogVisible] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isItemInGroceryList, setItemInGroceryList] = useState(false);

  // useEffect(() => {
  //   const fetchItems = async () => {
  //     isInGroceryList();
  //   };
  //   fetchItems();
  // }, [isItemInGroceryList]);
  const fetchItems = async () => {
    isInGroceryList();
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchItems();
    }, [isItemInGroceryList])
  );

  const handleEdit = () => {
    setDialogVisible(true);
    setInputText(item);
  };

  const handleSave = () => {
    setDialogVisible(false);
    onUpdate(inputText);
  };

  const handleCancel = () => {
    setDialogVisible(false);
    setTimeout(() => {
      setInputText('');
    }, 400);
  };

  const renderSwipe = () => {
    return (
      <Animated.View style={{ flex: 1}}>
      </Animated.View>
    );
  };

  const isInGroceryList = async () => {
    const groceryList = new GroceryList('groceryList');
    const items = await groceryList.getItems();
    setItemInGroceryList(items.includes(item));
    return items.includes(item);
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Swipeable renderRightActions={renderSwipe} onSwipeableOpen={onDelete}>
        <View style={masterListItemStyles.listContainer}>
          <TouchableOpacity onPress={handleEdit}>
            <Text style={masterListItemStyles.itemName}>{item}</Text>
          </TouchableOpacity>
          {/* <Button title="Edit" onPress={handleEdit} /> */}
          {/* <View style={masterListItemStyles.addToListButton}>
            <TouchableOpacity style={masterListItemStyles.addToListButton} onPress={onAddToGroceryList}>
              <Text style={masterListItemStyles.addToListButtonText}>Add to Grocery List</Text>
            </TouchableOpacity>
          </View> */}
          <View style={masterListItemStyles.addToListButton}>
            <TouchableOpacity style={masterListItemStyles.addToListButton} onPress={onAddToGroceryList} disabled={isItemInGroceryList}>
              <Text style={[masterListItemStyles.addToListButtonText, isItemInGroceryList && masterListItemStyles.addToListButtonDisabled]}>
                {isItemInGroceryList ? "Already In Grocery List": "Add To Grocery List"}
              </Text>
            </TouchableOpacity>
          </View>
          {/* <Button title="Add to Grocery List" onPress={onAddToGroceryList} /> */}
          {/* <Button title="Delete" onPress={onDelete} /> */}
          
          <Dialog.Container visible={isDialogVisible}>
            <Dialog.Title>Edit Item</Dialog.Title>
            <Dialog.Input value={inputText} onChangeText={setInputText} autoFocus={true} />
            <Dialog.Button label="Cancel" onPress={handleCancel} />
            <Dialog.Button label="Save" onPress={handleSave} />
          </Dialog.Container>
        </View>
    </Swipeable>
    <View style={masterListItemStyles.itemBorder} />
  </GestureHandlerRootView>
  );
};

module.exports = MasterItemComponent;