const { StatusBar } = require('expo-status-bar');
const { StyleSheet, Text, View, TextInput } = require('react-native');
const Item = require('./services/Item');
const React = require('react');
const { useState } = React;

export default function App() {
  const [itemName, setItemName] = useState('apple');
  const item = new Item(itemName);
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={text => setItemName(text)}
        value={itemName}
      />
      <Text>{item.name}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
