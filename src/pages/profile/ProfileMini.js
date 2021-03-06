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
import { LinearGradient } from 'expo-linear-gradient';
import { SvgComponentAdviceBg } from '../../../assets/jsxSvg/adviceBg'
import { SvgComponentAdvice} from '../../../assets/jsxSvg/advice'
import { SvgComponentFlag } from '../../../assets/jsxSvg/flag'
import { SvgComponentPlus } from '../../../assets/jsxSvg/plus'
import { SvgComponentLike } from '../../../assets/jsxSvg/like'
 
const Stack = createStackNavigator();





const swiperRef = React.createRef();



export  function ProfileMini({route, navigation}) {






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
const [adviceApi, setAdviceApi] = useState('адвайсапи')
const [loadAdvice, setLoadAdvice] = useState(false)
const [indexOfAdvice, setIndexOfAdvice] = useState(1)
const [advicePer, setAdvicePred] = useState(2)
const [adviceLoad, setAdviceLoad] = useState(false)
const [likeColor, setLikeColor] = useState('#5DADC1')
const [isFavorite, setIsFavorite] = useState(false)
const [currentId, setCurrentId] = useState(route.params.description)
const [nameDataLoad, isNameDataLoad] = useState(false)
const [storeName, isStoreName] = useState(0)
let singleId = 1






let arrayStore = []



const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('favorite')
    const jsonArray = JSON.parse(jsonValue)
    if (arrayStore.indexOf(jsonArray) !== -1 || jsonValue == [0, 1]) {
      arrayStore.push(jsonArray)
     
    } else {
      if(jsonArray.indexOf(`${currentId}`) !== -1) {
        setIsFavorite(true)
      } else {
        setIsFavorite(false)
      }

    }
    // Alert.alert(`${arrayStore}`)
 
    arrayStore = JSON.parse(jsonValue)
    // Alert.alert(` вывожу Дату: ${uniq}`)
    // Alert.alert(`${arrayStore}`)

  } catch(e) {
    Alert.alert('error')
    // error reading value
  }
}


const getDataNames = async () => {
  
  try {
    const fatherFirstNameStore = await AsyncStorage.getItem('fatherFirstName')
    const fatherSecondNameStore = await AsyncStorage.getItem('fatherSecondName')
    if(fatherFirstNameStore !== null) {
      setFirstNameHook(fatherFirstNameStore)
      setSecondNameHook(fatherSecondNameStore)
    }
    isNameDataLoad(true)
  } catch(e) {
    Alert.alert('Ошибка соединения с сервером')
    // error reading value
  }
}


const storeData = async (value) => {
  // let result = await getData()
  try {
    const deleteIndex = arrayStore.indexOf(value)
    if (deleteIndex == -1) {
      arrayStore.push(value)
      const jsonValue = JSON.stringify(arrayStore)
      AsyncStorage.setItem('favorite', jsonValue)
      setIsFavorite(true)
    }
      } catch (e) {
        // saving error
      }
      setIsFavorite(true)
      isStoreName(1)
}




const deleteData = async (value) => {
  let result = await getData()
  try {
        const deleteIndex = arrayStore.indexOf(value)
        if (deleteIndex !== -1) {
          arrayStore.splice(deleteIndex)
          const jsonValue = JSON.stringify(arrayStore)
          AsyncStorage.setItem('favorite', jsonValue)
          setIsFavorite(false)
        } else {
          
        }
    
      } catch (e) {
        // saving error
      }
}




React.useEffect(() => {
  const unsubscribe = navigation.addListener('focus', () => {
    getData()
    getDataNames()
  });

  // Return the function to unsubscribe from the event so it gets removed on unmount
  return unsubscribe;
}, [navigation]);



useEffect(() => {
  // fetch('https://narekaet.com/api/get_names')
  fetch(`https://narekaet.com/api/get_block?block_id=5`)
    .then((response) => response.json())
    .then((json) => setColorDesc(json.value))
    .catch((error) => console.error(error))
    .finally(() =>  setLoadColor(true));
}, []);


