// components/CategoryComponent.js
const React = require('react');
const { Text, View, StyleSheet } = require('react-native');
const { categoryStyles } = require('../styles/CategoryStyles');

const CategoryComponent = ({ categoryName }) => {
  return (
    <View style={categoryStyles.categoryContainer}>
      <Text style={categoryStyles.categoryText}>{categoryName}</Text>
    </View>
  );
};



module.exports = CategoryComponent;