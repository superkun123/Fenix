import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity, ScrollView, Button, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons'; 
import { NavigationContainer,  useScrollToTop } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ProfileHeader } from './ProfileHeader'
import { useFonts } from 'expo-font';
import Modal from 'react-native-modal';
import { ProfileScreen } from '../profile/ProfileScreen'
 
const Stack = createStackNavigator();







export  function ProfileMini({route, navigation}) {



let name = route.params.paramKey
let id = route.params.description


const [isLoading, setLoading] = useState(true);
const [data, setData] = useState([]);




useEffect(() => {
  // fetch('http://www.s1928.konversia.net/api/get_names')
  fetch(`http://www.s1928.konversia.net/api/get_name?name_id=${route.params.description}`)
    .then((response) => response.json())
    .then((json) => setData(json.name))
    .catch((error) => console.error(error))
    .finally(() => setLoading(false));
}, []);








if (isLoading == false) { 


  



    return (

      <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={styles.profile}>
        <View>


        </View>

        <View style={styles.profileHeader}>
         <Text style={styles.profileName}>
         {route.params.paramKey}
         </Text>
         <View style={{flexDirection:'row', justifyContent: 'center', marginBottom: 30}}>
           {data.colors.map((prop, key) => {
         return (
           <View style={{height: 21, width: 14, backgroundColor: `#${prop.color}`, flexDirection: 'row'}} key={key}>
             {/* <Text>{prop.color}</Text> */}
           </View>
         );
      })}
          
         </View>
         <Text style={styles.profileSureName}>
         {/* Иван Петрович Николаев ИПН, НИП */}
         {route.params.description}
         </Text>
         <Text style={styles.profileTranscription}>
           {data.name_translit}
         </Text>
         <Text style={styles.profileSimilarNames}>
         {data.variants}
         </Text>
         <Text style={styles.profileNameDesc}>
         {data.description}
         </Text>
        </View>
        <View>
            <Text style={styles.showmore} onPress={() => {
                
                navigation.navigate('Подборка', {
                  screen: 'ProfileScreen',
                  params: { 
                    paramKey: name,
                    description: id,
                  },
        }) 
      }}
            >Подробнее</Text>
        </View>


      </View>
      </ScrollView>
    );
  } else {

    return (
      <View style={styles.profileEpmty} >
        <ActivityIndicator size="large" color="#5DADC1"/>
      </View>
    )

  }
  }







const styles = StyleSheet.create({ 
  profile: {
    flex: 1,
    backgroundColor: '#FFF7ED',
    minHeight: 500,
    paddingLeft: 26,
    paddingRight: 26,
    marginRight: 25,
    marginLeft: 25,
    marginTop: 30,
    marginBottom: 70,
    borderRadius: 20,
    shadowColor: "#333",
    shadowOffset:{
    width: 0,
    height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  profileEpmty: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#FFF7ED',
  },
  profileName: {
    fontFamily: 'Gilroy',
    textAlign: 'center',
    fontSize: 24,
    color: '#3C3C3C',
    marginTop: 35,
    marginBottom: 5 ,
    lineHeight: 33
  },
  profileSureName: {
    fontFamily: 'Gilroy',
    textAlign: 'center',
    fontSize: 14,
    color: '#3C3C3C',
    marginBottom: 28,
    paddingLeft: 32,
    paddingRight: 32,
    lineHeight: 23

  },
  profileHeader: {
    textAlign: 'center',
    fontFamily: 'Gilroy'
  },
  profileTranscription: {
    fontFamily: 'Gilroy',
    textAlign: 'center',
    fontSize: 24,
    paddingBottom: 15,
    borderBottomColor: '#FFEAD0',
    borderBottomWidth: 1,
    marginBottom: 15
  },
  profileSimilarNames: {
    fontFamily: 'Gilroy',
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 20,
    paddingLeft: 32,
    paddingRight: 32,
    lineHeight: 23,
  },
  profileNameDesc: {
    fontFamily: 'Gilroy',
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 28,
    paddingBottom: 30,
    marginBottom: 20,
  },
  profilePopularPersonTitle: {
    fontFamily: 'Gilroy',
    fontSize: 24,
    lineHeight: 33,
    marginBottom: 20,

  },
  showmore: {
      textAlign: 'center',
      fontSize: 16,
      color: '#5DADC1',
      fontFamily: 'GilroyMedium',
      marginBottom: 47
  },
  profilePopularPersonText: {
    fontFamily: 'Gilroy',
    fontSize: 14,
    lineHeight: 24,
    marginBottom: 20
  },
  profileTextBlock: {
    marginBottom: 40
  },
  charTitle: {
    marginBottom: 10,
    fontSize: 16
  },
  modalBody: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 18,
    paddingBottom: 12
  },
  modalTitle: {
    fontFamily: 'GilroyMedium',
    fontSize: 17,
    marginBottom: 7,
    textAlign: 'center'  
  },
  modalDesc: {
    fontFamily: 'Gilroy',
    fontSize: 13,
    marginBottom: 19,
    textAlign: 'center'  
  },
  modalFooter: {
    borderTopColor: '#E0E0E0',
    borderTopWidth: 1,
    marginLeft: -18,
    marginRight: -18,
    padding: 10,
    alignItems: 'center'
  },
  closeModalText: {
    fontSize: 17,
    color: '#5AA9BD',
    fontFamily: 'GilroyMedium'
  }


})