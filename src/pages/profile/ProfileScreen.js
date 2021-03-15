import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity, ScrollView, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NavigationContainer,  useScrollToTop } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ProfileHeader } from './ProfileHeader'
import { useFonts } from 'expo-font';








export  function ProfileScreen({route}) {




 






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




// ${route.params.paramKey}



if (isLoading == false) { 

    return (
      <ScrollView style={styles.profile} >
        <View style={styles.profileHeader}>
         <Text style={styles.profileName}>
         {route.params.paramKey}
         </Text>
         <View style={{flexDirection:'row', justifyContent: 'center'}}>
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
        <View style={styles.profileTextBlock}>
          <Text style={styles.profilePopularPersonTitle}>Известные люди</Text>
          <Text style={styles.profilePopularPersonText}>{data.peoples}</Text>
        </View>

        <View style={styles.profileTextBlock}>
          <Text style={styles.profilePopularPersonTitle}>Характеристики</Text>

         

          {data.props_name.map((prop, key) => {
         return (
           <Text style={styles.profilePopularPersonText} key={key}>{prop}</Text>
         );
      })}

        
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
    paddingLeft: 40,
    paddingRight: 40
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
    marginBottom: 17,
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
    paddingBottom: 30,
    borderBottomColor: '#FFEAD0',
    borderBottomWidth: 1,
    marginBottom: 30
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
    paddingLeft: 17,
    paddingRight: 17,
    paddingBottom: 30,
    borderBottomColor: '#FFEAD0',
    marginBottom: 30,
    borderBottomWidth: 1,
  },
  profilePopularPersonTitle: {
    fontFamily: 'Gilroy',
    fontSize: 24,
    lineHeight: 33,
    marginBottom: 20,

  },
  profilePopularPersonText: {
    fontFamily: 'Gilroy',
    fontSize: 14,
    lineHeight: 24,
    marginBottom: 20
  },
  profileTextBlock: {
    marginBottom: 40
  }
})