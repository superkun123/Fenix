import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, Switch, View, Pressable, TouchableOpacity, ScrollView, Button } from 'react-native';









export  function Filter({route}) {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);


 




// const [isLoading, setLoading] = useState(true);
// const [data, setData] = useState([]);


// useEffect(() => {
//   // fetch('http://www.s1928.konversia.net/api/get_names')
//   fetch(`http://www.s1928.konversia.net/api/get_name?name_id=${route.params.paramKey}`)
//     .then((response) => response.json())
//     .then((json) => setData(json.names))
//     .catch((error) => console.error(error))
//     .finally(() => setLoading(false));
// }, []);









    return (
      <View style={styles.filter}> 
          <View style={styles.labelfield}>
            <Text  style={styles.label}>Пол</Text>
            <Text  style={styles.labelValue}>Мужской</Text>
          </View>
          <View style={styles.labelfield}>
            <Text  style={styles.label}>Категория имен</Text>
            <Text  style={styles.labelValue}>Европейские</Text>
          </View>
          <View style={styles.labelfield}>
            <Text  style={styles.label}>Сортировка</Text>
            <Text  style={styles.labelValue}>по алфавиту</Text>
          </View>
          <View style={styles.labelfield}>
            <Text  style={styles.label}>Советы</Text>
            <Switch style={styles.switch}
        trackColor={{ false: '#767577', true: '#5DADC1' }}
        thumbColor={isEnabled ? '#fff' : '#fff'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
          </View>
          <Pressable style={styles.mainBtnContainer}>
          <LinearGradient
          // Button Linear Gradient
          colors={['#5DADC1', '#4E9DB1', '#5DADC1']}
          style={styles.buttonName}>
          <Text style={styles.textBtnName}>Показать 48 имен</Text>
        </LinearGradient>
            </Pressable>
      </View>
    );
  }






  
const styles = StyleSheet.create({ 
  filter: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 50
  },
  labelfield: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: '#F0F0F3',
    borderBottomWidth: 1,
    paddingBottom: 17,
    paddingTop: 15
  },
  label: {
    fontSize: 15,
    fontFamily: 'Gilroy'
  },
  labelValue: {
    fontSize: 15,
    fontFamily: 'Gilroy',
    color: '#979797'
  },
  switch: {
    width: 50
  },
  textBtnName: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Gilroy'
  
  },
  buttonName: {
    width: 214,
    alignItems: 'center',
    borderRadius: 14,
    paddingVertical: 19,
    marginBottom: 2
  },
  mainBtnContainer: {
    backgroundColor: '#3A7F91',
    borderRadius: 14,
    width: 214,
    marginBottom: 20,
    alignSelf: 'center',
    marginTop: '70%'
  }



})