import React from 'react'
import { SafeAreaView, View, Text, TouchableOpacity } from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from "jwt-decode";
import store from '../redux/store';
import { setIsLogin, setToken } from '../redux/auth/authSlice';
import { useSelector } from 'react-redux';

const OnboardingScreen = () => {
    const navigation = useNavigation();
    const {isLogin} = useSelector((state) => state.auth)

    useEffect(()=>{
        const getToken = async () => {
          try {
            const token = await AsyncStorage.getItem('token');
            if (token !== null) {
              
              const decodedToken = jwt_decode(token)
              const currentDate = new Date().getTime();
              const isTokenExpired = decodedToken.exp * 1000 < currentDate;
              // store.dispatch(setToken(token))
              store.dispatch(setIsLogin(!isTokenExpired))
            } else {
                store.dispatch(setIsLogin(false))
              console.log('Token không tồn tại.');
            }
          } catch (error) {
            console.error('Lỗi khi lấy token từ AsyncStorage:', error);
          }
        };
        
        // Gọi hàm để lấy token
        getToken();
      },[])
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
      }}>
      <View style={{marginTop: 20}}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 30,
            color: '#20315f',
          }}>
          TravelGreen
        </Text>
      </View>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <FontAwesome5 name="hotel" size={320} color="#4d8bf0" />
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: '#4d8bf0',
          padding: 20,
          width: '90%',
          borderRadius: 10,
          marginBottom: 50,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
        onPress={() => navigation.navigate('Login')}>
        <Text
          style={{
            color: 'white',
            fontSize: 18,
            textAlign: 'center',
            fontWeight: 'bold',
          }}>
          Let's Begin
        </Text>
        <MaterialIcons name="arrow-forward-ios" size={22} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default OnboardingScreen;