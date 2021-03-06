import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TouchableHighlight, Pressable, ScrollView, ActivityIndicator, FlatList, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ProfileMini } from '../profile/ProfileMini'
import { ProfileScreen } from '../profile/ProfileScreen'
import { useFonts } from 'expo-font';
import { Filter } from '../filter/Filter'
import filter from 'lodash.filter';
import { SvgComponentArrowRight } from '../../../assets/jsxSvg/arrowRightWhite'
import { Birthday } from '../birthday/Birthday';
import { SvgComponentAdvice } from '../../../assets/jsxSvg/advice';
import { SvgComponentLike } from '../../../assets/jsxSvg/like'






const Stack = createStackNavigator();







function CollectionScreen({ navigation, route }) {





  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [query, setQuery] = useState('');
  const [fullData, setFullData] = useState([]);
  const [fatherFirstNameHook, setFirstNameHook] = useState('')
  const [fatherSecondNameHook, setSecondNameHook] = useState('')
  const [birthDayHook, setBirthDayHook] = useState('')
  const [birthMonthHook, setBirthMonthyHook] = useState('')
  const [birthYearHook, setBirthYearHook] = useState('')



  const getData = async () => {
    try {
      const fatherFirstNameStore = await AsyncStorage.getItem('fatherFirstName')
      const fatherSecondNameStore = await AsyncStorage.getItem('fatherSecondName')
      const birthDay = await AsyncStorage.getItem('day')
      const birthMonth = await AsyncStorage.getItem('month')
      const birthYear = await AsyncStorage.getItem('year')
      if(fatherFirstNameStore !== null) {
        setFirstNameHook(fatherFirstNameStore)
        setSecondNameHook(fatherSecondNameStore)
      }
      if (birthDay !== null) {
        setBirthDayHook(birthDay)
        setBirthMonthyHook(birthMonth)
        setBirthYearHook(birthYear)
      }
    } catch(e) {
      // error reading value
    }
  }
  
  
  getData()
 


const firstname = () => {
  if (fatherFirstNameHook !== '') {
    return fatherFirstNameHook
  } else {
    route.params.fatherFirstName
  }
}


const secondname = () => {
  if (fatherSecondNameHook !== '') {
    return fatherSecondNameHook
  } else {
    route.params.fatherSecondName
  }
}

const day = () => {
  if (birthDayHook !== '') {
    return birthDayHook
  } else {
    route.params.dayData
  }
}


const month = () => {
  if (birthMonthHook !== '') {
    return birthMonthHook
  } else {
    route.params.dayMonth
  }
}


const year = () => {
  if (birthYearHook !== '') {
    return birthYearHook
  } else {
    route.params.dayYear
  }
}


  // useEffect(() => {
  //   // fetch(`http://www.s1928.konversia.net/api/get_names?name_ids=true&sort=asc&day=${route.params.dayData}&month=${route.params.monthData}&year=${route.params.yearData}&dfather_name=${route.params.fatherFirstName}&father_surname=${route.params.fatherSecondName}&gender_id=${route.params.genderId}&is_full=1`)
  //   fetch(`http://www.s1928.konversia.net/api/get_names?name_ids=true&sort=asc&dfather_name=${route.params.fatherFirstName}&father_surname=${route.params.fatherSecondName}&gender_id=${route.params.genderId}&is_full=1`)
  //     .then((response) => response.json())
  //     .then((json) => setData(json.names))
  //     .catch((error) => console.error(error))
  //     .finally(() => setLoading(false));
  // }, [route.params.genderId, 
  //   route.params.fatherFirstName, 
  //   route.params.fatherSecondName, 
  //   route.params.dayData, 
  //   route.params.monthData, 
  //   route.params.yearData]);


// ???? ???????????? ?????????????? ?? ???????????????? ???????? ????????????????
  

  useEffect(() => {
    getData()
    setLoading(true);
  
    // fetch('http://www.s1928.konversia.net/api/get_names?name_ids=true?sort=asc')
    fetch(`https://narekaet.com/api/get_names?name_ids=true&sort=${route.params.sort}&name_type_id=${route.params.category}&day=${route.params.dayData}&month=${route.params.monthData}&year=${route.params.yearData}&dfather_name=${route.params.fatherFirstName}&father_surname=${route.params.fatherSecondName}&gender_id=${route.params.genderId}`)
    // fetch(`https://narekaet.com/api/get_names?name_ids=true&sort=${route.params.sort}&name_type_id=${route.params.category}&day=${birthDayHook}&month=${birthMonthHook}&year=2021=${birthYearHook}&dfather_name=${fatherFirstNameHook}&father_surname=${fatherSecondNameHook}&gender_id=${route.params.genderId}`)
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
  }, [route.params.genderId, route.params.sort, route.params.genderId, route.params.category,
    route.params.fatherFirstName, 
    route.params.fatherSecondName, 
    route.params.dayData, 
    route.params.monthData, 
    route.params.yearData]);

  // const userName = ' '

  const handleSearch = text => {
    const formattedQuery = text;
    const filteredData = filter(fullData, user => {
      return contains(user, formattedQuery);
    });
    if (filteredData !== false) {
      setData(filteredData);
      setQuery(text);
    } else {
      Alert.alert('??????')
      setData(data)
    }
  };
  
  const contains = ({name}, query) => {
    if( query == '??????') {
      return true
    } else if (name.startsWith(query)) {
      return true;
    } else {
      false
    }  
   
  };
  



  const Item = ({ item, index, onPress, style }) => (
 

<Pressable
   style={({pressed}) => [
    {
      elevation: pressed ? 5 : 0,
      shadowRadius: pressed ? 2.22 : 0,
      zIndex: pressed ? 110 : 1,
      shadowOffset: {
        width: 0,
        height: pressed ? 2: 0,
       },
       shadowOpacity: 0.25,
    },
    styles.nameBtn,
  ]}
children={({ pressed }) => (
  <View style={{ color: pressed ? '#222' : '#222', flexDirection: 'row', alignContent: 'center', alignItems: 'center', justifyContent: 'center',  width: '100%', position: 'relative', textAlign: 'center'}}>
    <Text style={{textAlign: 'center'}}>
    {item.name}
    </Text>
    <SvgComponentLike color={'#FFF7ED'} secondColor={'#5DADC1'} style={styles.like} ></SvgComponentLike>
  </View>)}
onPress={() => navigation.navigate('ProfileMini', {
  // paramKey: userName,
  // paramKey: item.name,
  description: item.name_id,
  genderId: route.params.genderId,
  indexElem: index,
  sort: route.params.sort,
  category: route.params.category,
  dayData: route.params.dayData,
  monthData: route.params.monthData,
  yearData: route.params.yearData,
  advice: route.params.advice
} )}
>



{/* <Text style={styles.namebtnText}>{item.name}</Text> */}
</Pressable>




  );


  const ItemAlpha = ({ item, onPress, style }) => (

    <Pressable
    style={({pressed}) => [
      {
        backgroundColor: pressed ? '#5DADC1' : '#FAFAFA',
      },
      styles.alphaword
      
    ]}
  children={({ pressed }) => (
    <Text style={{ color: pressed ? '#FFF' : '#979797'}}>
      {item.title}
    </Text>)}
    onPress={() => handleSearch(item.title)}
    >
    </Pressable>

  )

  const renderItem = ({ item, index }) => {

  


    return (
      <Item
        index = {index}
        key={item.id}
        item={item}
        onPress={() => setSelectedId(item.id)}
      />
    );
  };


  const renderItemAlpha = ({ item }) => {


    return (
      <ItemAlpha
        key={item.id}
        item={item}
        onPress={() => setSelectedId(item.id)}
      />
    );
  };



  let alphabet = [
    {
      id: -1,
      title: '??????'
    },
    {
      id: 0,
      title: '??'
    },
    {
      id: 1,
      title: '??'
    },
    {
      id: 2,
      title: '??'
    },
    {
      id: 3,
      title: '??'
    },
    {
      id: 4,
      title: '??'
    },
    {
      id: 5,
      title: '??'
    },
    {
      id: 6,
      title: '??'
    },
    {
      id: 7,
      title: '??'
    },
    {
      id: 8,
      title: '??'
    },
    {
      id: 9,
      title: '??'
    },
    {
      id: 10,
      title: '??'
    },
    {
      id: 11,
      title: '??'
    },
    {
      id: 12,
      title: '??'
    },
    {
      id: 13,
      title: '??'
    },
    {
      id: 14,
      title: '??'
    },
    {
      id: 15,
      title: '??'
    },
    {
      id: 16,
      title: '??'
    },
    {
      id: 17,
      title: '??'
    },
    {
      id: 18,
      title: '??'
    },
    {
      id: 19,
      title: '??'
    },
    {
      id: 20,
      title: '??'
    },
    {
      id: 21,
      title: '??'
    },
    {
      id: 22,
      title: '??'
    },
    {
      id: 23,
      title: '??'
    },
    {
      id: 24,
      title: '??'
    },
    {
      id: 25,
      title: '??'
    },
    {
      id: 26,
      title: '??'
    },
    {
      id: 27,
      title: '??'
    },
    {
      id: 28,
      title: '??'
    },
    {
      id: 29,
      title: '??'
    },
    {
      id: 30,
      title: '??'
    },
    {
      id: 31,
      title: '??'
    },
    {
      id: 32,
      title: '??'
    }

  ]


  const FlatListRender =  () => {
    if (isLoading == false) {
      return (
        <View style={styles.namesContainer}>
        <FlatList
        contentContainerStyle={{ paddingBottom: 20,  shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62, 
        elevation: 5 }}
        data={data}
        renderItem={renderItem}
        key={renderItem.item}
        keyExtractor={(item) => item.id}
        style={styles.FlatListCatalog}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
        </View>
      )
    } else {
      return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', marginRight: 20, marginTop: -30}}>
          <ActivityIndicator style={{marginTop: -30}} size="large" color="#5DADC1"/>
        </View>
      )
    }
  }

 
  return (
  
    <View style={styles.catalog}>

<View style={styles.header}>
      <Text  style={styles.title}>????????????????</Text>
      <Text  style={styles.subtitle}>{data.length} ??????????</Text>
      <Pressable  onPress={() => navigation.navigate('Filter', {namesValue: data.length, parentPage: 'CollectionScreen'})}  style={styles.settings}>
      <Ionicons name="ios-settings-outline" size={24} color="black" />
      </Pressable>
</View>



<View style={styles.content}>
<View style={styles.alphabet2}>
      <FlatList
        data={alphabet}
        renderItem={renderItemAlpha}
        key={renderItemAlpha.item}
        keyExtractor={(item) => item.id}
        style={styles.FlatListAlphabet}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
</View>


<FlatListRender></FlatListRender>


</View>
</View>

   
  
  );
}




