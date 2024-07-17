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
// const GroceryListNavigator = require('./navigation/GroceryListNavigator');
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; // Import MaterialIcons

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            switch (route.name) {
              case 'Grocery List':
                iconName = 'check-circle';
                break;
              case 'Master List':
                iconName = 'format-list-bulleted';
                break;
              case 'Recipe List':
                iconName = 'book';
                break;
            }

            return <MaterialIcons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: { backgroundColor: '#DDDDC1' },
          // tabBarLabelStyle: { fontFamily: 'Avenir', fontSize: 11 },
        })}
      >
        <Tab.Screen name="Grocery List" component={GroceryListComponent} options={{ headerShown: false }} />
        <Tab.Screen name="Master List" component={MasterListComponent} options={{ headerShown: false }} />
        <Tab.Screen name="Recipe List" component={RecipeListComponent} options={{ headerShown: false }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e67a7a',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
