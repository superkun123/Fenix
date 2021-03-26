import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, Switch, View, Pressable, TouchableOpacity, ScrollView, Button } from 'react-native';
import {Picker} from '@react-native-picker/picker';









export  function Filter({route, navigation}) {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [selectedmale, setSelectedmale] = useState();
  const [selectedCategory, setSelectedCategory] = useState();
  const [selectedSort, setSelectedSort] = useState();


 

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


const male = maleType()
const sort = sortType()


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
onValueChange={(itemValue, itemIndex) =>
setSelectedCategory(itemValue)
}>
<Picker.Item label="Русское" value="Русское" />
<Picker.Item style={{fontFamily:'Gilroy', fontSize: 15}} label="Азиатское" value="Азиатское" />
</Picker>

</View>

</View>



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
            navigation.navigate('CatalogScreen', { sort: sort, male: male });
          }}>
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
  picker: {
    fontFamily: 'Gilroy',
    paddingBottom: 0,
    color: '#979797',
    fontWeight: 'normal',
    fontFamily:'Gilroy',
    fontSize: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    alignContent: 'flex-end',
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
  labelfieldAdvice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#F0F0F3',
    borderBottomWidth: 1,
    paddingTop: 10,
    paddingBottom: 10
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