import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity, ScrollView, Button, Pressable, Alert, Share } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons'; 
import { NavigationContainer,  useScrollToTop } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ProfileHeader } from './ProfileHeader'
import { useFonts } from 'expo-font';
import Modal from 'react-native-modal';
import { useRef } from 'react';
import { SvgComponentArrowTop } from '../../../assets/jsxSvg/arrowTopWhite'
import { SvgComponentFlag } from '../../../assets/jsxSvg/flag'
import { SvgComponentPlus } from '../../../assets/jsxSvg/plus'
import { SvgComponentShare } from '../../../assets/jsxSvg/share'
import Svg from 'react-native-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { abs } from 'react-native-reanimated';
import { SvgComponentLike } from '../../../assets/jsxSvg/like'








export  function ProfileScreen({route, navigation}) {



let modalText = 'Текст'







const [isLoading, setLoading] = useState(true);
const [data, setData] = useState([]);
const [isModalVisible, setModalVisible] = useState(false);
const [descText, setText] = useState('123');
const scrollRef = useRef(); 
const [colorExist, setColorExist] = useState(0)
const [colorLoad, setColorLoad] = useState(false)
const [charTitleLoad, setcharTitleLoad] = useState(false)
const [charTitle, setCharTitle] = useState('Хар')
const [colorDesc, setColorDesc] = useState('')
const [loadColor, setLoadColor] = useState(false)
// const [favorite, setFavorite] = useState([1])




let arrayStore = []


const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('favorite')
    const jsonArray = JSON.parse(jsonValue)
    arrayStore.push(jsonArray)
    // Alert.alert(`${jsonArray}`)
    // arrayStore = JSON.parse(jsonValue)
    // Alert.alert(arrayStore)
    // Alert.alert(`${arrayStore}`)

  } catch(e) {
    Alert.alert('error')
    // error reading value
  }
}


const storeData = async (value) => {
  let result = await getData()
  try {
        arrayStore.push(value)
        // setFavorite(arr => [...arr, value])
        const jsonValue = JSON.stringify(arrayStore)
        
        // Alert.alert(jsonValue)
        AsyncStorage.setItem('favorite', jsonValue)
      } catch (e) {
        // saving error
      }
}


const deleteData = async (value) => {
  let result = await getData()
  // let storeResult = await storeData()
  try {
        const deleteIndex = arrayStore.indexOf(value)
        arrayStore.splice(deleteIndex)
        const jsonValue = JSON.stringify(arrayStore)
        AsyncStorage.setItem('favorite', jsonValue)
      } catch (e) {
        // saving error
      }
}



// const deleteData = (value) => {
//   AsyncStorage.clear();
// }


// AsyncStorage.clear();



// const storeData = async (value) => {
//   getData()
//   try {
//     arrayStore.push(value)
//     // setFavorite(arr => [...arr, value])
//     const jsonValue = JSON.stringify(arrayStore)
    
//     // Alert.alert(jsonValue)
//     AsyncStorage.setItem('favorite', jsonValue)
//   } catch (e) {
//     // saving error
//   }
// }



// const getData = () => {
//     arrayStore.push(1)
//     Alert.alert(`${arrayStore}`)
// }




// Попробуй избавиться от массива апстор и пушить прям в сторедж





// const storeData = (value) => {
//   getData()
//   Alert.alert(`${arrayStore}`)
// }

 
 


const onPressTouch = () => {
  scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
  });
}





// changeText('Новый текст') 


  
// function toggleModal() {
//   setModalVisible(!isModalVisible);
//   setText(prop.text)
// };



useEffect(() => {
  // getData()
  // fetch('http://www.s1928.konversia.net/api/get_names')
  fetch(`http://www.s1928.konversia.net/api/get_block?block_id=5`)
    .then((response) => response.json())
    .then((json) => setColorDesc(json.value))
    .catch((error) => console.error(error))
    .finally(() =>  setLoadColor(true));
}, []);