useEffect(() => {
  // fetch('https://narekaet.com/api/get_names')
  fetch(`https://narekaet.com/api/get_advices`)
    .then((response) => response.json())
    .then((json) => setAdviceApi(json.advices))
    .catch((error) => console.error(error))
    .finally(() =>  setLoadAdvice(true));
}, [indexOfAdvice]);


useEffect(() => {
  // fetch('https://narekaet.com/api/get_names')
  fetch(`https://narekaet.com/api/get_block?block_id=2`)
    .then((response) => response.json())
    .then((json) => setColorExist(json.value))
    .catch((error) => console.error(error))
    .finally(() => setColorLoad(true));
}, []);



useEffect(() => {
  // fetch('https://narekaet.com/api/get_names')
  fetch(`https://narekaet.com/api/get_block?block_id=4`)
    .then((response) => response.json())
    .then((json) => setAdvicePred(json.value))
    .catch((error) => console.error(error))
    .finally(() => setAdviceLoad(true));
}, []);







useEffect(() => {
  getData()
  if (nameDataLoad) {
    fetch(`https://narekaet.com/api/get_names?name_ids=true&sort=${route.params.sort}&name_type_id=${route.params.category}&day=${route.params.dayData}&month=${route.params.monthData}&year=${route.params.yearData}&father_name=${fatherFirstNameHook}&father_surname=${fatherSecondNameHook}&gender_id=${route.params.genderId}&is_full=1`)
    // fetch(`https://narekaet.com/api/get_names?name_ids=true&sort=${route.params.sort}&name_type_id=${route.params.category}&day=${route.params.dayData}&month=${route.params.monthData}&year=2021=${route.params.yearData}&dfather_name=${route.params.fatherFirstName}&father_surname=${route.params.fatherSecondName}&gender_id=${route.params.genderId}&is_full=1`)
    .then((response) => response.json())
    .then((json) => setData(json.names))
    .catch((error) => console.error(error))
    .finally(() => setLoading(false));
  }
}, [route.params.genderId, nameDataLoad, currentId, isFavorite, storeName]);









  const onSwiped = () => {
    getData()
    setIndex(index + 1);
    if (index == advicePer + 1) {
      setIndexOfAdvice(indexOfAdvice + 1)
    }
  };


  const onSwipredAdvice = () => {
    setIndex(index - 1)
  }




  const click = () => {
    setIsFavorite(true)
    Alert.alert(`Проверю favorite ${isFavorite}`)
  }
  




const swipeBackAnim = () => {
  getData()
  swiperRef.current.swipeBack()
}








const Colors = (props) => {

  const index = data.map(e => e.name_id).indexOf(props.id);







  if(colorExist == 1) {
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


           
             </View>
    </View>
    )

  } else {
    return null
  }
}



const cardStack = () => {
  if (index == advicePer* indexOfAdvice) {
    return 1
  } else {
    return 2
  }
}


const CardAdvice = (card , data) => {




  const Item = () => (
 


  //   <View style={{backgroundColor: '#000'}}>
  //   <SvgComponentAdvice style={styles.adviceIcon}></SvgComponentAdvice>
  //   <Text style={styles.adviceTitle}>Не выбирайте имена, следуя моде</Text>
  //   <Text style={styles.adviceText}>{item.description}</Text>
  // </View>

  <LinearGradient
  // Button Linear Gradient
  colors={['#7BCCDF', '#7FCFE2', '#6BC1D6']}
  style={styles.profileAdvice}>
  <View style={styles.profileHeaderAdvice}>
    <View style={{width: '100%', alignItems: 'center', marginTop: '30%'}}>
    <SvgComponentAdvice style={styles.adviceIcon}></SvgComponentAdvice>
    </View>

    <ScrollView style={{height: 100}}>
    <Text style={styles.adviceText}>{adviceApi[indexOfAdvice].description}</Text>
    </ScrollView>
  </View>
  </LinearGradient>

 

    
    
    
    
);






    return ( 

      <Item></Item>
    
  //     <LinearGradient
  //     // Button Linear Gradient
  //     colors={['#7BCCDF', '#7FCFE2', '#6BC1D6']}
  //     style={styles.profileAdvice}>

  //     {/* <SvgComponentAdviceBg style={styles.adviceBg}></SvgComponentAdviceBg> */}
  
  //   <View style={styles.profileHeaderAdvice}>
  //   <SvgComponentAdvice style={styles.adviceIcon}></SvgComponentAdvice>
  //   <Text style={styles.adviceTitle}>Не выбирайте имена, следуя моде</Text>
  //   <Text style={styles.adviceText}>{adviceApi}</Text>



  //   </View>
   
  
    
  
    
  
  
  
  // </LinearGradient>
  )
  }



