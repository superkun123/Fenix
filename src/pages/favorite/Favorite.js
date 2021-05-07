import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TouchableHighlight, Pressable, ScrollView, ActivityIndicator, FlatList, SafeAreaView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ProfileMini } from '../profile/ProfileMini'
import { ProfileScreen } from '../profile/ProfileScreen'
import { useFonts } from 'expo-font';
import { SvgComponentLike } from '../../../assets/jsxSvg/like'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SvgComponentArrowRight } from '../../../assets/jsxSvg/arrowRightWhite'










const Stack = createStackNavigator();



export function FavoriteScreen({ navigation, route }) {

const [isLoading, setLoading] = useState(true);
const [data, setData] = useState([]);
const [favorite, setFavorite] = useState([1])
const [badge, setBadge] = useState(0)



// 0 будут все, 1 будет никто


// const getData = async () => {
//   try {
//     const value = await AsyncStorage.getItem('favorite')
//     if(value !== null) {
//       setFavorite(arr => [...arr, value])
//       // value previously stored
//     }
//   } catch(e) {
//     // error reading value
//   }
// }


// const getData = async () => {
//   try {
//     const value = await AsyncStorage.getItem('favorite')
//     if(value !== null) {
//       Alert.alert(value)
//       setFavorite(value)
//       // value previously stored
//     }
//   } catch(e) {
//     // error reading value
//   }
// }


const getData = async () => {
  // Alert.alert(`Открыл избранное гет дата пошла`)
  try {
    const jsonValue = await AsyncStorage.getItem('favorite')
    const jsonArray = JSON.parse(jsonValue)
    const newArray = jsonArray.filter(function(elem, pos) {
      return jsonArray.indexOf(elem) == pos;
  });
  setBadge(newArray.length - 1 + '')
  // Alert.alert(`бейдж = ${badge}`)
    const jsonSpread = [...newArray]
    const jsonFinal = jsonSpread.join(',')

    if(jsonFinal.length > 1) {
      setFavorite(jsonFinal)
    } else {
      setFavorite([1])
    }

  } catch(e) {
    Alert.alert(`Ошибка сети`)
    // error reading value
  }
}



const storeData = async () => {
  let result = await getData()
  try {
    // Alert.alert(`бейдж во время стора даты в избранном ${badge}`)
    await AsyncStorage.setItem('badge', `${badge}`)
  } catch (e) {
    // saving error
  }
}



// const getData = async () => {
//   try {
//     const jsonValue = await AsyncStorage.getItem('favorite')
//     return jsonValue != null ? JSON.parse(jsonValue) : null;
//   } catch(e) {
//     // error reading value
//   }
// }






 



React.useEffect(() => {
  const unsubscribe = navigation.addListener('focus', () => {
    // getData()
    storeData()
  });

  // Return the function to unsubscribe from the event so it gets removed on unmount
  return unsubscribe;
}, [navigation]);




useEffect(() => {
  // getData()


  setLoading(true);


  // fetch(`http://www.s1928.konversia.net/api/get_names?name_ids=true?sort=asc&gender_id=${route.params.genderId}`)
  fetch(`https://narekaet.com/api/get_names?name_ids=${favorite}`)
    .then(response => response.json())
    .then(response => {
      setData(response.names);

      // ADD THIS
      setFullData(response.names);

      setLoading(false);
    })
    .catch(err => {
      setLoading(false);
    });
}, [favorite]);



const Item = ({ item, onPress, style }) => (
 

  <Pressable
     style={({pressed}) => [
      {
        elevation: pressed ? 5 : 0,
        shadowRadius: pressed ? 2.22 : 0,
        zIndex: pressed ? 110 : 1,
        shadowOffset: {
          width: 0,
          height: pressed ? 2: 0,
         },
         shadowOpacity: 0.25,
      },
      styles.nameBtn,
    ]}
  children={({ pressed }) => (
    <View style={{ color: pressed ? '#222' : '#222', flexDirection: 'row', alignContent: 'center', alignItems: 'center', justifyContent: 'center',  width: '100%', textAlign: 'center', position: 'relative'}}>
    <Text style={{textAlign: 'center'}}>
    {item.name}
    </Text>
    <SvgComponentLike color={'#5DADC1'} secondColor={'#5DADC1'} style={styles.like} ></SvgComponentLike>
  </View>
      )}
  onPress={() => navigation.navigate('ProfileScreen', {
    // paramKey: userName,
    paramKey: item.name,
    description: item.name_id,
  } )}
  >
  

  {/* <Text style={styles.namebtnText}>{item.name}</Text> */}
  </Pressable>
  
  );


  const renderItem = ({ item }) => {


    return (
      <Item
        key={item.id}
        item={item}
        onPress={() => setSelectedId(item.id)}
      />
    );
  };

  

 if (isLoading == false) {
  return (
    <View style={styles.catalog}>
  
  <View style={styles.header}>
        <Text  style={styles.title}>Избранное</Text>
        <Text></Text>
  </View>
  
  
  
  <View style={styles.content}>
    
  <View style={styles.namesContainer}>
  <FlatList
  contentContainerStyle={{ paddingBottom: 20,  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.23,
  shadowRadius: 2.62,  
  elevation: 5 }}
          data={data}
          renderItem={renderItem}
          key={renderItem.item}
          keyExtractor={(item) => item.id}
          style={styles.FlatListCatalog}
        />
        
        
  </View>
  
  
  </View>

  </View>
  
  );
 } else {
   return (
    <View style={styles.catalog}>
        
  <View style={styles.header}>
        <Text  style={styles.title}>Избранное</Text>
        <Text></Text>
  </View>
  <View style={{flex: 1, justifyContent: 'center', marginTop: -150}}>
  <ActivityIndicator size="large" color="#5DADC1"/>
  </View>
  </View>
   )
 }

}


