import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TouchableHighlight, Pressable, ScrollView, ActivityIndicator, FlatList, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ProfileMini } from '../profile/ProfileMini'
import { ProfileScreen } from '../profile/ProfileScreen'
import { useFonts } from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';










const Stack = createStackNavigator();



export function FavoriteScreen({ navigation, route }) {

const [isLoading, setLoading] = useState(true);
const [data, setData] = useState([]);
const [favorite, setFavorite] = useState([])




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


// getData()





useEffect(() => {


  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('favorite')
      if(value !== null) {
        setFavorite(arr => [...arr, value])
        // value previously stored
      }
    } catch(e) {
      // error reading value
    }
  }



  setLoading(true);
  getData()

  // fetch(`http://www.s1928.konversia.net/api/get_names?name_ids=true?sort=asc&gender_id=${route.params.genderId}`)
  fetch(`http://www.s1928.konversia.net/api/get_names?name_ids=${favorite}`)
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
        backgroundColor: pressed ? '#5DADC1' : '#fff',
      },
      styles.nameBtn,
    ]}
  children={({ pressed }) => (
    <Text style={{ color: pressed ? '#FFF' : '#222'}}>
      {item.name}
    </Text>)}
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

  



  return (
    <View style={styles.catalog}>
  
  <View style={styles.header}>
        <Text  style={styles.title}>Избранное</Text>
        <Text></Text>
  </View>
  
  
  
  <View style={styles.content}>
    
  <View style={styles.namesContainer}>
  <FlatList
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
  content: {
    flex: 1,
    width: '100%',
    backgroundColor: '#FAFAFA',
    flexDirection: 'row'
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
    color: '#5DADC1',
    paddingTop: 19,
    paddingBottom: 18,
    paddingHorizontal: 20,
    // alignItems: "center",
    borderRadius: 6,
    shadowColor: "#333",
shadowOffset:{
width: 0,
height: 0,
},
shadowOpacity: 0.1,
shadowRadius: 8,
elevation: 5,
    marginBottom: 6,
    marginRight: 16,
    marginLeft: 16,
    marginTop: 6
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
  },
  FlatListAlphabet: {
    paddingHorizontal: 2.5
  }

});

