import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


export  function ProfileHeader({route}) {
    return (
      <View style={styles.profile}>
        <View>
         <Text style={styles.profileName}>
         123
         </Text>
        </View>
      </View>

    );
  }



  const styles = StyleSheet.create({ 
    profile: {
      flex: 1,
      backgroundColor: '#FFF7ED',
      justifyContent: 'center'
    }
  })