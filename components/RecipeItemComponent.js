// item in recipe component

const React = require('react');
const { useState, useRef } = React;
const { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, Animated } = require('react-native');
import { Swipeable, GestureHandlerRootView } from 'react-native-gesture-handler';
import Dialog from "react-native-dialog";
const { recipeListItemStyles } = require('../styles/RecipeListStyles');
import CheckBox from "@react-native-community/checkbox";
const GroceryList = require('../services/GroceryList');

const RecipeComponent = ({ item, onDelete, onUpdate, isChecked, onCheck }) => {
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
        <View style={recipeListItemStyles.listContainer}>
          <TouchableOpacity onPress={handleEdit}>
            <Text style={recipeListItemStyles.itemName}>{item}</Text>
          </TouchableOpacity>
          <CheckBox
            value={isChecked}
            onValueChange={onCheck}
            tintColor="#bfbfbf"
            // onCheckColor="dodgerblue"
            // onTintColor="dodgerblue"
            onAnimationType="fill"
            offAnimationType="bounce"
          />
          {/* <Text style={{paddingTop: 11}}>{item}</Text> */}
          {/* <Button title="Edit" onPress={handleEdit} /> */}
          {/* <Button title="Delete" onPress={onDelete} /> */}

          <Dialog.Container visible={isDialogVisible}>
            <Dialog.Title>Edit Item</Dialog.Title>
            <Dialog.Input value={inputText} onChangeText={setInputText} autoFocus={true} />
            <Dialog.Button label="Cancel" onPress={handleCancel} />
            <Dialog.Button label="Save" onPress={handleSave} />
          </Dialog.Container>
        </View>
      </Swipeable>
      <View style={recipeListItemStyles.itemBorder} />
    </GestureHandlerRootView>
  );
};

module.exports = RecipeComponent;