export function Collection(route) {
  


  const navigation = useNavigation()
 
  return (
      <Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
        <Stack.Screen options={{headerShown: false}} name="CollectionScreen" component={CollectionScreen} initialParams={{ genderId: '', sort: '', fatherFirstName: '', fatherSecondName: '', category: '', dayData: '', monthData: '', yearData: ''   }} />
        <Stack.Screen name="ProfileMini" component={ProfileMini} initialParams={{advice: 0}} options={{ title: '??????????????????', headerTitleStyle: {
            fontFamily: 'GilroyMedium',
            shadowOpacity: 0,
            elevation: 0,

          },
          headerBackImage: () =>  (<SvgComponentArrowRight style={styles.navArrow} color='#000'></SvgComponentArrowRight>),
          headerBackTitle: () => null,
          headerBackTitleVisible: false,
          headerStyle: {
            shadowOpacity: 0,
            elevation: 0
          },
          } } />

<Stack.Screen name="ProfileScreen" component={ProfileScreen}  options={{ title: '??????????????????', headerTitleStyle: {
            fontFamily: 'GilroyMedium',
          },
          headerStyle: {
            shadowOpacity: 0,
            elevation: 0
        },
          headerBackImage: () =>  (<SvgComponentArrowRight style={styles.navArrow} color='#000'></SvgComponentArrowRight>),
          headerBackTitle: () => null,
          headerBackTitleVisible: false,
          } } />
            

           <Stack.Screen name="Filter" component={Filter}  options={{ title: '????????????', headerTitleStyle: {
            fontFamily: 'GilroyMedium',
            shadowOpacity: 0,
            elevation: 0,
          },
          headerBackImage: () =>  (<SvgComponentArrowRight style={styles.navArrow} color='#000'></SvgComponentArrowRight>),
          headerBackTitle: () => null,
          headerBackTitleVisible: false,
          } } />
      </Stack.Navigator>
  );
}












