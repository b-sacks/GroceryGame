// components/ItemComponent.js
const React = require('react');
const { useState, useRef } = React;
const { View, Text, TextInput, Button } = require('react-native');
import Dialog from "react-native-dialog";
import CheckBox from "@react-native-community/checkbox";

const ItemComponent = ({ item, onDelete, onUpdate, isChecked, onCheck }) => {
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
    setInputText('');
  };

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 7 }}>
      <Text style={{paddingTop: 11}}>{item}</Text>
      <Button title="Edit" onPress={handleEdit} />
      <Button title="Delete" onPress={onDelete} />
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
  );
};

module.exports = ItemComponent;