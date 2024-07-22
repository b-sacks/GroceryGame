// components/ItemComponent.js
const React = require('react');
const { useState, useRef } = React;
const { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, Animated, Dimensions } = require('react-native');
import { Swipeable, GestureHandlerRootView } from 'react-native-gesture-handler';
import Dialog from "react-native-dialog";
import CheckBox from "@react-native-community/checkbox";
const { groceryListItemStyles } = require('../styles/GroceryListStyles');
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SelectDropdown from 'react-native-select-dropdown'

const GroceryItemComponent = ({ item, onDelete, onUpdate, isChecked, onCheck }) => {
  const [isDialogVisible, setDialogVisible] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isCategoryListVisible, setCategoryListVisible] = useState(false);

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

  const changeCategory = async () => {
    console.log('pressed', item);
    setCategoryListVisible(false);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Swipeable renderRightActions={renderSwipe} onSwipeableOpen={onDelete}>
        <View style={groceryListItemStyles.listContainer}>
          <TouchableOpacity onPress={handleEdit}>
            <Text style={groceryListItemStyles.itemName}>{item}</Text>
          </TouchableOpacity>
          {/* <View style={groceryListItemStyles.categoryButton}>
            <TouchableOpacity style={groceryListItemStyles.categoryButton} onPress={() => {
              console.log('pressed', item);
              setCategoryListVisible(true);
            }}>
              <Text style={groceryListItemStyles.categoryButtonText}>Category</Text>
            </TouchableOpacity>
          </View> */}
          <View>
            <SelectDropdown
              data={["Produce", "Meat", "Dairy", "Frozen", "Canned", "Bakery", "Beverages", "Snacks", "Other"]}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index);
                changeCategory();
              }}
              renderButton={(selectedItem, isOpened) => {
                return (
                  <View>
                    <Text>
                      {(selectedItem) || 'Category'}
                    </Text>
                  </View>
                );
              }}
              renderItem={(item, index, isSelected) => {
                return (
                  <View>
                    <Text>{item}</Text>
                  </View>
                );
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                return item;
              }}
            />
          </View>
          <CheckBox
            value={isChecked}
            onValueChange={onCheck}
            tintColor="#bfbfbf"
            // onCheckColor="dodgerblue"
            // onTintColor="dodgerblue"
            onAnimationType="fill"
            offAnimationType="bounce"
          />

          <Dialog.Container visible={isDialogVisible}>
            <Dialog.Title>Edit Item</Dialog.Title>
            <Dialog.Input value={inputText} onChangeText={setInputText} autoFocus={true} />
            <Dialog.Button label="Cancel" onPress={handleCancel} />
            <Dialog.Button label="Save" onPress={handleSave} />
          </Dialog.Container>
        </View>
      </Swipeable>
      <View style={groceryListItemStyles.itemBorder} />
    </GestureHandlerRootView>
  );
};

module.exports = GroceryItemComponent;