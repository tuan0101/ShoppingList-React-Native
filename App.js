import React from 'react'
import { View, Text, StyleSheet} from 'react-native';
import Header from './components/Header';

function App() {
  return (
    <View style={styles.container}>
      <Header title='Shopping List'/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
  }
})

export default App;

