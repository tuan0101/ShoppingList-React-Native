import React, { useState } from 'react'
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import Header from './components/Header';
import ListItem from './components/ListItem';
import AddItem from './components/AddItem';

function App() {
  function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = (c === 'x') ? r : ((r & 0x3) | 0x8);
      return v.toString(16);
    });
  }

  const [items, setItems] = useState([
    { id: uuidv4(), text: 'Milk' },
    { id: uuidv4(), text: 'Eggs' },
    { id: uuidv4(), text: 'Bread' },
    { id: uuidv4(), text: 'Juice' },
  ]);

  // Flag true if user is currently editing an item
  const [editStatus, setEditStatus] = useState(false);

  // State to capture information about the item being edited
  const [editItemDetail, setEditItemDetail] = useState({
    id: null,
    text: null,
  });

  const addItem = (item) => {
    if (!item) {
      Alert.alert(
        'No item entererd',
        'Please add a non-empty item',
        [
          {
            text: 'Understood',
            style: 'cancel',
          },
        ],
        { cancelable: true },
      );
    } else {
      setItems(prevItems => {
        return [{ id: uuidv4(), text: item }, ...prevItems];
      });
    }
  }

  const deleteItem = (id) => {
    setItems(prevItems => {
      return prevItems.filter(item => item.id != id);
    });
  }

  return (
    <View style={styles.container}>
      <Header title='Shopping List' />
      <AddItem addItem={addItem} />
      <FlatList data={items} renderItem={({ item }) => (
        <ListItem 
          item={item} 
          isEditing={editStatus}
          editItemDetail={editItemDetail}
          deleteItem={deleteItem} 
        />
      )} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})

export default App;

