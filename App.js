import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Pressable, Alert} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Catalog } from './src/pages/catalog/Catalog'
import { Home } from './src/pages/home/Home'
import { Collection } from './src/pages/collection/Collection'
import { Favorite } from './src/pages/favorite/Favorite'
import { Search } from './src/pages/search/Search'
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import { SvgComponent} from './assets/jsxSvg/MainPageLogo'
import * as SplashScreen from 'expo-splash-screen';
import MarqueeText from 'react-native-marquee';
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { navigationRef } from './RootNavigation';
import  { Provider } from 'react-redux'
import store from './src/store'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  SafeAreaView,
  SafeAreaProvider,
  SafeAreaInsetsContext,
  useSafeAreaInsets,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import { CustomSplashScreen  } from './src/pages/splash/SplashScreen'
import { CommonActions, StackActions } from '@react-navigation/native';









// // SplashScreen.preventAutoHideAsync()
// SplashScreen.preventAutoHideAsync()
//   .then(result => console.log(`SplashScreen.preventAutoHideAsync() succeeded: ${result}`))
//   .catch(console.warn); // it's good to explicitly catch and inspect any error


const Tab = createBottomTabNavigator();


const TAB_TO_RESET = 'Главная';
const resetHomeStackOnTabPress = ({ navigation, route }) => ({
  tabPress: (e) => {
    const state = navigation.dangerouslyGetState();

    if (state) {
      // Grab all the tabs that are NOT the one we just pressed
      const nonTargetTabs = state.routes.filter((r) => r.key !== e.target);

      nonTargetTabs.forEach((tab) => {
        // Find the tab we want to reset and grab the key of the nested stack
        const tabName = tab?.name;
        const stackKey = tab?.state?.key;

        if (stackKey && tabName === TAB_TO_RESET) {
          // Pass the stack key that we want to reset and use popToTop to reset it
          navigation.dispatch({
            ...StackActions.popToTop(),
            target: stackKey,
          });
        }
      });
    }
  },
});



export default function App({navigation}) {


  // setTimeout(async () => {
  //   await SplashScreen.hideAsync();
  // }, 0);


  // useEffect(() => {
  //   SplashScreen.hideAsync()
  // }, []);


  const [badgeApp, setBadgeApp] = useState(0)




  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('badge')
      // Alert.alert(`значение бейджа на главном экране ${value}`)
      if(value !== null) {
        setBadgeApp(value -1 + 2)
        // value previously stored
      }
    } catch(e) {
      Alert.alert(`error data`)
      setBadgeApp(0)
      // error reading value
    }
  }



  
React.useEffect(() => {
    getData()
}, [badgeApp]);
 
  



  


  const [loaded] = useFonts({
    Gilroy: require('./assets/fonts/Gilroy-Regular.ttf'),
    GilroyMedium: require('./assets/fonts/gilroy-medium.ttf'),
    Podkova: require('./assets/fonts/Podkova-Bold.ttf'),
    Bebas: require('./assets/fonts/BebasNeue-Regular.ttf'),
    Caption: require('./assets/fonts/PTSerifCaption-Italic.ttf'),
    Raleway:  require('./assets/fonts/Raleway-Bold.ttf'),
    GilroyItalic: require('./assets/fonts/Gilroy-RegularItalic.ttf')

  });
  
  if (!loaded) {
    return null;
  }

  



  return (


 <Provider store={store}>
   <SafeAreaProvider>
    <NavigationContainer ref={navigationRef}>
      <Tab.Navigator

screenOptions={({ route }) => ({
  tabBarIcon: ({ focused, color, size }) => {
    let iconName;

    if (route.name === 'Главная') {
      iconName = focused ? 'appstore-o' : 'appstore-o';
      return <AntDesign name="appstore-o" size={size} color={color} />
    } else if (route.name === 'Энциклопедия') {
      iconName = focused ? 'book-open' : 'book-open';
      return <Feather name={iconName} size={size} color={color} />;
    } else if (route.name === 'Подборка') {
      iconName = focused ? 'filter-outline' : 'filter-outline';
      return <Ionicons name={iconName} size={size} color={color} />;
    } else if (route.name === 'Избранное') {
      return <MaterialIcons name="favorite-outline" size={size} color={color} />;
    } else if (route.name === 'Поиск') {
      return <Ionicons name="search" size={size} color={color} />;
    }


  },
})}
      
      
      tabBarOptions={{
         activeTintColor:'#5DADC1',
         inactiveTintColor: '#99A2AD',
         labelStyle: {
          fontSize: 10,
          fontFamily: 'Gilroy'
         },
         showIcon: true,
          style: {
                //  paddingTop: 3,
                //  paddingBottom: 3,
                 fontSize: 10
           }}}>
        <Tab.Screen name="Главная" component={Home} listeners={resetHomeStackOnTabPress}
          options={({ }) => ({
            tabBarVisible: false })}  
          />
        <Tab.Screen name="Энциклопедия" component={Catalog} listeners={resetHomeStackOnTabPress} initialParams={{ genderId: '', }} />
        <Tab.Screen name="Подборка" component={Collection} listeners={resetHomeStackOnTabPress}  initialParams={{ genderId: '', fatherFirstName: '', fatherSecondName: ''  }} />
        <Tab.Screen name="Избранное" component={Favorite} listeners={resetHomeStackOnTabPress}    />
        <Tab.Screen name="Поиск" component={Search} listeners={resetHomeStackOnTabPress} />

      </Tab.Navigator>
    </NavigationContainer>
    
    </SafeAreaProvider>
    </Provider>


  );
}









