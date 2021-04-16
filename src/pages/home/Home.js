import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import { StyleSheet, Text, View, Pressable, Alert} from 'react-native';
import { SvgComponent} from '../../../assets/jsxSvg/MainPageLogo'
import MarqueeText from 'react-native-marquee';
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Gender } from '../gender/Gender'
import { Catalog } from '../catalog/Catalog'
import TextTicker from 'react-native-text-ticker'
import * as RootNavigation from '../../../RootNavigation';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useLinkTo } from '@react-navigation/native';
import { TabActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";






const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();









function HomeScreen({ navigation }) {
  const linkTo = useLinkTo();
  const jumpToAction = TabActions.jumpTo('Энциклопедия', { user: 'Satya' });



  const storeData = async (value) => {
    const jsonValue = await AsyncStorage.getItem('favorite')
    if(jsonValue == null) {
      try {
        AsyncStorage.setItem('favorite', '[0, 1]')
      } catch (e) {
        // saving error
      }
    }

  }




  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      
  storeData()
    });
  
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);
  


 

    return (
      <View style={styles.mainScreen}>
        <View style={styles.mainScreenHeader}>
        <View style={styles.mainContainer}>
        <SvgComponent  style={styles.tinyLogo}></SvgComponent>
        </View>
        <TextTicker
          style={{ fontSize: 36 }}
          style={styles.marquee}
          duration={10000}
          loop
          bounce={false}
          scroll={true}
          scrollSpeed={10000}
          repeatSpacer={0}
          marqueeDelay={0}
        >
            <Text> <Text style={{fontFamily: 'Podkova', color: '#5B8F9C'}}>Миша</Text> <Text style={{fontFamily: 'Bebas', color: '#C2D2C5', textTransform: 'uppercase'}}>Егор</Text> <Text style={{fontFamily: 'Caption', color: '#E1AFA4'}}>Нина</Text> <Text style={{fontFamily: 'Raleway', color: '#242E51'}}>Андрей</Text> 
            </Text>
          
        </TextTicker>
        </View>
        {/* <MarqueeText
            style={styles.marquee}
            duration={4000}
            marqueeOnStart
            loop={true}
            marqueeDelay={0}
            marqueeResetDelay={0}
          >
            <Text>Миша Егор Нина Андрей</Text>
          </MarqueeText> */}
  
  
          <View style={styles.mainContainer}>
          <View style={styles.mainFooter}> 
            <Pressable style={styles.mainBtnContainer}
            onPress={() => navigation.navigate('Gender')}>
            <LinearGradient
          // Button Linear Gradient
          colors={['#5DADC1', '#4E9DB1', '#5DADC1']}
          style={styles.buttonName}>
          <Text style={styles.textBtnName}>Выбрать имя ребенку</Text>
        </LinearGradient>
            </Pressable>
          <Pressable  onPress={() => navigation.dispatch(jumpToAction)} style={styles.hollowBtn}>
            <Text style={styles.hollowBtnText}>Энциклопедия имен</Text>
          </Pressable>
          </View>
          </View>
  
      </View>
    );
  }






  export function Home() {
   


 


  
  

    const navigation = useNavigation()

    return (
      <Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
        <Stack.Screen options={{headerShown: false}} name="HomeScreen" component={HomeScreen} />
        {/* <Stack.Screen options={{headerShown: false}} name="Catalog" component={Catalog} />   */}
        <Stack.Screen name="Gender" component={Gender} options={{headerShown: false }} />        
      </Stack.Navigator>
    );


  }






  const styles = StyleSheet.create({
    tinyLogo: {
      marginTop: 80,
      marginBottom: 40
    },
    mainScreen: {
      backgroundColor: '#fff',
      flex: 1,
      width: '100%'
    },
    mainScreenHeader: {
      flexShrink: 0.35
    },
    mainFooter: {
      flexShrink: 0.65,
      width: '100%'
    },
    mainContainer: {
      marginHorizontal: 28,
      alignItems: 'center'
    },
    marquee: {
      marginBottom: 60,
      fontSize: 36
    },
    nameBtn: {
      width: '100%',
      alignItems: 'center',
    },
    textBtnName: {
      color: '#fff',
      fontSize: 16,
      fontFamily: 'Gilroy'
    
    },
    buttonName: {
      width: '100%',
      alignItems: 'center',
      borderRadius: 14,
      paddingVertical: 19,
      marginBottom: 2
    },
    mainBtnContainer: {
      backgroundColor: '#3A7F91',
      borderRadius: 14,
      width: '100%',
      marginBottom: 20
    },
    hollowBtn: {
      width: '100%',
      alignItems: 'center',
      borderRadius: 14,
      paddingVertical: 19,
      borderColor: '#5DADC1',
      borderWidth: 1
    },
    hollowBtnText: {
      color: '#5DADC1',
      fontSize: 16,
      fontFamily: 'Gilroy'
      
    }
    
  
  })
  
  
  
  