const styles = StyleSheet.create({

  title: {
    marginTop: 0,
    color: "#292929",
    marginBottom: 10,
    textAlign: "center",
    fontSize: 24,
    lineHeight: 33,
    fontFamily: 'GilroyMedium'
  },
  navArrow: {
    transform: [{rotate: '180deg'}],
    marginLeft: 10,
    padding: 12

  },
  content: {
    flex: 1,
    width: '100%',
    backgroundColor: '#FAFAFA',
    flexDirection: 'row'
  },
  alphabet2: {
    flex: 0.1,
    marginRight: 0,
    zIndex: 10,
    maxWidth: 30,
    marginLeft: 10,
    marginRight: -5,
    color: '#fff'
  },

  namesContainer: {
    flex: 1,
    marginLeft: -30,
  },
  header: {
    backgroundColor: '#FAFAFA',
    marginTop: 40,
  },
  nameBtn: {
    fontFamily: 'Gilroy',
    color: '#5DADC1',
    backgroundColor: '#FFF7ED',
    paddingTop: 19,
    paddingBottom: 18,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: '#F5EDE4',
    marginRight: 10,
    marginLeft: 10,
    marginBottom: 0.5,
    position: 'relative'
  },
  like: {
    position: 'absolute',
    right: 20
  },
  nameBtnContainer: {
    flex: 1,
    justifyContent: "center",
    // marginLeft: -30
  },
  namebtnText: {
    fontFamily: 'Gilroy',
    justifyContent: "center",
    fontSize: 16
  },
  subtitle: {
    fontFamily: 'Gilroy',
    fontSize: 14,
    marginBottom: 10,
    color: "#292929",
    textAlign: "center",
    marginBottom: 10,
    lineHeight: 25
  },
  settings: {
    flex: 0.3,
    marginTop: 5,
    alignItems: "flex-end",
    position: 'absolute',
    right: 16
  },
  catalog: {
    // flex: 1,
    height: '100%',
    backgroundColor: "#FAFAFA",
  },
  alphabet: {
    // flex: 0.1,
    color: "#292929",
    marginTop: 114,
    left: 13,
    zIndex: 10
  },
  alphaword: {
    marginBottom: 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    paddingVertical: 2.5
  },
  FlatListCatalog: {
    marginLeft: 50,
    marginRight: 50,
    flex: 1,
    paddingTop: 10,
    shadowColor: "#FFF7ED",
    shadowOffset: {
	   width: 0,
	   height: 5,
    },
   shadowOpacity: 0.34,
   shadowRadius: 6.27,
   elevation: 10,
  },
  FlatListAlphabet: {
    backgroundColor: '#FAFAFA',
    paddingHorizontal: 2.5
  }

  });


