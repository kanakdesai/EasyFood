import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  
} from 'react-native';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';


export default function Home({navigation}) {
  const [category, setCategory] = useState({});
  const [country, setCountry] = useState({});
  const [isLoading, setisLoading] = useState(true);

  const Loading = () => {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
          zIndex: 1,
        }}>
        <Text>Loading....</Text>
      </View>
    );
  };

  const getCategories = async () => {
    await axios({
      url: 'https://www.themealdb.com/api/json/v1/1/categories.php',
      method: 'GET',
    })
      .then(res => {
        console.log(res.data.categories);
        setCategory(res.data.categories);
        setisLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const getCountries = async () => {
    await axios({
      url: 'https://www.themealdb.com/api/json/v1/1/list.php?a=list',
      method: 'GET',
    })
      .then(res => {
        console.log(res.data.meals);
        setCountry(res.data.meals);
      })
      .catch(err => {
        console.log(err);
      });
  };
  useEffect(() => {
    getCategories();
    getCountries();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome</Text>

      <View style={styles.hButton}>
        <TouchableOpacity>
          <LinearGradient
            colors={['#f3696e', '#f8a902']}
            start={{x: 0.5, y: 0}}
            style={styles.button}>
            <Text style={styles.text}>By Category</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      {isLoading == true ? (
        <Loading></Loading>
      ) : (
        <View>
          <FlatList
            scrollEnabled={true}
            //   snapToAlignment='center'
            showsHorizontalScrollIndicator={false}
            style={styles.FlStyle}
            contentContainerStyle={styles.FlatList}
            horizontal={true}
            data={category}
            key={item => item.idCategory}
            renderItem={({item}) => {
              return (
               
                  <LinearGradient
                    colors={['#f8a902', '#f3696e']}
                    start={{x: 0.5, y: 0}}
                    style={styles.cardStyle}>
                    <LinearGradient
                      colors={['#ef745c', '#F8FFAE']}
                      start={{x: 0.8, y: 0}}
                      style={styles.circle}>
                      <Image
                        style={styles.imageStyle}
                        source={{uri: item.strCategoryThumb}}></Image>
                    </LinearGradient>
                    <Text style={styles.Innertext}>{item.strCategory}</Text>
                    <Text style={styles.InnerPara}>
                      {item.strCategoryDescription.slice(0, 50)}...
                    </Text>
                  </LinearGradient>
               
              );
            }}></FlatList>
        </View>
      )}

      <View style={styles.hButton}>
        <TouchableOpacity>
          <LinearGradient
            colors={['#f4762d', '#34073d']}
            start={{x: 0.8, y: 0}}
            style={styles.button}>
            <Text style={styles.text}>By Country</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <View>
        <FlatList
          // numColumns={Math.ceil(country.length / 2)}
          scrollEnabled={true}
          //   snapToAlignment='center'
          showsHorizontalScrollIndicator={false}
          style={styles.FlStyle}
          contentContainerStyle={styles.FlatList}
          horizontal={true}
          data={country}
          // key={item => item.idCategory}
          renderItem={({item}) => {
            return (
              <LinearGradient
                colors={['#ef745c', '#ad336d']}
                start={{x: 0.5, y: 0}}
                style={[styles.cardStyle, styles.shadowProp]}>
                <View style={styles.circle}>
                  {/* <Image
                      style={styles.imageStyle}
                      source={{uri: item.strCategoryThumb}}></Image> */}
                </View>
                <Text style={styles.Innertext}>{item.strArea}</Text>
              </LinearGradient>
            );
          }}></FlatList>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1C',
    // paddingHorizontal: '5%',
    paddingTop: '15%',
  },
  title: {
    alignSelf: 'center',
    fontSize: 30,
    fontWeight: '700',
    color: 'white'
  },
  hButton: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    marginTop: '5%',
    paddingBottom: 20,
  },
  button: {
    // flex: 1,
    backgroundColor: 'purple',
    paddingHorizontal: 15,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 10,
  },
  text: {
    color: 'white',
    fontWeight: '700',
  },
  cardStyle: {
    width: 310,
    height: '100%',
    backgroundColor: 'pink',
    marginTop: 30,
    borderRadius: 20,
    marginHorizontal: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 0.5,
    borderColor: 'black'
  },
  circle: {
    width: 120,
    height: 120,
    backgroundColor: 'blue',
    borderRadius: 80,
    // position: 'relative',
    top: 0,

    alignSelf: 'center',
  },
  imageStyle: {
    resizeMode: 'contain',
    width: 110,
    height: 110,
    alignSelf: 'center',
    borderRadius: 150,
  },
  //   flatListStyle: {
  //     flexWrap: 'wrap',
  //     height: 300,
  //     width: '60%',
  //     backgroundColor: 'black',

  //   },
  Innertext: {
    color: 'white',
    alignSelf: 'center',
    // top: -10,
    fontWeight: '700',
    fontSize: 20,
  },
  FlStyle: {
    width: '100%',
    height: '30%',
    borderRadius: 10,
    marginBottom: 30,
    paddingBottom: 30,
  },
  InnerPara: {
    alignSelf: 'center',
    paddingBottom: 10,
    // top: -30,
    fontWeight: '300',
    fontSize: 15,
    textAlign: 'center',
    textDecorationColor: 'pink',
    color: 'white',
  },
  shadowProp: {
    shadowOffset: {width: 6, height: 10},
    shadowColor: 'blue',
    shadowOpacity: 1,
    shadowRadius: 3,
  },
});
