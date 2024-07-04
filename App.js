const { StatusBar } = require('expo-status-bar');
const { StyleSheet, Text, View, TextInput } = require('react-native');
const React = require('react');
const { useState } = React;
const GroceryListComponent = require('./components/GroceryListComponent');
const MasterListComponent = require('./components/MasterListComponent');
const RecipeListComponent = require('./components/RecipeListComponent');
import 'react-native-get-random-values';
import 'react-native-screens';
import 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Grocery List" component={GroceryListComponent} />
        <Tab.Screen name="Master List" component={MasterListComponent} />
        <Tab.Screen name="Recipe List" component={RecipeListComponent} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
