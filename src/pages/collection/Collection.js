import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TouchableHighlight, Pressable, ScrollView, ActivityIndicator, FlatList, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ProfileMini } from '../profile/ProfileMini'
import { ProfileScreen } from '../profile/ProfileScreen'
import { useFonts } from 'expo-font';
import { Filter } from '../filter/Filter'






const Stack = createStackNavigator();







function CollectionScreen({ navigation, route }) {





  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [gender, setGender] = useState(2)


const rerender = () => {
  setGender(1)
}

 


  useEffect(() => {
    // fetch('http://www.s1928.konversia.net/api/get_names')
    fetch(`http://www.s1928.konversia.net/api/get_names?name_ids=true&sort=asc&dfather_name=${route.params.fatherFirstName}&father_surname=${route.params.fatherFirstName}&gender_id=${gender}&is_full=1`)
    // fetch('http://www.s1928.konversia.net/api/get_names?name_ids=true&sort=asc')
      .then((response) => response.json())
      .then((json) => setData(json.names))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);



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
onPress={() => navigation.navigate('ProfileMini', {
  // paramKey: userName,
  paramKey: item.name,
  description: item.name_id,
} )}
>


{/* <Text style={styles.namebtnText}>{item.name}</Text> */}
</Pressable>




  );

  const renderItem = ({ item }) => {

    rerender()


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

      <View style={styles.alphabet}>
      <TouchableOpacity style={styles.alphabetLetter}>
        <Text>А</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text>Б</Text>
      </TouchableOpacity>
        {/* <Text>А Б В Г Д</Text> */}
      </View>
 
      <View style={styles.nameBtnContainer}>
      <Text  style={styles.title}>Подборка</Text>
      <Text>{route.params.genderId}</Text>
      <Text>{route.params.fatherFirstName}</Text>
      <Text>{route.params.fatherSecondName}</Text>

      
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




export function Collection() {
  


  const navigation = useNavigation()
 
  return (
      <Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
        <Stack.Screen options={{headerShown: false}} name="CollectionScreen" component={CollectionScreen} />
        <Stack.Screen name="ProfileMini" component={ProfileMini}  options={{ title: 'Подробнее', headerTitleStyle: {
            fontFamily: 'GilroyMedium',
            shadowOpacity: 0,
            elevation: 0,
          },
          } } />

<Stack.Screen name="ProfileScreen" component={ProfileScreen}  options={{ title: 'Подробнее', headerTitleStyle: {
            fontFamily: 'GilroyMedium',
            shadowOpacity: 0,
            elevation: 0
          },
          } } />
            

           <Stack.Screen name="Filter" component={Filter}  options={{ title: 'Фильтр', headerTitleStyle: {
            fontFamily: 'GilroyMedium',
            shadowOpacity: 0,
            elevation: 0,
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
    }

  });


