import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, {useEffect} from 'react';
import { StyleSheet, Text, View, Pressable} from 'react-native';
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











const Tab = createBottomTabNavigator();

export default function App() {
  const [loaded] = useFonts({
    Gilroy: require('./assets/fonts/Gilroy-Regular.ttf'),
    GilroyMedium: require('./assets/fonts/gilroy-medium.ttf'),
    Podkova: require('./assets/fonts/Podkova-Bold.ttf'),
    Bebas: require('./assets/fonts/BebasNeue-Regular.ttf'),
    Caption: require('./assets/fonts/PTSerifCaption-Italic.ttf'),
    Raleway:  require('./assets/fonts/Raleway-Bold.ttf'),

  });
  
  if (!loaded) {
    return null;
  }

  



  return (


 <Provider store={store}>
    <NavigationContainer ref={navigationRef}>
      <Tab.Navigator

screenOptions={({ route }) => ({
  tabBarIcon: ({ focused, color, size }) => {
    let iconName;

    if (route.name === 'Главная') {
      iconName = focused ? 'appstore-o' : 'appstore-o';
      return <AntDesign name="appstore-o" size={size} color={color} />
    } else if (route.name === 'Каталог') {
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
                 paddingTop: 3,
                 paddingBottom: 3,
                 fontSize: 10
           }}}>
        <Tab.Screen name="Главная" component={Home} 
          options={({ }) => ({
            tabBarVisible: false })}  
          />
        <Tab.Screen name="Каталог" component={Catalog} />
        <Tab.Screen name="Подборка" component={Collection} />
        <Tab.Screen name="Избранное" component={Favorite}  />
        <Tab.Screen name="Поиск" component={Search} />

      </Tab.Navigator>
    </NavigationContainer>
    </Provider>


  );
}









