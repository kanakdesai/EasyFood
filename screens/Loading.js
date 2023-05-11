import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function Loading() {
  return (
    <View style={styles.container}>
      <Text style={{color: 'white', fontSize: 30}}>Loading.....</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1C1C1C',
        zIndex: 1,
        width: '100%'
    }
});