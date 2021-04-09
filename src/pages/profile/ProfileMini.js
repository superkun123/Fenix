import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity, ScrollView, Button, Pressable, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons'; 
import { NavigationContainer,  useScrollToTop } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ProfileHeader } from './ProfileHeader'
import { useFonts } from 'expo-font';
import Modal from 'react-native-modal';
import { ProfileScreen } from '../profile/ProfileScreen'
import Swiper from 'react-native-deck-swiper'
import { SvgComponentArrowRight } from '../../../assets/jsxSvg/arrowRightWhite'
import AsyncStorage from '@react-native-async-storage/async-storage';
 
const Stack = createStackNavigator();









export  function ProfileMini({route, navigation}) {



// let name = route.params.paramKey
// let id = route.params.description


const [isLoading, setLoading] = useState(true);
const [data, setData] = useState([]);

const [isFullLoading, setFullLoading] = useState(true);
const [fullData, setFullData] = useState([1,2,3,4,5]);
const [index, setIndex] = useState(0)
const [colorExist, setColorExist] = useState(0)
const [colorLoad, setColorLoad] = useState(false)
const [colorDesc, setColorDesc] = useState('')
const [loadColor, setLoadColor] = useState(false)
const [fatherFirstNameHook, setFirstNameHook] = useState('')
const [fatherSecondNameHook, setSecondNameHook] = useState('')
let singleId = 1



const getData = async () => {
  try {
    const fatherFirstNameStore = await AsyncStorage.getItem('fatherFirstName')
    const fatherSecondNameStore = await AsyncStorage.getItem('fatherSecondName')
    if(fatherFirstNameStore !== null) {
      setFirstNameHook(fatherFirstNameStore)
      setSecondNameHook(fatherSecondNameStore)
    }
  } catch(e) {
    // error reading value
  }
}


getData()





// useEffect(() => {
//   // fetch('http://www.s1928.konversia.net/api/get_names')
//   fetch(`http://www.s1928.konversia.net/api/get_name?name_id=${route.params.description}`)
//     .then((response) => response.json())
//     .then((json) => setData(json.name))
//     .catch((error) => console.error(error))
//     .finally(() => setLoading(false));
// }, []);



// Неплохое решение, но хз

// useEffect(() => {
//   // fetch('http://www.s1928.konversia.net/api/get_names')
//   fetch(`http://www.s1928.konversia.net/api/get_name?name_id=${index}`)
//     .then((response) => response.json())
//     .then((json) => setData(json.name))
//     .catch((error) => console.error(error))
//     .finally(() => setLoading(false));
// }, [index, route.params.description, route.params.key]);


// useEffect(() => {
//   // fetch('http://www.s1928.konversia.net/api/get_names')
//   fetch(`http://www.s1928.konversia.net/api/get_name?name_id=18`)
//     .then((response) => response.json())
//     .then((json) => setFullData(json.name))
//     .catch((error) => console.error(error))
//     .finally(() => setFullLoading(false));
// }, [index]);

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
  getData()
  // fetch('http://www.s1928.konversia.net/api/get_names')
  fetch(`http://www.s1928.konversia.net/api/get_block?block_id=2`)
    .then((response) => response.json())
    .then((json) => setColorExist(json.value))
    .catch((error) => console.error(error))
    .finally(() => setColorLoad(true));
}, []);







useEffect(() => {
  getData()
  // fetch('http://www.s1928.konversia.net/api/get_names')
  fetch(`http://www.s1928.konversia.net/api/get_names?name_ids=true&gender_id=${route.params.genderId}&father_name=${fatherFirstNameHook}&father_surname=${fatherSecondNameHook}&is_full=1`)
    .then((response) => response.json())
    .then((json) => setData(json.names))
    .catch((error) => console.error(error))
    .finally(() => setLoading(false));
}, [route.params.genderId, getData]);



  const onSwiped = () => {
    // transitionRef.current.animateNextTransition();
    setIndex(index + 1);
  };



// let name = ''
// let id = 0

//   const array = () => {
//     data.forEach(elem => {
//       name = elem.name
//       id = elem.name_id
//     })
//   }


//   array()



const swiperRef = React.createRef();


const swipeBackAnim = () => {
  // swiperRef.current.swipeLeft()
  swiperRef.current.swipeBack()
}


const Initials = () => {
  const fatherSecondLetter =  fatherSecondNameHook.charAt(0);
  const fatherFirstLetter = fatherFirstNameHook.charAt(0)

}

const fatherFirstLetter = () => {
  return fatherFirstNameHook.charAt(0)
}

const fatherSecondName = () => {

}







