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




const Stack = createStackNavigator();




function BirthdayScreen({ navigation }) {

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


 

    return (
      <View style={styles.genderScreen}>
        <View style={styles.mainContainer}>
        <SvgComponentCake></SvgComponentCake>
        <View>
        <Button onPress={showDatepicker} title="Show date picker!" />
      </View>
      <View>
        <Button onPress={showTimepicker} title="Show time picker!" />
      </View>
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
      </View>
    );
  }





export function Birthday() {


   


    const navigation = useNavigation()
  
  
      return (
        //   <View>
        //       <Text>123321</Text>
        //   </View>
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
        paddingTop: 70,
        paddingHorizontal: 24,
      },


  })