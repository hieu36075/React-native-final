import { StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'

const HomeScreen = () => {
    const navigation = useNavigation();
    // useLayoutEffect(()=>{
    //     navigation.setOptions({
    //         headerShown: true,
    //         // title: "Booking.com",
    //         // headerTitleAlign: 'center', 
    //         // headerTitleStyle:{
    //         //     fontSize: 20,
    //         //     fontWeight:"bold",
    //         //     color: "white",
                
    //         // },
    //         // headerStyle: {
    //         //     backgroundColor: "#1089e6",
    //         //     borderBottomColor: "transparent",
    //         //     shadowColor: "transparent",
    //         // },
    //     })
    // },[])
  return (
    <View>
      <Text>HomeScreen</Text>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})