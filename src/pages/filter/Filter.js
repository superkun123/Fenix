import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, Switch, View, Pressable, TouchableOpacity, ScrollView, Button } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { FatherName } from '../fatherName/FatherName';
import AsyncStorage from '@react-native-async-storage/async-storage';









export  function Filter({route, navigation}) {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [selectedmale, setSelectedmale] = useState();
  const [selectedCategory, setSelectedCategory] = useState();
  const [selectedSort, setSelectedSort] = useState();
  const [fatherFirstNameHook, setFirstNameHook] = useState('')
  const [fatherSecondNameHook, setSecondNameHook] = useState('')


 

const sortType = () => {
  if (selectedSort == 'По алфавиту') {
    return 'asc'

  } else if (selectedSort == 'В обраном порядке') {
    return 'desc'
  }
}


const maleType = () => {

  if (selectedmale == 'Мужской') {
    
    return 1

  } else if (selectedmale == 'Женский') {
    return 2
  } else {
    return 1
  }
}


const categoryType = () => {

  if (selectedCategory == 'Русское') {
    return 3

  } else if (selectedCategory == 'Европейское') {
    return 1

  } else if (selectedCategory == 'Азиатское') {
    return 2
  }
}


const getData = async () => {
  try {
    const fatherFirstNameStore = await AsyncStorage.getItem('fatherFirstName')
    const fatherSecondNameStore = await AsyncStorage.getItem('fatherSecondName')
    if(fatherFirstNameStore !== null) {
      setFirstNameHook(fatherFirstNameStore)
      setSecondNameHook(fatherSecondNameStore)
    }
  } catch(e) {
    // error reading value
  }
}


getData()


const FatherNameField = () => {
  if (fatherFirstNameHook !== '' && fatherSecondNameHook !== '' ) {
    return  (
      <View style={styles.labelfieldStatic}>

<View style={{
flex: 1,
}}>
<Text  style={styles.label}>Имя отца</Text>
</View>



<View style={{
flex: 0.6,
}}>

<Text  style={{fontFamily:'Gilroy', fontSize: 15}}>{fatherFirstNameHook} {fatherSecondNameHook}</Text>

</View>

</View>

    )
  } else {
   return (
    <View></View>
   ) 
  }
}


const parentPage = route.params.parentPage



const male = maleType()
const sort = sortType()
const category = categoryType()


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
      <ScrollView style={styles.filter}> 
          <View style={styles.labelfield}>

          <View style={{
    flex: 1,
  }}>
    <Text  style={styles.label}>Пол</Text>
    </View>


  
  <View style={{
    flex: 0.67,
  }}>

<Picker
  selectedValue={selectedmale}
  style={styles.picker}
  itemStyle={{height: 70}}
  onValueChange={(itemValue, itemIndex) =>
    setSelectedmale(itemValue)
  }>

<Picker.Item label="Мужской" value="Мужской" />
<Picker.Item style={{fontFamily:'Gilroy', fontSize: 15}} label="Женский" value="Женский" />
</Picker>

  </View>

  </View>


  <View style={styles.labelfield}>

<View style={{
flex: 1,
}}>
<Text  style={styles.label}>Категория имен</Text>
</View>



<View style={{
flex: 0.67,
}}>

<Picker
selectedValue={selectedCategory}
style={styles.picker}
itemStyle={{height: 70}}
onValueChange={(itemValue, itemIndex) =>
setSelectedCategory(itemValue)
}>
<Picker.Item label="Русское" value="Русское" />
<Picker.Item style={{fontFamily:'Gilroy', fontSize: 15}} label="Европейское" value="Европейское" />
<Picker.Item style={{fontFamily:'Gilroy', fontSize: 15}} label="Азиатское" value="Азиатское" />
</Picker>

</View>

</View>


<FatherNameField ></FatherNameField>



<View style={styles.labelfield}>

<View style={{
flex: 1,
}}>
<Text  style={styles.label}>Сортировка</Text>
</View>



<View style={{
flex: 0.67,
}}>

<Picker
selectedValue={selectedSort}
style={styles.picker}
itemStyle={{height: 70}}
onValueChange={(itemValue, itemIndex) =>
setSelectedSort(itemValue)
}>
<Picker.Item label="По алфавиту" value="По алфавиту" />
<Picker.Item style={{fontFamily:'Gilroy', fontSize: 15}} label="В обраном порядке" value="В обраном порядке" />
</Picker>

</View>

</View>


  

          <View style={styles.labelfieldAdvice}>
            <Text  style={styles.label}>Советы</Text>
            <Switch style={styles.switch}
        trackColor={{ false: '#767577', true: '#5DADC1' }}
        thumbColor={isEnabled ? '#fff' : '#fff'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
          </View>
          <Pressable style={styles.mainBtnContainer}
          onPress={() => {
            // Pass params back to home screen
            navigation.navigate(parentPage, { sort: sort, genderId: male, category: category });
          }}>
          <LinearGradient
          // Button Linear Gradient
          colors={['#5DADC1', '#4E9DB1', '#5DADC1']}
          style={styles.buttonName}>
          <Text style={styles.textBtnName}>Показать {route.params.namesValue} имен</Text>
        </LinearGradient>
            </Pressable>
      </ScrollView>
    );
  }






  
const styles = StyleSheet.create({ 
  filter: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 0
  },
  picker: {
    fontFamily: 'Gilroy',
    paddingBottom: 0,
    color: '#979797',
    fontWeight: 'normal',
    fontFamily:'Gilroy',
    fontSize: 10,
    height: 70
    // flexDirection: 'row',
    // justifyContent: 'flex-end',
    // alignItems: 'flex-end',
    // alignContent: 'flex-end',
  },
  navArrow: {
    transform: [{rotate: '180deg'}],
    marginLeft: 10,
    padding: 12
  },
  labelfield: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#F0F0F3',
    borderBottomWidth: 1,
    paddingBottom: 0,
    paddingTop: 0
  },
  labelfieldStatic: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#F0F0F3',
    borderBottomWidth: 1,
    paddingBottom: 20,
    paddingTop: 20
  },
  labelfieldAdvice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#F0F0F3',
    borderBottomWidth: 1,
    paddingTop: 20,
    paddingBottom: 20
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
    // width: 50
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
    marginTop: '30%'
  }



})