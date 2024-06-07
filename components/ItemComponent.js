// components/ItemComponent.js
const React = require('react');
const { useState } = React;
const { View, Text, TextInput, Button } = require('react-native');

const ItemComponent = ({ item, onDelete, onUpdate }) => {
  const [name, setName] = useState(item.getName());

  const handleUpdate = () => {
    onUpdate(name);
    item.setName(name);
  };

  return (
    <View>
      <TextInput
        value={name}
        onChangeText={setName}
      />
      <Button title="Update" onPress={handleUpdate} />
      <Button title="Delete" onPress={onDelete} />
    </View>
  );
};

module.exports = ItemComponent;