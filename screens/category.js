import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  ScrollView,
  Image,
  TouchableOpacity,
  ImageBackground
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import Loading from './Loading';
export default function Category({navigation, route}) {
  const data = route.params.datas;
  const [recipe, setRecipes] = useState({});
  const [loading, setLoading] = useState(true)
  const getData = async () => {
    await axios({
      url: 'https://www.themealdb.com/api/json/v1/1/filter.php?c=' + data,
      method: 'GET',
    })
      .then(res => {
        console.log(res.data.meals);
        setRecipes(res.data.meals);
        setLoading(false)
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <View style={styles.container}>
    {loading?<Loading></Loading>:
      <ImageBackground
          blurRadius={6}
          source={require('../images/background.jpg')} 
      >
        <Text style={styles.TitleStyle}>Recipes for {data}</Text>
      
      <FlatList
        // style={styles.cardStyle}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        numColumns={2}
        data={recipe}
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
        </ImageBackground>
    }
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    alignItems: 'center',
    backgroundColor: '#1C1C1C',
  },
  TitleStyle: {
    alignSelf: 'center',
    fontWeight: '600',
    fontSize: 30,
    color: 'white',
    marginTop: 50,
    marginBottom: 20
  },
  cardStyle: {
    width: '48%',
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'pink',
    marginBottom: 10,
    borderRadius: 20,
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
 
});
