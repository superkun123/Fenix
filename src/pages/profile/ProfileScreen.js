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








export  function ProfileScreen({route}) {



  let modalText = 'Текст'

 
 





const [isLoading, setLoading] = useState(true);
const [data, setData] = useState([]);
const [isModalVisible, setModalVisible] = useState(false);


const changeText = (prop) => {
  modalText = 'Текст'
}


changeText()


// changeText('Новый текст') 


  
const toggleModal = () => {
  setModalVisible(!isModalVisible);
};







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

      
      <ScrollView style={styles.profile}>
        <View>
          
        <Modal isVisible={isModalVisible} 
        animationOutTiming={500}
        onBackdropPress={() => setModalVisible(false)}
        backdropTransitionInTiming={500}
          backdropTransitionOutTiming={0}
          animationInTiming={500}
          hideModalContentWhileAnimating={true}>
          <View style={styles.modalBody}>
            <Text style={styles.modalTitle}>Характер</Text>
            <Text style={styles.modalDesc}>Каждое имя содержит уникальный характер, многое зависит от выбора имени</Text>
          <View style={styles.modalFooter}>
          <TouchableOpacity style={styles.closeModal} color="#5AA9BD" title="Закрыть" onPress={toggleModal}>
            <Text style={styles.closeModalText}>Закрыть</Text>
          </TouchableOpacity>
          </View>
          
          </View>

        </Modal>


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
        <View style={styles.profileTextBlock}>
          <Text style={styles.profilePopularPersonTitle}>Известные люди</Text>
          <Text style={styles.profilePopularPersonText}>{data.peoples}</Text>
        </View>

        <View style={styles.profileTextBlock}>
          <Text style={styles.profilePopularPersonTitle}>Характеристики</Text>


         

          {data.props_name.map((prop, key) => {



         return (
           <View>
             <View style={{
               flexDirection: 'row',
               justifyContent: 'space-between'
             }}>
             <Text style={styles.charTitle} key={key}>{prop.title}</Text>
             <TouchableOpacity  onPress={toggleModal}>
             <Feather name="info" size={18} color="#58A7BB" />
             </TouchableOpacity>
           
             </View>
            <Text style={styles.profilePopularPersonText} key={key}>{prop.text}</Text>

           </View>
         );
      })}

        
        </View>

        <TouchableOpacity>
          <Text>Up</Text>
        </TouchableOpacity>



     
       



    

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