export function Favorite(route) {
  


  const navigation = useNavigation()
 
  return (
      <Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
        <Stack.Screen options={{headerShown: false}} name="FavoriteScreen" component={FavoriteScreen} initialParams={{ genderId: '', fatherFirstName: '', fatherSecondName: ''  }} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen}  options={{ title: 'Подробнее', headerTitleStyle: {
            fontFamily: 'GilroyMedium',
            shadowOpacity: 0,
            elevation: 0
          },
          headerStyle: {
            shadowOpacity: 0,
            elevation: 0
          },
          headerBackImage: () =>  (<SvgComponentArrowRight style={styles.navArrow} color='#000'></SvgComponentArrowRight>),
          headerBackTitle: () => null,
          headerBackTitleVisible: false,
          } } />
            
      </Stack.Navigator>
  );
}




const styles = StyleSheet.create({

  title: {
    marginTop: 0,
    color: "#292929",
    marginBottom: 10,
    textAlign: "center",
    fontSize: 24,
    lineHeight: 33,
    fontFamily: 'GilroyMedium'
  },
  navArrow: {
    transform: [{rotate: '180deg'}],
    marginLeft: 10,
    padding: 12

  },
  content: {
    flex: 1,
    width: '100%',
    backgroundColor: '#FAFAFA',
    flexDirection: 'row'
  },
  like: {
    position: 'absolute',
    right: 0
  },
  alphabet2: {
    flex: 0.1,
    marginRight: 0,
    zIndex: 10,
    maxWidth: 30,
    marginLeft: 10,
    marginRight: -5
  },

  namesContainer: {
    flex: 1,
  },
  header: {
    backgroundColor: '#FAFAFA',
    marginTop: 40,
    marginBottom: 30
  },
  nameBtn: {
    fontFamily: 'Gilroy',
    backgroundColor: '#FFF7ED',
    paddingTop: 19,
    paddingBottom: 18,
    paddingHorizontal: 20,
    textAlign: 'center',
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: '#F5EDE4',
//     shadowColor: "#333",
// shadowOffset:{
// width: 0,
// height: 0,
// },
// shadowOpacity: 0.1,
// shadowRadius: 5,
// elevation: 5,
marginRight: 50,
marginLeft: 50,
marginBottom: 0.5,
marginTop: 1
  },

  nameBtnContainer: {
    flex: 1,
    justifyContent: "center",
    // marginLeft: -30
  },
  namebtnText: {
    fontFamily: 'Gilroy',
    justifyContent: "center",
    fontSize: 16
  },
  catalog: {
    // flex: 1,
    height: '100%',
    backgroundColor: "#FAFAFA",
  },

  alphaword: {
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    paddingVertical: 2.5
  },
  FlatListCatalog: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    shadowColor: "#FFF7ED",
    shadowOffset: {
	   width: 0,
	   height: 5,
    },
   shadowOpacity: 0.34,
   shadowRadius: 6.27,
  },
  FlatListAlphabet: {
    paddingHorizontal: 2.5
  }

});

