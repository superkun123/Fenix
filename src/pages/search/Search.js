import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, ActivityIndicator, TouchableOpacity, ScrollView, Button, Pressable, Alert } from 'react-native';
import { ProfileScreen } from '../profile/ProfileScreen'
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import filter from 'lodash.filter';


const Stack = createStackNavigator();


 function SearchScreen({route, navigation}) {

// let name = route.params.paramKey
// let id = route.params.description


const [isLoading, setLoading] = useState(false);
const [data, setData] = useState([]);
const [query, setQuery] = useState('');
const [fullData, setFullData] = useState([]);





useEffect(() => {
  setLoading(true);

  fetch('http://www.s1928.konversia.net/api/get_names?name_ids=true')
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



// function renderHeader(props) {
//   return (
//     <View
//       style={{
//         backgroundColor: '#fff',
//         marginHorizontal: 15,
//         paddingHorizontal: 20,
//         paddingVertical: 15,
//         borderRadius: 25,
//         marginBottom: 30
//       }}
//     >
//       <TextInput
//         autoCapitalize="none"
//         key={1}
//         autoCorrect={false}
//         // clearButtonMode="always"
//         value={query}
//         onChangeText={queryText => handleSearch(queryText)}
//         placeholder="Поиск"
//         style={{ backgroundColor: '#fff', paddingHorizontal: 20 }}
//       />
//     </View>
//   );
// }


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
                
      navigation.navigate('Поиск', {
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

  let key = 0


  return (
    <Item
      key={key}
      item={item}
      onPress={() => setSelectedId(item.id)}
    />
  );
};





  return (
      <View style={{ flex: 1, backgroundColor: '#FAFAFA'}}>
      <Text style={styles.mainTitle}>Поиск</Text>

      <FlatList
        ListHeaderComponent={
          <View
      style={{
        backgroundColor: '#fff',
        marginHorizontal: 15,
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 25,
        marginBottom: 30
      }}
    >
      <TextInput
        autoCorrect={false}
        clearButtonMode="always"
        value={query}
        onChangeText={queryText => handleSearch(queryText)}
        placeholder="Поиск"
        style={{ backgroundColor: '#fff', paddingHorizontal: 20 }}
      />
    </View>
        }
        // extradata={fullData}
        data={data}
        renderItem={renderItem}
        key={renderItem.item}
        // keyExtractor={(item) => item.id}
        style={styles.FlatListCatalog}
      />
      
    </View>
  
  );
}




export function Search() {
  


  const navigation = useNavigation()
 
  return (
      <Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
        <Stack.Screen options={{headerShown: false}} name="SearchScreen" component={SearchScreen} initialParams={{ genderId: '', fatherFirstName: '', fatherSecondName: ''  }} />
       

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
    paddingTop: 10,
    marginBottom: 20
  }



})