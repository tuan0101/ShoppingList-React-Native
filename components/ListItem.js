import React from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

function ListItem({
  item,
  isEditing, editItemDetail, editItem, saveEditItem, checkedItems, handleEditChange,
  deleteItem
}) {

  const checked = checkedItems.filter(
    checkedItem => checkedItem.id === item.id,
  );

  return (
    <TouchableOpacity style={styles.listItem}>
      <View style={styles.listItemView}>
        {isEditing && editItemDetail.id === item.id ? (
          <TextInput
            placeholder="Edit Item..."
            style={styles.editItemInput}
            onChangeText={handleEditChange}
          />
        ) : (
            <Text
              //onPress={() => itemChecked(item.id, item.text)}
              style={
                checked.length ? styles.checkedItemText : styles.listItemText
              }>
              {item.text}
            </Text>
        )}
        <Text style={styles.listItemText}>{item.text}</Text>
        <View style={styles.iconView}>
          {isEditing && editItemDetail.id === item.id ? (
            <Icon
              name='save'
              size={20} color='green'
              onPress={() => saveEditItem(item.id, item.text)}
            />
          ) : (
              <Icon
                name='pencil'
                size={20} color='blue'
                onPress={() => editItem(item.id, item.text)}
              />
            )}
        </View>

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
  },
  iconView: {
    flexDirection: 'row',
    marginLeft: 'auto',
    width: 30,
  },
})

export default ListItem;

