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
import { SvgComponentArrowRight } from '../../../assets/jsxSvg/arrowRightWhite'
import { roundToNearestPixel } from 'react-native/Libraries/Utilities/PixelRatio';






const Stack = createStackNavigator();







function CatalogScreen({ navigation, route}) {





  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [query, setQuery] = useState('');
  const [fullData, setFullData] = useState([]);






  useEffect(() => {
    setLoading(true);
  
    // fetch(`http://www.s1928.konversia.net/api/get_names?name_ids=true?sort=asc&gender_id=${route.params.genderId}`)
    fetch(`http://www.s1928.konversia.net/api/get_names?name_ids=true&sort=${route.params.sort}&gender_id=${route.params.genderId}`)
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
  }, [route.params.genderId, route.params.sort]);



  const handleSearch = text => {
    const formattedQuery = text;
    const filteredData = filter(fullData, user => {
      return contains(user, formattedQuery);
    });
    setData(filteredData);
    setQuery(text);
  };
  
  const contains = ({name}, query) => {

    
      if (name.startsWith(query)) {
        return true;
      }
      return false;
        
  
   
  };



  // const userName = ' '






  const Item = ({ item, onPress, style }) => (
 

<Pressable
   style={({pressed}) => [
    {
      backgroundColor: pressed ? '#5DADC1' : '#FFF7ED',
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
        backgroundColor: pressed ? '#5DADC1' : '#FAFAFA',
      },
      styles.alphaword
      
    ]}
  children={({ pressed }) => (
    <Text style={{ color: pressed ? '#FFF' : '#222'}}>
      {item.title}
    </Text>)}
    onPress={() => handleSearch(item.title)}
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

<View style={styles.header}>
      <Text  style={styles.title}>Энциклопедия</Text>
      <Text  style={styles.subtitle}>{data.length} имени</Text>
      <Pressable  onPress={() => navigation.navigate('Filter', {namesValue: data.length, parentPage: 'CatalogScreen'})}  style={styles.settings}>
      <Ionicons name="ios-settings-outline" size={24} color="black" />
      </Pressable>
</View>



<View style={styles.content}>
<View style={styles.alphabet2}>
      <FlatList
        data={alphabet}
        renderItem={renderItemAlpha}
        key={renderItemAlpha.item}
        keyExtractor={(item) => item.id}
        style={styles.FlatListAlphabet}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
</View>


<View style={styles.namesContainer}>
<FlatList
        contentContainerStyle={{ paddingBottom: 20 }}
        data={data}
        renderItem={renderItem}
        key={renderItem.item}
        keyExtractor={(item) => item.id}
        style={styles.FlatListCatalog}
      />
      
      
</View>


</View>


{/* <View styles={styles.content}>
  <Text>123</Text> */}
{/* <View style={styles.alphabet2}>
      <FlatList
        data={alphabet}
        renderItem={renderItemAlpha}
        key={renderItemAlpha.item}
        keyExtractor={(item) => item.id}
        style={styles.FlatListAlphabet}
      />
        <Text>А Б В Г Д</Text>
</View> */}

{/* <View style={styles.namesContainer}>
<FlatList
        data={data}
        renderItem={renderItem}
        key={renderItem.item}
        keyExtractor={(item) => item.id}
        style={styles.FlatListCatalog}
      />
      <Text>123</Text>
      
</View> */}
 


{/* </View>
   */}
   
   

      
    
    


 
    
  

 



  
    </View>
   
  
  );
}




export function Catalog({route}) {
  


  const navigation = useNavigation()
 
  return (
      <Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
        <Stack.Screen options={{headerShown: false}} name="CatalogScreen" component={CatalogScreen} initialParams={{ genderId:route.params.genderId}} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen}  options={{ title: 'Подробнее', headerTitleStyle: {
            fontFamily: 'GilroyMedium',
          }, headerStyle: {
            shadowOpacity: 0,
            elevation: 0
          },
          headerBackImage: () =>  (<SvgComponentArrowRight style={styles.navArrow} color='#000'></SvgComponentArrowRight>),
          headerBackTitle: () => null,
          headerBackTitleVisible: false,
          } } />
           <Stack.Screen name="Filter" component={Filter}  options={{ title: 'Фильтр', headerTitleStyle: {
            fontFamily: 'GilroyMedium',
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
      marginTop: 20,
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
      padding: 12,
      // backgroundColor: '#000'

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
      marginLeft: -30,
    },
    header: {
      backgroundColor: '#FAFAFA',
      marginTop: 20
    },
    nameBtn: {
      fontFamily: 'Gilroy',
      color: '#5DADC1',
      paddingTop: 19,
      paddingBottom: 18,
      alignItems: "center",
      borderBottomWidth: 1,
      borderBottomColor: '#F5EDE4',
      // marginBottom: 6,
      marginRight: 10,
      marginLeft: 10,
      // marginTop: 6
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
      marginTop: 24,
      alignItems: "flex-end",
      position: 'absolute',
      right: 16
    },
    catalog: {
      // flex: 1,
      height: '100%',
      backgroundColor: "#FAFAFA",
    },
    alphabet: {
      // flex: 0.1,
      color: "#292929",
      marginTop: 114,
      left: 13,
      zIndex: 10
    },
    alphaword: {
      marginBottom: 5,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 30,
      paddingVertical: 2.5
    },
    FlatListCatalog: {
      marginLeft: 60,
      paddingRight: 60,
      flex: 1,
      paddingTop: 10,
    },
    FlatListAlphabet: {
      backgroundColor: '#FAFAFA',
      paddingHorizontal: 2.5
    }

  });


