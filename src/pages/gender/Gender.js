import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Pressable, ScrollView, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts } from 'expo-font';
import { FatherName } from '../fatherName/FatherName'
import { SvgComponentGirl } from '../../../assets/jsxSvg/girlIcon'
import { SvgComponentBoy } from '../../../assets/jsxSvg/boyIcon'
import { SvgComponentUnknown } from '../../../assets/jsxSvg/unknownIcon'



const Stack = createStackNavigator();




function GenderScreen({ navigation }) {
 

    return (
      <View style={styles.genderScreen}>
        <View style={styles.mainContainer}>
            <Pressable  onPress={() => navigation.navigate('FatherName')} style={styles.genderBtn}>
            <SvgComponentGirl style={styles.svgGenger}></SvgComponentGirl>
            <Text style={styles.genderLabel}>Девочка</Text>
            </Pressable>
            <Pressable  onPress={() => navigation.navigate('FatherName')} style={styles.genderBtn}>
            <SvgComponentBoy style={styles.svgGenger}></SvgComponentBoy>
            <Text style={styles.genderLabel}>Мальчик</Text>
            </Pressable>
            <Pressable  onPress={() => navigation.navigate('FatherName')} style={styles.genderBtn}>
            <SvgComponentUnknown style={styles.svgGenger}></SvgComponentUnknown>
            <Text style={styles.genderLabel}>Не знаю</Text>
            </Pressable>
          </View>
  
      </View>
    );
  }





export  function Gender() {


 


    const navigation = useNavigation()
  
  
      return (
        <Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
        <Stack.Screen name="GenderScreen" component={GenderScreen} options={{ title: 'Пол ребенка', headerStyle: {
            shadowOpacity: 0,
            elevation: 0
          },
          headerTitleStyle: {
            fontFamily: 'GilroyMedium',
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

      <Stack.Screen name="FatherName" component={FatherName} options={{headerShown: false}}   />

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
          paddingTop: 45,
          flex: 1,
          width: '100%',
          alignContent: 'center'
      },
      svgGenger: {
          marginBottom: 20,
          alignSelf: 'center'
      },
      genderBtn: {
          marginBottom: 35,
          borderBottomColor: '#EAEAEA',
          borderBottomWidth: 1,
          width: '100%'
      },
      genderLabel: {
          fontSize: 20,
          textAlign: 'center',
          marginBottom: 42,
          fontFamily: 'Gilroy'

      }
   
  })