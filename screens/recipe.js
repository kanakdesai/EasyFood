import { View, Text, StyleSheet, FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';

export default function Recipe({navigation, route}) {
    const id = route.params.id
    const [recipe, setRecipe] = useState([])

    const getRecipe=async()=>{
        await axios({
            url: 'https://www.themealdb.com/api/json/v1/1/lookup.php?i='+id,
            method: 'GET'
        }).then(res=>{
            console.log(res.data.meals)
            setRecipe(res.data.meals)
        }).catch(err=>{
            console.log(err)
        })
    }

    useEffect(()=>{
        getRecipe()
    },[])
  return (
    <View style={styles.container}>
      <Text>{id}</Text>
      
      {/* <Text>{recipe}</Text> */}
      <FlatList
      data={recipe}
      renderItem={({item})=>{
        return(
            <View>
                <Text>{item.strArea}</Text>
                <Image style={styles.imageStyle} source={{uri:item.strMealThumb}}></Image>
                <Text>{item.strMeal}</Text>
                <Text>{item.strInstructions}</Text>
            </View>
            
        )
      }}
      >

      </FlatList>
    </View>
  )
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        paddingTop: 50
    },
    imageStyle:{
        width: 200,
        height: 200,
        resizeMode: 'contain',
        alignSelf: 'center'
    }
});