useEffect(() => {
  // getData()
  // fetch('http://www.s1928.konversia.net/api/get_names')
  fetch(`http://www.s1928.konversia.net/api/get_block?block_id=6`)
    .then((response) => response.json())
    .then((json) => setCharTitle(json.value))
    .catch((error) => console.error(error))
    .finally(() =>  setcharTitleLoad(true));
}, []);


useEffect(() => {
  // getData()
  // fetch('http://www.s1928.konversia.net/api/get_names')
  fetch(`http://www.s1928.konversia.net/api/get_block?block_id=2`)
    .then((response) => response.json())
    .then((json) => setColorExist(json.value))
    .catch((error) => console.error(error))
    .finally(() => setColorLoad(true));
}, []);



useEffect(() => {
  // getData()
  // fetch('http://www.s1928.konversia.net/api/get_names')
  fetch(`http://www.s1928.konversia.net/api/get_name?name_id=${route.params.description}`)
    .then((response) => response.json())
    .then((json) => setData(json.name))
    .catch((error) => console.error(error))
    .finally(() => setLoading(false));
}, [route.params.description]);



const inputEl = useRef(null);



const Colors = () => {
  if(colorExist == 1) {
    return( 
      <View style={{flexDirection:'row', justifyContent: 'center', marginBottom: 30, position: 'relative'}}>
         
      {data.colors.map((prop, key) => {
    return (
      <View style={{height: 21, width: 14, backgroundColor: `#${prop.color}`, flexDirection: 'row'}} key={key}>
      </View>
    );
  })}
         <View style={{
               flexDirection: 'row',
               justifyContent: 'flex-start',
               position: 'relative',
             }}>
             {/* <Text style={styles.charTitle}></Text> */}
             <TouchableOpacity style={styles.colorInfo}  onPress={() => {
                setModalVisible(!isModalVisible);
                setText(colorDesc)
             }}>
             <Feather name="info" size={18} color="#58A7BB" />
             </TouchableOpacity>
           
             </View>
    </View>
    )

  } else {
    return null
  }
}




  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'http://www.s1928.konversia.net/',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };




// ${route.params.paramKey}


