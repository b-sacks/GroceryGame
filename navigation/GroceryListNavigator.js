// In a new file, e.g., GroceryListNavigator.js
import { createStackNavigator } from '@react-navigation/stack';
import GroceryListComponent from '../components/GroceryListComponent';
import React from 'react';
import { Button } from 'react-native';

const GroceryStack = createStackNavigator();

const GroceryListNavigator = () => {
  return (
    <GroceryStack.Navigator>
      <GroceryStack.Screen
        name="GroceryList"
        component={GroceryListComponent}
        options={({ navigation }) => ({
          headerTitle: 'Grocery List',
          headerRight: () => (
            <Button
              onPress={() => {/* Your action here */}}
              title="Add Item"
              color="#000"
            />
          ),
        })}
      />
    </GroceryStack.Navigator>
  );
}

module.exports = GroceryListNavigator;