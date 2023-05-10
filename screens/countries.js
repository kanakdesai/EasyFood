import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { SafeAreaView, useSafeAreaFrame } from 'react-native-safe-area-context'
import LinearGradient from 'react-native-linear-gradient'
import Loading from './Loading'
export default function Countries({navigation, route}) {
    const country = route.params.value
    const [loading, setLoading] = useState(true)
    const [data, setData ] = useState({})
    const getFoods=async()=>{
            await axios({
                url: 'https://www.themealdb.com/api/json/v1/1/filter.php?a='+country,
                method: 'GET'
            }).then(res=>{
                console.log(res.data.meals)
                setData(res.data.meals)
                setLoading(false)
            }).catch(err=>{
                console.log(err)
            })
    }

    useEffect(()=>{
        getFoods()
    },[]);

    

    return (
    <View style={styles.container}>
    {loading?<Loading></Loading>:
    <ImageBackground 
        blurRadius={10}
        style={styles.img}
        source={require('../images/background.jpg')} 
    >
        <Text style={styles.TitleStyle}>{country} Recipes</Text>
      <FlatList
        // style={styles.cardStyle}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        numColumns={2}
        data={data}
        renderItem={({item}) => {
          return (
            
            <LinearGradient
              colors={['#ef745c', '#f8a902']}
              start={{x: 0.8, y: 0}}
              style={styles.cardStyle}>
              <TouchableOpacity onPress={()=>navigation.navigate('Recipe',{id: item.idMeal})}>
              <Image
                style={styles.imageStyle}
                source={{uri: item.strMealThumb}}></Image>
              <Text style={styles.textStyle}>{item.strMeal}</Text>

              </TouchableOpacity>
            </LinearGradient>
            
          );
        }}></FlatList>
        </ImageBackground>}
    </View>
  )
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
    paddingTop: 0,
    alignItems: 'center',
    backgroundColor: '#1C1C1C',
        
    },
    cardStyle: {
        width: '46%',
        height: 200,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'pink',
        marginBottom: 10,
        borderRadius: 20,
        marginHorizontal: '1%'
      },
      imageStyle: {
        resizeMode: 'contain',
        width: 110,
        height: 110,
        alignSelf: 'center',
        borderRadius: 150,
      },
      textStyle: {
        fontSize: 10,
        textAlign: 'center',
        marginTop: 10,
      },
      TitleStyle: {
        alignSelf: 'center',
        fontWeight: '600',
        fontSize: 30,
        color: 'white',
        marginTop: 50,
        marginBottom: 20
      },
});