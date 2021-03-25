import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TouchableHighlight, Pressable, ScrollView, ActivityIndicator, FlatList, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ProfileScreen } from '../profile/ProfileScreen'
import { useFonts } from 'expo-font';
import { Filter } from '../filter/Filter'
import filter from 'lodash.filter';
import { roundToNearestPixel } from 'react-native/Libraries/Utilities/PixelRatio';






const Stack = createStackNavigator();







function CatalogScreen({ navigation }) {





  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [query, setQuery] = useState('');
  const [fullData, setFullData] = useState([]);






  useEffect(() => {
    setLoading(true);
  
    fetch('http://www.s1928.konversia.net/api/get_names?name_ids=true?sort=asc')
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
  }, []);



  const handleSearch = text => {
    const formattedQuery = text;
    const filteredData = filter(fullData, user => {
      return contains(user, formattedQuery);
    });
    setData(filteredData);
    setQuery(text);
  };
  
  const contains = ({name}, query) => {
  
  
  
    if (name.includes(query)) {
      return true;
    }
  
    return false;
  };



  // const userName = ' '






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


  const ItemAlpha = ({ item, onPress, style }) => (
    <Pressable
    style={({pressed}) => [
      {
        backgroundColor: pressed ? '#5DADC1' : '#fff',
      },
      
    ]}
  children={({ pressed }) => (
    <Text style={{ color: pressed ? '#FFF' : '#222'}}>
      {item.title}
    </Text>)}
    >
    </Pressable>

  )


  const renderItem = ({ item }) => {


    return (
      <Item
        key={item.id}
        item={item}
        onPress={() => setSelectedId(item.id)}
      />
    );
  };


  const renderItemAlpha = ({ item }) => {


    return (
      <ItemAlpha
        key={item.id}
        item={item}
        onPress={() => setSelectedId(item.id)}
      />
    );
  };



  let alphabet = [
    {
      id: 0,
      title: 'А'
    },
    {
      id: 1,
      title: 'Б'
    },
    {
      id: 2,
      title: 'В'
    },
    {
      id: 3,
      title: 'Г'
    },
    {
      id: 4,
      title: 'Д'
    },
    {
      id: 5,
      title: 'Е'
    },
    {
      id: 6,
      title: 'Ё'
    },
    {
      id: 7,
      title: 'Ж'
    },
    {
      id: 8,
      title: 'З'
    },
    {
      id: 9,
      title: 'И'
    },
    {
      id: 10,
      title: 'Й'
    },
    {
      id: 11,
      title: 'К'
    },
    {
      id: 12,
      title: 'Л'
    },
    {
      id: 13,
      title: 'М'
    },
    {
      id: 14,
      title: 'Н'
    },
    {
      id: 15,
      title: 'О'
    },
    {
      id: 16,
      title: 'П'
    },
    {
      id: 17,
      title: 'Р'
    },
    {
      id: 18,
      title: 'С'
    },
    {
      id: 19,
      title: 'Т'
    },
    {
      id: 20,
      title: 'У'
    },
    {
      id: 21,
      title: 'Ф'
    },
    {
      id: 22,
      title: 'Х'
    },
    {
      id: 23,
      title: 'Ц'
    },
    {
      id: 24,
      title: 'Ч'
    },
    {
      id: 25,
      title: 'Ш'
    },
    {
      id: 26,
      title: 'Щ'
    },
    {
      id: 27,
      title: 'Ъ'
    },
    {
      id: 28,
      title: 'Ы'
    },
    {
      id: 29,
      title: 'Ь'
    },
    {
      id: 30,
      title: 'Э'
    },
    {
      id: 31,
      title: 'Ю'
    },
    {
      id: 32,
      title: 'Я'
    }

  ]
 
  return (
  
    <View style={styles.catalog}>

      <View style={styles.alphabet}>
      <FlatList
        data={alphabet}
        renderItem={renderItemAlpha}
        key={renderItemAlpha.item}
        keyExtractor={(item) => item.id}
        style={styles.FlatListAlphabet}
      />
        {/* <Text>А Б В Г Д</Text> */}
      </View>
 
      <View style={styles.nameBtnContainer}>
      <Text  style={styles.title}>Каталог имен</Text>
      <Text  style={styles.subtitle}>323 имени</Text>

      
        <FlatList
        data={data}
        renderItem={renderItem}
        key={renderItem.item}
        keyExtractor={(item) => item.id}
        style={styles.FlatListCatalog}
      />
      
    


 
    
      </View>

 


      <StatusBar style="auto" />

      <Pressable  onPress={() => navigation.navigate('Filter')}  style={styles.settings}>
      <Ionicons name="ios-settings-outline" size={24} color="black" />
      </Pressable>
    </View>
   
  
  );
}




export function Catalog() {
  


  const navigation = useNavigation()
 
  return (
      <Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
        <Stack.Screen options={{headerShown: false}} name="CatalogScreen" component={CatalogScreen} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen}  options={{ title: 'Подробнее', headerTitleStyle: {
            fontFamily: 'GilroyMedium',
          },
          } } />
           <Stack.Screen name="Filter" component={Filter}  options={{ title: 'Фильтр', headerTitleStyle: {
            fontFamily: 'GilroyMedium',
          },
          } } />
      </Stack.Navigator>
  );
}












const styles = StyleSheet.create({

    title: {
      marginTop: 50,
      color: "#292929",
      marginBottom: 10,
      textAlign: "center",
      fontSize: 24,
      lineHeight: 33,
      fontFamily: 'GilroyMedium'
    },
    nameBtn: {
      fontFamily: 'Gilroy',
      color: '#5DADC1',
      paddingTop: 19,
      paddingBottom: 18,
      alignItems: "center",
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
      marginRight: 10,
      marginLeft: 10,
      marginTop: 6
    },

    nameBtnContainer: {
      flex: 1,
      justifyContent: "center",
    },
    namebtnText: {
      fontFamily: 'Gilroy',
      justifyContent: "center",
      fontSize: 16
    },
    subtitle: {
      fontFamily: 'Gilroy',
      fontSize: 14,
      marginBottom: 10,
      color: "#292929",
      textAlign: "center",
      marginBottom: 10,
      lineHeight: 25
    },
    settings: {
      flex: 0.3,
      marginTop: 55,
      alignItems: "flex-end",
      position: 'absolute',
      right: 16
    },
    catalog: {
      flex: 1,
      flexDirection: "row",
      backgroundColor: "#FAFAFA",
      alignItems: 'flex-start'
    },
    alphabet: {
      flex: 0.3,
      color: "#292929",
      marginTop: 114,
      position: 'absolute',
      left: 13,
    },
    alphabetLetter: {
      marginBottom: 10
    },
    FlatListCatalog: {
      paddingLeft: 60,
      paddingRight: 60,
      flex: 1
    },
    FlatListAlphabet: {
      backgroundColor: '#000'
    }

  });