if (isLoading == false) { 


  



    return (

      
      <ScrollView style={styles.profile} ref={scrollRef} bounces={false} >

        <View style={styles.flagContainer}>
        <SvgComponentFlag style={styles.flag}>
        </SvgComponentFlag>
        </View>

        <TouchableOpacity style={styles.like} onPress={() => storeData(`${route.params.description}`)}>
          {/* <Text>КЛИК</Text> */}
          <SvgComponentLike color='#fff' ></SvgComponentLike>
        </TouchableOpacity>


        <TouchableOpacity  onPress={() => deleteData(`${route.params.description}`)}>
          {/* <Text>КЛИК</Text> */}
          {/* <Text>Удалить</Text> */}
          <SvgComponentPlus style={styles.plus}></SvgComponentPlus>
        </TouchableOpacity>

    
        

        <View>

        <Modal isVisible={isModalVisible} 
          animationOutTiming={500}
          onBackdropPress={() => setModalVisible(false)}
          backdropTransitionInTiming={500}
            backdropTransitionOutTiming={0}
            animationInTiming={500}
            hideModalContentWhileAnimating={true}>
            <View style={styles.modalBody}>
              {/* <Text style={styles.modalTitle}>Характер</Text> */}

              
            
          <Text style={styles.modalDesc}>{descText}</Text>
    
   

              
            <View style={styles.modalFooter}>
            <TouchableOpacity style={styles.closeModal} color="#5AA9BD" title="Закрыть" onPress={() => {
                setModalVisible(!isModalVisible);}}>
              <Text style={styles.closeModalText}>Понял</Text>
            </TouchableOpacity>
            </View>
            
            </View>
  
          </Modal>

   


        </View>

        <View style={styles.profileHeader}>
          <TouchableOpacity style={styles.share} onPress={onShare}>
          <SvgComponentShare></SvgComponentShare>
          </TouchableOpacity>
         <Text style={styles.profileName}>
         {route.params.paramKey}
         </Text>
         <Colors>
         </Colors>
         {/* <View style={{flexDirection:'row', justifyContent: 'center', marginBottom: 30}}>
           {data.colors.map((prop, key) => {
         return (
           <View style={{height: 21, width: 14, backgroundColor: `#${prop.color}`, flexDirection: 'row'}} key={key}>
           </View>
         );
      })}
          
         </View> */}
         <Text style={styles.profileSureName}>
         {/* Иван Петрович Николаев ИПН, НИП */}
         {route.params.description}
         </Text>
         <View style={styles.profileTranscription}>
     {/* {data.name_translit} */}
     <Text style={styles.profilteTransText}>{data.name_translit}</Text>
   </View>
         
   <View style={styles.profileTranscription}>
   <Text style={styles.profileSimilarNames}>
         {data.variants}
         </Text>
   
         
         <Text style={styles.profileNameDesc}>
         {data.description}
         </Text>
         </View>
        </View>
        <View style={styles.profileTextBlock}>
          <Text style={styles.profilePopularPersonTitle}>Известные люди</Text>
          <Text style={styles.profilePopularPersonText}>{data.peoples}</Text>
        </View>

        <View style={styles.profileTextBlock}>
          <Text style={styles.profilePopularPersonTitle}>{charTitle}</Text>


         

          {data.props_name.map((prop, key) => {
         return (
           <View>
             <View style={{
               flexDirection: 'row',
               justifyContent: 'space-between',
             }}>
             <Text style={styles.charTitle} key={key}>{prop.title}</Text>
             <TouchableOpacity  onPress={() => {
                setModalVisible(!isModalVisible);
                setText(prop.text)
             }}>
             <Feather name="info" size={18} color="#58A7BB" />
             </TouchableOpacity>
           
             </View>
            <Text style={styles.profilePopularPersonText} key={key}>{prop.text}</Text>

           </View>
         );
      })}

        
        </View>


        <View style={styles.upBtnContainer}>
        <TouchableOpacity style={styles.upBtn} onPress={onPressTouch}>
          <SvgComponentArrowTop></SvgComponentArrowTop>
        </TouchableOpacity>
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
    // paddingLeft: 40,
    // paddingRight: 40,
    zIndex: 0
  },
  profilteTransText: {
    fontFamily: 'Gilroy',
    textAlign: 'center',
    fontSize: 24,
  },
  profileEpmty: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#FFF7ED',
  },
  flagContainer: {
    width: '100%',
    flex: 1,
    backgroundColor: '#fff',
    minHeight: 32,
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
  flag: {
    position: 'absolute',
    right: 20,
    transform: [{ translateY: 0 }],
    zIndex: 105,
  },
  plus: {
    position: 'absolute',
    right: 33,
    transform: [{ translateY: 20 }, {rotate: '45deg'}],
    zIndex: 110,
  },
  share: {
    marginTop: 30,
    marginBottom: -40
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
    fontFamily: 'Gilroy',
    paddingLeft: 30,
    paddingRight: 30
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
    marginBottom: 40,
    paddingHorizontal: 30
  },
  charTitle: {
    marginBottom: 10,
    fontSize: 16
  },
  modalBody: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 18,
    paddingBottom: 0
  },
  modalTitle: {
    fontFamily: 'GilroyMedium',
    fontSize: 17,
    marginBottom: 7,
    textAlign: 'center'  
  },
  colorInfo: {
    zIndex: 10,
    position: 'absolute',
    left: 20,
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
    padding: 0,
    alignItems: 'center'
  },
  closeModalText: {
    fontSize: 17,
    color: '#5AA9BD',
    fontFamily: 'GilroyMedium',
    textAlign: 'center'
  },
  closeModal: {
    width: '100%',
    textAlign: 'center',
    padding: 10,
    paddingBottom: 15
  },
  like: {
    position: 'absolute',
    right: 35,
    transform: [{ translateY: 15 }],
    zIndex: 110,
  },
  upBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 38,
    height: 38,
    borderRadius: 38,
    backgroundColor: '#5DADC1',
  },
  upBtnContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 40
  }


})