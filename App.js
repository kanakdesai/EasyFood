import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import Category from './screens/category';
import Recipe from './screens/recipe';
import Countries from './screens/countries';
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen options={{headerShown: false}} name="Home" component={Home} />
      <Stack.Screen options={{headerShown: false}} name="Category" component={Category} />
      <Stack.Screen options={{headerShown: false}} name="Recipe" component={Recipe} />
      <Stack.Screen options={{headerShown: false}} name="Countries" component={Countries} />
    </Stack.Navigator>
  </NavigationContainer>
  )
}

