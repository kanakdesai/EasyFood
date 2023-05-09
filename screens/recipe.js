import { View, Text, StyleSheet, FlatList, Image, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';

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
    <View
           
     style={styles.container}>
     <ImageBackground 
        blurRadius={6}
        source={require('../images/background.jpg')} 
         >
      
      
      {/* <Text>{recipe}</Text> */}
      <FlatList
      data={recipe}
      renderItem={({item})=>{
        return(
            <View>
                <Text style={styles.Title}>{item.strArea}</Text>
                <Image style={styles.imageStyle} source={{uri:item.strMealThumb}}></Image>
                <LinearGradient
                    colors={['#ef745c', '#f8a902']}
                    start={{x: 0.8, y: 0}}
                    style={styles.content}>
                    <Text style={styles.Title2}>{item.strMeal}</Text>
                    <Text>{item.strInstructions}</Text>
                </LinearGradient>
            </View>

            
        )
      }}
      >

      </FlatList>

      </ImageBackground>
    </View>
  )
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        paddingTop: 50,
        backgroundColor: '#1C1C1C'
    },
    imageStyle:{
        width: 200,
        height: 200,
        resizeMode: 'contain',
        alignSelf: 'center',
        borderRadius: 90
    },
    content:{
        // width: '100%',
        paddingVertical: '5%',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: '5%',
        marginTop: 20,
        borderRadius: 10,
        marginHorizontal: 10,
        marginBottom: 20

    },
    Title:{
        alignSelf: 'center',
        fontSize: 25,
        fontWeight: '700',
        color: 'white',
        marginVertical: 10
    },
    Title2:{
        alignSelf: 'center',
        fontSize: 25,
        fontWeight: '700',
        color: 'black',
        marginBottom: 10 
    },
    
});