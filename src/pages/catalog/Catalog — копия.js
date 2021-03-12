import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TouchableHighlight, Pressable, ScrollView, ActivityIndicator, FlatList, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ProfileScreen } from '../profile/ProfileScreen'






const Stack = createStackNavigator();



function CatalogScreen({ navigation }) {



  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);


  useEffect(() => {
    fetch('http://www.s1928.konversia.net/api/get_names')
      .then((response) => response.json())
      .then((json) => setData(json.names))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);



  // const userName = ' '






  const Item = ({ item, onPress, style }) => (
 

<TouchableHighlight
underlayColor="#5DADC1"
style={styles.nameBtn}
onPress={() => navigation.navigate('ProfileScreen', {
  // paramKey: userName,
  paramKey: item.name,
  description: item.description,
} )}
>

<Text style={styles.namebtnText}>{item.name}</Text>
</TouchableHighlight>




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

      <View style={styles.alphabet}>
      <TouchableOpacity style={styles.alphabetLetter}>
        <Text>А</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text>D</Text>
      </TouchableOpacity>
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

      <View  style={styles.settings}>
      <Ionicons name="ios-settings-outline" size={24} color="black" />
      </View>
    </View>
   
  
  );
}




export function Catalog() {

  const navigation = useNavigation()
 
  return (
      <Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
        <Stack.Screen options={{headerShown: false}} name="CatalogScreen" component={CatalogScreen} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen}  options={{ title: 'Подробнее'} } />
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
      lineHeight: 33
    },
    nameBtn: {
      color: '#5DADC1',
      backgroundColor: '#fff',
      paddingTop: 14,
      paddingBottom: 14,
      alignItems: "center",
      borderRadius: 6,
      shadowColor: "#000",
shadowOffset:{
width: 0,
height: 20,
},
shadowOpacity: 0.2,
shadowRadius: 12.22,
elevation:10,
      marginBottom: 10,
      marginRight: 10,
      marginLeft: 10,
      marginTop: 10

    },
    nameBtnContainer: {
      flex: 1,
      justifyContent: "center",
    },
    namebtnText: {
      justifyContent: "center",
      fontSize: 16
    },
    subtitle: {
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
      backgroundColor: "#fff",
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


