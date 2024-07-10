// components/ItemComponent.js
const React = require('react');
const { useState, useRef } = React;
const { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, Animated } = require('react-native');
import { Swipeable, GestureHandlerRootView } from 'react-native-gesture-handler';
import Dialog from "react-native-dialog";

const MasterItemComponent = ({ item, onDelete, onUpdate, onAddToGroceryList }) => {
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
        <View style={styles.container}>
          <TouchableOpacity onPress={handleEdit}>
            <Text style={styles.nameButtonText}>{item}</Text>
          </TouchableOpacity>
          {/* <Button title="Edit" onPress={handleEdit} /> */}
          <View style={styles.addToListButton}>
            <TouchableOpacity style={styles.addToListButton} onPress={onAddToGroceryList}>
              <Text style={styles.addToListButtonText}>Add to Grocery List</Text>
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
  </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    // paddingVertical: 6,
    height: 44.5,
    alignItems: 'center',
    borderWidth: 0.2,
    borderColor: 'gray',
  },
  nameButtonText: {
    fontSize: 17,
  },
  addToListButton: {
    
  },
  addToListButtonText: {
    fontSize: 17,
    color: 'blue',
    fontWeight: 'bold',
  },
});

module.exports = MasterItemComponent;