const Card = (card , data) => {

  


  const RenderFatherName = () => {
    if (card.middle_name == undefined || card.surname == undefined) {
      return(
        <Text style={styles.profileSureName}>{' '}</Text> 
      )
    
    } else {
      return  <Text style={styles.profileSureName}>{card.name + ' ' + card.middle_name + ' ' + card.surname}</Text> 
    }
  }

  const InitialsText = () => {
    if(card.initials.length < 2) {
      return <Text style={styles.profileSureName}></Text>
    } else {
      return <Text style={styles.profileSureName}>{card.initials}</Text> 
    }
  }
  

  setCurrentId(card.name_id)

  const Favorite = () => {
    // const currentItem = route.params.description
    // const deleteIndex = arrayStore.indexOf(currentItem)
    if (isFavorite) {
      return ( 
        <View style={styles.like}>
        <SvgComponentLike color={'#fff'} ></SvgComponentLike>
      </View>
      ) 
    } else {
      return (
        <View style={styles.like}>
        <SvgComponentLike color={'#5DADC1'} secondColor={'#fff'} ></SvgComponentLike>
      </View>
      )
    }
  }
  



  // const RenderFatherName = () => {
  //   if (card.middle_name == undefined || card.surname == undefined) {
  //     return    <View style={styles.profileEpmty} >
  //     {/* <ActivityIndicator size="small" color="#5DADC1"/> */}
  //   </View>
  //   } else {
  //     return card.name + ' ' + card.middle_name + ' ' + card.surname
  //   }
  // }
 




  
const name = card.name
const id = card.name_id
singleId = id









 if (index !== advicePer * indexOfAdvice || indexOfAdvice >= adviceApi.length) {
  return ( 
    <View style={styles.profile}>


     <View style={styles.flagContainer}>
        <SvgComponentFlag style={styles.flag}>
        </SvgComponentFlag>
        </View>


        <Favorite></Favorite>



  
    <View style={styles.profileHeader}>
     <Text style={styles.profileName} >
     {card.name}
     </Text>
   


    
  
     <Colors id={id} > </Colors>
  
     <View style={styles.profileSureNameBlock}>
     
         <View style={styles.profileSureName}>
         <RenderFatherName></RenderFatherName> 
         <InitialsText></InitialsText>
         </View>

     </View>
    
  
     <View style={styles.profileTranscription}>
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
          <SvgComponentArrowRight color='#444444'></SvgComponentArrowRight>
    </TouchableOpacity>
  
    </View>
    
  
    
  
  </View>
  )

 } else if (index == advicePer * indexOfAdvice && indexOfAdvice <= adviceApi.length && route.params.advice == 1) {
   return (
    <CardAdvice></CardAdvice>
   )
 } else if (index == advicePer+1 && route.params.advice == 1) {
  swipeBackAnim()
  return (
    <View style={styles.profile}>
    
    <View style={styles.flagContainer}>
        <SvgComponentFlag style={styles.flag}>
        </SvgComponentFlag>
        </View>

        <Favorite></Favorite>
  
    <View style={styles.profileHeader}>
     <Text style={styles.profileName} >
     {card.name}
     </Text>
  
     <Colors id={id} > </Colors>
  
     <View style={styles.profileSureNameBlock}>
     
     <View style={styles.profileSureName}>
        <RenderFatherName></RenderFatherName> 
         <InitialsText></InitialsText>
     </View>
 </View>

    
  
     <View style={styles.profileTranscription}>
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
 } else {
   Alert.alert('прыг')
  return ( 
    <View style={styles.profile}>


     <View style={styles.flagContainer}>
        <SvgComponentFlag style={styles.flag}>
        </SvgComponentFlag>
        </View>


        <Favorite></Favorite>


  
    <View style={styles.profileHeader}>
     <Text style={styles.profileName} >
     {card.name}
     </Text>
  
     <Colors id={id} > </Colors>
  
     <View style={styles.profileSureName}>
        <RenderFatherName></RenderFatherName> 
         <InitialsText></InitialsText>
     </View>
    
  
     <View style={styles.profileTranscription}>
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

 


  
}




const findStartCard = () => {
  getData()
  let searchTerm = route.params.description
  let currentElem  =   data.findIndex(elem => elem.name_id == searchTerm)
  return currentElem
}




if (isLoading == false) { 


  



    return (

      <View style={{flex: 1, backgroundColor: '#fff'}}>


        
      <View style={styles.profileContainer}>

        
      <Swiper
        ref={swiperRef}
        cards={data}
        renderCard={Card}
        onSwiped={onSwiped}
        swipeBackCard={true}
        // goBackToPreviousCardOnSwipeLeft={true}
        backgroundColor="#fff"
        stackSize={cardStack()}
        stackScale={0}
        containerStyle={{zIndex: 10, elevation: 10,}}
        stackSeparation={0}
        infinite={true}
        verticalSwipe={false}
        disableLeftSwipe={true}
        cardIndex={findStartCard()}
        swipeAnimationDuration={500}
        >


<View style={styles.profile2}></View>
      <View style={styles.profile3}></View>   


        </Swiper>


      
        


      </View>
      





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
    marginTop: 0
  },
  profile: {
    flex: 1,
    backgroundColor: '#FFF7ED',
    paddingLeft: 26,
    paddingRight: 26,
    maxHeight: 480,
    borderRadius: 20,
    shadowOffset:{
    width: 0,
    height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    shadowColor: "#FF4D2D"
  },
  adviceBg: {
    position: 'absolute'
  },
  profileAdvice: {
    flex: 1,
    maxHeight: 500,
    backgroundColor: '#5DADC1',
    borderRadius: 20,
    shadowOffset:{
    width: 0,
    height: 0,
    paddingBottom: 26,
    paddingTop: 26,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center'
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
    shadowColor: "#333",
    position: 'relative'
  },
  profile2: {
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
    zIndex: 2,
    width: 320,
    position: 'absolute',
    transform: [{ rotate: "2deg" }, {translateY: 25}],
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
  like: {
    position: 'absolute',
    right: 35,
    padding: 5,
    transform: [{ translateY: -10 }],
    zIndex: 110,
  },
  flag: {
    position: 'absolute',
    right: 0,
    transform: [{ translateY: -30 }],
    zIndex: 105,
  },
  plus: {
    zIndex: 110,
    position: 'absolute',
    right: 40,
    transform: [{ translateY: 30 }, {rotate: '45deg'}],
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
    minHeight: 480,
    paddingLeft: 26,
    paddingRight: 26,
    marginRight: 25,
    marginLeft: 25,
    marginTop: 30,
    marginBottom: 70,
    borderRadius: 20,
    shadowColor: "#333",
    zIndex: 1,
    width: 320,
    position: 'absolute',
    transform: [{ rotate: "-3deg" }, {translateY: 25}],
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
    backgroundColor: '#FFF',
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
    marginBottom: 5,
    color: '#3C3C3C',
  },
  profileSureNameBlock: {
    paddingLeft: 32,
    paddingRight: 32,
    marginBottom: 28
  },
  profileHeader: {
    textAlign: 'center',
    fontFamily: 'Gilroy'
  },
  profileHeaderAdvice: {
    textAlign: 'center',
    fontFamily: 'Gilroy',
    flex: 1,
    paddingLeft: 26,
    paddingRight: 26,
    paddingTop: 26,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    alignContent: 'center',
    alignSelf: 'center'
  },
  adviceIcon: {
    marginBottom: 35
  },
  adviceTitle: {
    fontSize: 24,
    lineHeight: 33,
    marginBottom: 20,
    textAlign: 'center',
    color: '#fff',
    fontFamily: 'Gilroy'
  },
  adviceText: {
    fontSize: 14,
    lineHeight: 23,
    textAlign: 'center',
    color: '#fff',
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