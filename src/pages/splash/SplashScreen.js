import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Pressable} from 'react-native';
// import { SvgComponent} from './assets/jsxSvg/MainPageLogo'
// import * as SplashScreen from 'expo-splash-screen';
// import MarqueeText from 'react-native-marquee';
// import { LinearGradient } from 'expo-linear-gradient';



export function CustomSplashScreen () {
    return (
        <View style={{backgroundColor: '#000', flex: 1}}>
            <Text>Hello world!</Text>
        </View>
    )
}