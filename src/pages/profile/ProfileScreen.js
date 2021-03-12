import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ProfileHeader } from './ProfileHeader'
import { useFonts } from 'expo-font';








export  function ProfileScreen({route}) {


  // const [loaded] = useFonts({
  //   Gilroy: require('../../../assets/fonts/Gilroy-Regular.ttf'),
  // });
  
  // if (!loaded) {
  //   return null;
  // }


  

// Хз, фигня какая-то






const [isLoading, setLoading] = useState(true);
const [data, setData] = useState([]);


useEffect(() => {
  // fetch('http://www.s1928.konversia.net/api/get_names')
  fetch(`http://www.s1928.konversia.net/api/get_name?name_id=${route.params.paramKey}`)
    .then((response) => response.json())
    .then((json) => setData(json.names))
    .catch((error) => console.error(error))
    .finally(() => setLoading(false));
}, []);









    return (
      <ScrollView style={styles.profile}>
        <View style={styles.profileHeader}>
         <Text style={styles.profileName}>
         {route.params.paramKey}
         </Text>
         <Text style={styles.profileSureName}>
         {/* Иван Петрович Николаев ИПН, НИП */}
         {route.params.description}
         </Text>
         <Text style={styles.profileTranscription}>
         
         </Text>
         <Text style={styles.profileSimilarNames}>
         Игорёк, Игорёчек, Игорюша
         </Text>
         <Text style={styles.profileNameDesc}>
         Имя Игорь русское, славянское, православное. Скандинавского происхождения, означает «воинственный»..
         </Text>
        </View>
        <View style={styles.profileTextBlock}>
          <Text style={styles.profilePopularPersonTitle}>Известные люди</Text>
          <Text style={styles.profilePopularPersonText}>Игорь Святославич ((1151—1202) князь новгород-северский, князь черниговский, из рода Ольговичей, сын Святослава Ольговича; главный герой «Слова о полку Игореве») </Text>
          <Text style={styles.profilePopularPersonText}>Игорь Стравинский (русский композитор, дирижёр и пианист, один из крупнейших представителей мировой музыкальной культуры XX века) </Text>
          <Text style={styles.profilePopularPersonText}>Игорь Бриль (джазовый пианист) </Text>
          <Text style={styles.profilePopularPersonText}>Игорь Северянин  (русский поэт «серебряного века»)</Text>
          <Text style={styles.profilePopularPersonText}>Игорь Кио цирковой (артист- иллюзионист )</Text> 
        </View>

        <View style={styles.profileTextBlock}>
          <Text style={styles.profilePopularPersonTitle}>Характер</Text>
          <Text style={styles.profilePopularPersonText}>Игорь Святославич ((1151—1202) князь новгород-северский, князь черниговский, из рода Ольговичей, сын Святослава Ольговича; главный герой «Слова о полку Игореве») </Text>
          <Text style={styles.profilePopularPersonText}>Игорь Стравинский (русский композитор, дирижёр и пианист, один из крупнейших представителей мировой музыкальной культуры XX века) </Text>
          <Text style={styles.profilePopularPersonText}>Игорь Бриль (джазовый пианист) </Text>
          <Text style={styles.profilePopularPersonText}>Игорь Северянин  (русский поэт «серебряного века»)</Text>
          <Text style={styles.profilePopularPersonText}>Игорь Кио цирковой (артист- иллюзионист )</Text> 
        </View>

      </ScrollView>
    );
  }






  
const styles = StyleSheet.create({ 
  profile: {
    flex: 1,
    backgroundColor: '#FFF7ED',
    paddingLeft: 40,
    paddingRight: 40
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