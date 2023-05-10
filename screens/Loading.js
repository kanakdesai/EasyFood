import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function Loading() {
  return (
    <View style={styles.container}>
      <Text>Loading.....</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'blue',
        zIndex: 1,
        width: '100%'
    }
});