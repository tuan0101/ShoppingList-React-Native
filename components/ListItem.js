import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

function ListItem({ 
  item, 
  isEditing, editItemDetail, editItem, saveEditItem, 
  deleteItem 
}) {

  return (
    <TouchableOpacity style={styles.listItem}>
      <View style={styles.listItemView}>
        {isEditing && editItemDetail.id === item.id ? (
          <Icon
            name='save'
            size={20} color='green'
            //onPress={() => saveEditItem(item.id, item.text)}
          />
        ) : (
            <Icon
              name='pencil'
              size={20} color='blue'
              //onPress={() => editItem(item.id, item.text)}
            />
        )}

        <Text style={styles.listItemText}>{item.text}</Text>
        <Icon
          name='remove'
          size={20} color='firebrick'
          onPress={() => deleteItem(item.id)}
        />
      </View>

    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  listItem: {
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderColor: '#eee'
  },
  listItemView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  listItemText: {
    fontSize: 18,
  }
})

export default ListItem;

