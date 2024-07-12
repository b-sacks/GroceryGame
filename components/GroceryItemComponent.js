// components/ItemComponent.js
const React = require('react');
const { useState, useRef } = React;
const { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, Animated, Dimensions } = require('react-native');
import { Swipeable, GestureHandlerRootView } from 'react-native-gesture-handler';
import Dialog from "react-native-dialog";
import CheckBox from "@react-native-community/checkbox";
const { groceryListItemStyles } = require('../styles/GroceryListStyles');

const GroceryItemComponent = ({ item, onDelete, onUpdate, isChecked, onCheck }) => {
  const [isDialogVisible, setDialogVisible] = useState(false);
  const [inputText, setInputText] = useState('');

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

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Swipeable renderRightActions={renderSwipe} onSwipeableOpen={onDelete}>
        <View style={groceryListItemStyles.listContainer}>
          <TouchableOpacity onPress={handleEdit}>
            <Text style={groceryListItemStyles.itemName}>{item}</Text>
          </TouchableOpacity>
          {/* <Button title="Edit" onPress={handleEdit} /> */}
          {/* <Button title="Delete" onPress={onDelete} /> */}
          <CheckBox
            value={isChecked}
            onValueChange={onCheck}
          />

          <Dialog.Container visible={isDialogVisible}>
            <Dialog.Title>Edit Item</Dialog.Title>
            <Dialog.Input value={inputText} onChangeText={setInputText} autoFocus={true} />
            <Dialog.Button label="Cancel" onPress={handleCancel} />
            <Dialog.Button label="Save" onPress={handleSave} />
          </Dialog.Container>
        </View>
      </Swipeable>
    </GestureHandlerRootView>
  );
};

module.exports = GroceryItemComponent;