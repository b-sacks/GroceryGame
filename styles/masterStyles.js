import { StyleSheet } from 'react-native';

const masterStyles = StyleSheet.create({
  header: {
    height: 110,
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
    backgroundColor: 'white',
    borderWidth: 0.1,
    borderColor: 'gray',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0.5 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    backgroundColor: '#DDDDC1',
    },
  title: {
    position: 'absolute', // Make sure text is centered absolutely
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 50,
    color: '#0A0903',
  },
  addButton: {
    position: 'absolute',
    right: 15,
    marginTop: 1,
  },
  addButtonText: {
    fontSize: 35, // Set your desired font size here
    fontWeight: 'bold',
    color: '#2F52E0',
  },
  clearAllButton: {
    position: 'absolute',
    left: 8,
  },
  clearAllButtonText: {
    fontSize: 13, // Set your desired font size here
    fontWeight: 'bold',
    color: 'tomato',
  },
  clearCheckedButton: {
    position: 'absolute',
    left: 8,
    marginTop: 31,
  },
  clearCheckedButtonText: {
    fontSize: 13, // Set your desired font size here
    fontWeight: 'bold',
    color: '#2F52E0',
  },
  listContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    // paddingVertical: 6,
    height: 44.5,
    alignItems: 'center',
    // borderWidth: 0.2,
    // borderColor: 'gray',
  },
  itemName :{
    fontSize: 17,
    color: '#0A0903'
  },
});

module.exports = masterStyles;