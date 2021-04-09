import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, TextInput, Text, View, TouchableOpacity, ScrollView, Button, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts } from 'expo-font';
import { SvgComponentFather } from '../../../assets/jsxSvg/fatherIcon'
import { SvgComponentArrowRight } from '../../../assets/jsxSvg/arrowRightWhite'
import { LinearGradient } from 'expo-linear-gradient';
import Svg from 'react-native-svg';
import { Birthday } from '../birthday/Birthday';
import AsyncStorage from '@react-native-async-storage/async-storage';





const Stack = createStackNavigator();




function FatherNameScreen({route, navigation}) {

  const [value, onChangeTextName] = React.useState('');
  const [valuetext, onChangeText] = React.useState('');


let father_name



const setFatherName = () => {
  father_name = value
}

const setFatherSurename = () => {
  father_surename = valuetext
}


let gender = route.params.paramKey



const sendData = (gender, firstname, secondName) => {
  navigation.navigate('Birthday', {
    screen: 'BirthdayScreen',
    params: { 
      genderId: gender,
      fatherFirstName: firstname,
      fatherSecondName: secondName
    },
})
storeData(firstname, secondName) 
}


const storeData = async (value1, value2) => {
  try {
    await AsyncStorage.setItem('fatherFirstName', value1)
    await AsyncStorage.setItem('fatherSecondName', value2)
  } catch (e) {
    // saving error
  }
}


 

    return (
      <View style={styles.genderScreen}>
        <View style={styles.mainContainer}>
          <SvgComponentFather style={styles.fatherIcon}></SvgComponentFather>
          {/* <Text>{gender}</Text> */}
          <TextInput
      style={styles.input}
      placeholder="Введите имя отца"
      onChangeText={text => onChangeTextName(text)}
      value={value}
    />
        <TextInput
      style={styles.input}
      placeholder="Введите фамилию отца"
      onChangeText={text => onChangeText(text)}
      value={valuetext}
    />
     <Pressable style={styles.mainBtnContainer}
            onPress={() => sendData(gender, value, valuetext)}>
            <LinearGradient
          // Button Linear Gradient
          colors={['#5DADC1', '#4E9DB1', '#5DADC1']}
          style={styles.buttonName}>
          <Text style={styles.textBtnName}>Далее</Text>
          <SvgComponentArrowRight color='#fff' style={[styles.box, {
            transform: [{ translateX: 50 }]
          }]}></SvgComponentArrowRight>
        </LinearGradient>
    </Pressable>
    <Pressable  onPress={() =>  sendData(gender, value, valuetext)} style={styles.hollowBtn}>
            <Text style={styles.hollowBtnText}>Пропустить</Text>
          </Pressable>
          </View>
      </View>
    );
  }





export function FatherName() {


   


    const navigation = useNavigation()
  
  
      return (
          // <View>
          //     <Text>123321</Text>
          // </View>
        <Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
        <Stack.Screen name="FatherNameScreen" component={FatherNameScreen} options={{ title: 'Имя отца', headerStyle: {
            shadowOpacity: 0,
            elevation: 0
          },
          headerBackImage: () =>  (<SvgComponentArrowRight style={styles.navArrow} color='#000'></SvgComponentArrowRight>),
          headerBackTitle: () => null,
          headerBackTitleVisible: false,
          headerTitleStyle: {
            fontFamily: 'GilroyMedium',
            color: '#444444'
          },
          headerTitleStyle: {
            fontFamily: 'GilroyMedium',
          },
          } }  />
        <Stack.Screen name="Birthday" component={Birthday} options={{ title: 'День рождения', headerStyle: {
            shadowOpacity: 0,
            elevation: 0
          },
          headerBackImage: () =>  (<SvgComponentArrowRight style={styles.navArrow} color='#000'></SvgComponentArrowRight>),
          headerBackTitle: () => null,
          headerBackTitleVisible: false,
          headerTitleStyle: {
            fontFamily: 'GilroyMedium',
            color: '#444444'
          },
          } } />
      </Stack.Navigator>
      );
    }
  
  
  
  
  
  
    
  const styles = StyleSheet.create({ 
      genderScreen: {
          backgroundColor: '#fff',
          flex: 1
      },
      navArrow: {
        transform: [{rotate: '180deg'}],
        marginLeft: 10,
        padding: 12
      },
      mainContainer: {
        marginHorizontal: 16,
        marginTop: 30,
        flex: 1,
        alignItems: 'center',
        paddingTop: 70,
        paddingHorizontal: 24,
      },

      fatherIcon: {
        marginBottom: 60
      },
      
      input: {
        width: '100%',
        backgroundColor: '#eeeeee',
        padding: 20,
        fontSize: 16,
        fontFamily: 'Gilroy',
        borderRadius: 14,
        marginBottom: 15,
        color: '#292929',
        opacity: 0.5
      },
      textBtnName: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'Gilroy',
      
      },
      buttonName: {
        width: '100%',
        alignItems: 'center',
        borderRadius: 14,
        paddingVertical: 19,
        marginBottom: 2,
        flexDirection: 'row',
        justifyContent: 'center'
      },
      mainBtnContainer: {
        backgroundColor: '#3A7F91',
        borderRadius: 14,
        width: '100%',
        marginBottom: 15,
        marginTop: 5
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