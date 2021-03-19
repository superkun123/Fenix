import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { StyleSheet, TextInput, Text, View, TouchableOpacity, ScrollView, Button, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts } from 'expo-font';
import { SvgComponentFather } from '../../../assets/jsxSvg/fatherIcon'
import { SvgComponentCake } from '../../../assets/jsxSvg/cake'
import { LinearGradient } from 'expo-linear-gradient';
import Svg from 'react-native-svg';
import DateTimePicker from '@react-native-community/datetimepicker';
import { SvgComponentArrowRight } from '../../../assets/jsxSvg/arrowRightWhite'
import { TabActions } from '@react-navigation/native';





const Stack = createStackNavigator();




function BirthdayScreen({ navigation, route }) {

    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
  
    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setShow(Platform.OS === 'ios');
      setDate(currentDate);
    };
  
    const showMode = (currentMode) => {
      setShow(true);
      setMode(currentMode);
    };
  
    const showDatepicker = () => {
      showMode('date');
    };
  
    const showTimepicker = () => {
      showMode('time');
    };


    let genderType = route.params.genderId
    let fatherName = route.params.fatherFirstName
    let surName = route.params.fatherSecondName


    const jumpToAction = TabActions.jumpTo('Подборка', {
      screen: 'CollectionScreen',
      params: { 
        genderId: route.params.genderId,
        fatherFirstName: route.params.fatherFirstName,
        fatherSecondName: route.params.fatherSecondName
      },
    });

    const sendData = () => {
      navigation.dispatch(jumpToAction) 
    }



    
   

    return (
      <View style={styles.genderScreen}>
        <View style={styles.mainContainer}>
        <SvgComponentCake style={styles.cake}></SvgComponentCake>
        <Text>{route.params.genderId}</Text>
        <Text>{route.params.fatherFirstName}</Text>
        <Text>{route.params.fatherSecondName}</Text>
        <View style={{flexDirection: 'row'}}>
        <View>
        <Pressable style={styles.dateBtn} onPress={showDatepicker} title="Введите дату">
          <Text style={{fontFamily: 'GilroyMedium', fontSize: 16}}>Введите дату</Text>
        </Pressable>
      </View>
      <View>
        <Pressable style={styles.dateBtn} onPress={showTimepicker} title="Введите время">
          <Text style={{fontFamily: 'GilroyMedium', fontSize: 16}}>Введте время</Text>
          </Pressable>
      </View>
        </View>
        <View>
        {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
        </View>
      <View>
        <Text style={styles.BirthdayText}>
        Укажите день рождения малыша, это позволит определить знак зодиака, значение по китайскому календарю, дни рождения известных людей, исторические события.
        </Text>
      </View>
      <Pressable style={styles.mainBtnContainer}
            onPress={() => navigation.dispatch(jumpToAction)}>
            <LinearGradient
          // Button Linear Gradient
          colors={['#5DADC1', '#4E9DB1', '#5DADC1']}
          style={styles.buttonName}>
          <Text style={styles.textBtnName}>Далее</Text>
          <SvgComponentArrowRight style={[styles.box, {
            transform: [{ translateX: 50 }]
          }]}></SvgComponentArrowRight>
        </LinearGradient>
    </Pressable>
    <Pressable  onPress={() => navigation.dispatch(jumpToAction)} style={styles.hollowBtn}>
            <Text style={styles.hollowBtnText}>Пропустить</Text>
          </Pressable>

        </View>      
      </View>
    );
  }





export function Birthday() {


   


    const navigation = useNavigation()
  
  
      return (

        <Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
        <Stack.Screen name="BirthdayScreen" component={BirthdayScreen} options={{headerShown: false}} />

      </Stack.Navigator>
      );
    }
  
  
  
  
  
  
    
  const styles = StyleSheet.create({ 
      genderScreen: {
          backgroundColor: '#fff',
          flex: 1
      },
      mainContainer: {
        marginHorizontal: 16,
        marginTop: 30,
        flex: 1,
        alignItems: 'center',
        paddingTop: 30,
        paddingHorizontal: 20,
        shadowOpacity: 0.3
      },
      cake: {
        marginBottom: 37
      },
      BirthdayText: {
        textAlign: 'center',
        fontSize: 12,
        marginBottom: 20,
        fontFamily: 'Gilroy',
        lineHeight: 20,
        shadowOpacity: 0
      },
      dateBtn: {
        fontSize: 16,
        fontFamily: 'GilroyMedium',
        padding: 10,
        shadowOpacity: 0
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