const Colors = (props) => {

  const index = data.map(e => e.name_id).indexOf(props.id);







  if(colorExist == 0) {
    return( 
      <View style={{flexDirection:'row', justifyContent: 'center', marginBottom: 30, position: 'relative'}}>


      {data[index].colors.map((prop, key) => {
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

           
             </View>
    </View>
    )

  } else {
    return null
  }
}






const Card = (card , data) => {


  
const name = card.name
const id = card.name_id
singleId = id






 


  return ( 
  <View style={styles.profile}>
  <View>
    
  </View>

  <View style={styles.profileHeader}>
   <Text style={styles.profileName} >
   {card.name}
   {/* {route.params.paramKey} */}
   {/* {Alert.alert(data.length)} */}
   </Text>

   <Colors id={id} > </Colors>

   <Text style={styles.profileSureName}>
   {/* Иван Петрович Николаев ИПН, НИП */}
   {card.name + ' '}
   {fatherFirstNameHook + ' '}
   {fatherSecondNameHook}
   {}
   {/* {card.middle_name + ' '} 
   {card.surname} */}

   {/* {card.name_id} */}
   {/* {route.params.description} */}
   </Text>
  

   <View style={styles.profileTranscription}>
     {/* {data.name_translit} */}
     <Text style={styles.profilteTransText}>{card.name_translit}</Text>
   </View>
   
   <Text style={styles.profileSimilarNames}>
   {card.variants}
   </Text>
   <Text style={styles.profileNameDesc}>
   {card.description}
   </Text>
  </View>
 
  <View style={styles.center}>
      <Text style={styles.showmore} onPress={() => {
          
          navigation.navigate('ProfileScreen', {
              paramKey: name,
              description: id,
  }) 
}}
      >Подробнее </Text>


<TouchableOpacity style={styles.right} onPress={() => swiperRef.current.swipeRight()}>
        <SvgComponentArrowRight color='#444444'></SvgComponentArrowRight>
  </TouchableOpacity>


  <TouchableOpacity style={styles.left} onPress={() => swipeBackAnim()}>
        <SvgComponentArrowRight color='#5DADC1'></SvgComponentArrowRight>
  </TouchableOpacity>

  </View>
  

  


</View>
)
}






if (isLoading == false) { 


  



    return (

      <View style={{flex: 1, backgroundColor: '#fff'}}>


        
      <View style={styles.profileContainer}>
        
      <Swiper
        ref={swiperRef}
        cards={data}
        cardIndex={index}
        renderCard={Card}
        onSwiped={onSwiped}
        swipeBackCard={true}
        goBackToPreviousCardOnSwipeLeft={true}
        // disableLeftSwipe={true}
        // onSwipedLeft={() => swipeBackAnim()}
        backgroundColor="#fff"
        stackSize={3}
        stackScale={0}
        stackSeparation={10}
        infinite={true}
        verticalSwipe={false}
        cardIndex={route.params.indexElem}
        swipeAnimationDuration={1000}
        >

        </Swiper>

        
        


      </View>
      


        {/* <Swiper
        cards={data}
        cardIndex={index}
        renderCard={(card) => <Card card={card}/>}
        >

        </Swiper> */}




      </View>
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
  profileContainer: {
    flex: 1,
    zIndex: 1,
    minHeight: 600,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // alignContent: 'center',
    // justifyContent: 'center',
    marginTop: -30
  },
  profile: {
    flex: 1,
    backgroundColor: '#FFF7ED',
    // minHeight: 500,
    paddingLeft: 26,
    paddingRight: 26,
    // marginRight: 25,
    // marginLeft: 25,
    // marginTop: 0,
    // marginBottom: 70,
    maxHeight: 500,
    borderRadius: 20,
    // overflow: 'hidden',
    // paddingBottom: 50,
    // zIndex: 1,
    shadowOffset:{
    width: 0,
    height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
    shadowColor: "#333"
  },
  profile2: {
    flex: 1,
    backgroundColor: '#FFF7ED',
    minHeight: 520,
    paddingLeft: 26,
    paddingRight: 26,
    marginRight: 25,
    marginLeft: 25,
    marginTop: 30,
    marginBottom: 70,
    borderRadius: 20,
    shadowColor: "#333",
    zIndex: 0,
    width: 320,
    position: 'absolute',
    transform: [{ rotate: "2deg" }, {translateY: 10}],
    shadowOffset:{
      width: 0,
      height: 0,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
  },
  colorInfo: {
    zIndex: 10,
    position: 'absolute',
    left: 20,
  },
  right: {
    position: 'absolute',
    right: 0,
    top: 11,
    padding: 5
  },
  left: {
    position: 'absolute',
    top: 11,
    left: 0,
    padding: 5,
    transform: [{rotate: '180deg'}]
  },
  profile3: {
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
    zIndex: -1,
    width: 320,
    position: 'absolute',
    transform: [{ rotate: "-3deg" }, {translateY: 10}],
    shadowOffset:{
      width: 0,
      height: 0,
      },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 1,
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
    lineHeight: 23,
    marginBottom: '12%'

  },
  profileHeader: {
    textAlign: 'center',
    fontFamily: 'Gilroy'
  },
  profileTranscription: {
    paddingBottom: 15,
    borderBottomColor: '#FFEAD0',
    borderBottomWidth: 1,
    marginBottom: 15
  },
  profilteTransText: {
    fontFamily: 'Gilroy',
    textAlign: 'center',
    fontSize: 24,
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
    paddingBottom: 0,
    marginBottom: 30,
    overflow: 'hidden',
    maxHeight: 110

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
      marginBottom: 43,
      maxWidth: 120,
      padding: 8
  },
  center: {
    alignItems: 'center'
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