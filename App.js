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
  const [checkedItems, checkedItemChange] = useState([]);


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

  // Capture the current id and text on click edit
  const editItem = (id, text) => {
    setEditItemDetail({ id, text });
    setEditStatus(!editStatus);
  }

  // Submit the changes
  const saveEditItem = (id, text) => {
    setItems(prevItems => {
      return prevItems.map(item =>
        item.id===editItemDetail.id ? {id, text: editItemDetail.text} : item
      );
    });

    // Flip edit status back to false
    setEditStatus(!editStatus);
  };

  const handleEditChange = text => {
    setEditItemDetail({id: editItemDetail.id, text});
  };

  const itemIsChecked = (id, text) => {
    const isChecked = checkedItems.filter(checkedItem => checkedItem.id === id);
    isChecked.length
      ? // remove item from checked items state (uncheck)
        checkedItemChange(prevItems => {
          return [...prevItems.filter(item => item.id !== id)];
        })
      : // Add item to checked items state
        checkedItemChange(prevItems => {
          return [...prevItems.filter(item => item.id !== id), {id, text}];
        });
  };

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
          editItem={editItem}
          saveEditItem={saveEditItem}
          handleEditChange={handleEditChange}
          checkedItems={checkedItems}
          itemIsChecked={itemIsChecked}
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

