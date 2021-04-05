import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Pressable, ScrollView, Button, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts } from 'expo-font';
import { FatherName } from '../fatherName/FatherName'
import { SvgComponentGirl } from '../../../assets/jsxSvg/girlIcon'
import { SvgComponentBoy } from '../../../assets/jsxSvg/boyIcon'
import { SvgComponentUnknown } from '../../../assets/jsxSvg/unknownIcon'
import { SvgComponentArrowRight } from '../../../assets/jsxSvg/arrowRightWhite'
import { Feather } from '@expo/vector-icons'; 
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons'; 




const Stack = createStackNavigator();


function GenderScreen({ navigation }) {




const sendGender = (gender) => {
  navigation.navigate('FatherName', {
    screen: 'FatherNameScreen',
    params: { 
      paramKey: gender,
    },
}) 
}



 

    return (
      <View style={styles.genderScreen}>
        <View style={styles.mainContainer}>
            <TouchableOpacity   onPress={() => sendGender(2)} style={styles.genderBtn}>
            <SvgComponentGirl style={styles.svgGenger}></SvgComponentGirl>
            <Text style={styles.genderLabel}>Девочка</Text>
            </TouchableOpacity>
            <TouchableOpacity  onPress={() => sendGender(1)} style={styles.genderBtn}>
            <SvgComponentBoy style={styles.svgGenger}></SvgComponentBoy>
            <Text style={styles.genderLabel}>Мальчик</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => sendGender('')} style={styles.genderBtnNoBorder}>
            <SvgComponentUnknown style={styles.svgGenger}></SvgComponentUnknown>
            <Text style={styles.genderLabel}>Не знаю</Text>
            </TouchableOpacity>
          </View>
  
      </View>
    );
  }





export  function Gender() {


 


    const navigation = useNavigation()
  
  
      return (
        <Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
        <Stack.Screen name="GenderScreen" component={GenderScreen}  
   options={{ title: 'Пол ребенка',  headerStyle: {
            shadowOpacity: 0,
            elevation: 0
          },
          headerTintColor: "#5DADC1",
          headerBackImage: () =>  (<SvgComponentArrowRight style={styles.navArrow} color='#000'></SvgComponentArrowRight>),
          headerBackTitle: () => null,
          headerBackTitleVisible: false,
          headerTitleStyle: {
            fontFamily: 'GilroyMedium',
            color: '#444444'
          },
          } }  />
        {/* <Stack.Screen name="FatherName" component={FatherName}  options={{ title: 'Имя отца', headerStyle: {
            shadowOpacity: 0,
            elevation: 0
          },
          headerTitleStyle: {
            fontFamily: 'Gilroy',
          },
          }  }/> */}

      <Stack.Screen name="FatherName" component={FatherName}   options={{
        headerTintColor: "#5DADC1",
    // headerBackTitleVisible: false,
    // headerBackTitle: () => null,
    // headerBackImage: () =>  (<Image source={require('../../../assets/icons/prev.png')} />),


  }} options={{headerShown: false}}   />

      </Stack.Navigator>
      );
    }
  
  
  

  
  
    
  const styles = StyleSheet.create({ 
      genderScreen: {
          backgroundColor: '#fff',
          flex: 1,
          alignItems: 'center'
      },
      mainContainer: {
          paddingHorizontal: 54,
          // paddingTop: 45,
          flex: 1,
          width: '100%',
          alignContent: 'center',
          justifyContent: 'center'
      },
      navArrow: {
        transform: [{rotate: '180deg'}],
        marginLeft: 10,
        padding: 12

      },
      svgGenger: {
          marginBottom: 20,
          alignSelf: 'center'
      },
      genderBtn: {
          marginBottom: 35,
          borderBottomColor: '#EAEAEA',
          borderBottomWidth: 1,
          width: '100%',
          flexShrink: 0.33,
      },
      genderBtnNoBorder: {
          width: '100%',
          flexShrink: 0.33,
      },
      genderLabel: {
          fontSize: 20,
          textAlign: 'center',
          marginBottom: 42,
          fontFamily: 'Gilroy'

      }
   
  })