import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { MainNavigator } from './src/navigation'
import { Provider } from 'react-redux'
import { store } from './src/store/Store'

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer >
        <MainNavigator/>
    </NavigationContainer>
    </Provider>
  )
}

export default App

const styles = StyleSheet.create({})