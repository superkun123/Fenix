import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity, ScrollView, Button, Pressable } from 'react-native';




export function Search({route, navigation}) {

// let name = route.params.paramKey
// let id = route.params.description


const [isLoading, setLoading] = useState(true);
const [data, setData] = useState([]);


useEffect(() => {
  fetch('http://www.s1928.konversia.net/api/get_names?name_ids=true&sort=asc')
    .then((response) => response.json())
    .then((json) => setData(json.names))
    .catch((error) => console.error(error))
    .finally(() => setLoading(false));
}, []);



const Item = ({ item, onPress, style }) => (
 

  <Pressable
     style={({pressed}) => [
      {
        backgroundColor: pressed ? '#5DADC1' : '#fff',
      },
      styles.nameBtn,
    ]}
  children={({ pressed }) => (
    <Text style={{ color: pressed ? '#5DADC1' : '#979797'}}>
      {item.name}
    </Text>)}
    onPress={() => {
                
      navigation.navigate('Каталог', {
        screen: 'ProfileScreen',
        params: { 
          paramKey: item.name,
          description: item.name_id,
        },
}) 
}}

  // onPress={() => navigation.navigate('ProfileScreen', {
  //   // paramKey: userName,
  //   paramKey: item.name,
  //   description: item.name_id,
  // } )}
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
      <View style={{ flex: 1, backgroundColor: '#FAFAFA'}}>
      <Text style={styles.mainTitle}>Поиск</Text>

      <FlatList
        data={data}
        renderItem={renderItem}
        key={renderItem.item}
        keyExtractor={(item) => item.id}
        style={styles.FlatListCatalog}
      />
      
    </View>
  
  );
}


const styles = StyleSheet.create({ 
  mainTitle: {
    textAlign: 'center',
    fontFamily: 'GilroyMedium',
    fontSize: 24,
    marginTop: 50,
    marginBottom: 30
  },
  nameBtn: {
    paddingBottom: 12.5,
    paddingTop: 12.5,
    fontSize: 16,
    color: "#979797",
    backgroundColor: '#FAFAFA',
    paddingHorizontal: 35
  },
  FlatListCatalog: {
    paddingTop: 10
  }



})