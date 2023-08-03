import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import {  AntDesign } from '@expo/vector-icons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomButton from '../components/CustomButton';
import InputField from '../components/InputField';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/auth/authThunks';
import { Alert } from 'react-native';
const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const {token} = useSelector(state => state.auth)
  // console.log(token)
  const [account, setAccount] = useState({
    email: "",
    password: "",
  });
  const handleLogin = () => {
      dispatch(login(account))
  }
  
  return (
    <View style={{ paddingHorizontal: 25 }}>
      <View style={{ alignItems: 'center' }}>
        <AntDesign
          name="login"
          size={300}
          color="black"
          style={{ transform: [{ rotate: '-5deg' }] }}
        />
      </View>

      <Text
        style={{
          // fontFamily: 'Roboto-Medium',
          fontSize: 28,
          fontWeight: '500',
          color: '#333',
          marginBottom: 30,
        }}>
        Login
      </Text>

      <InputField
        label={'Email ID'}
        icon={
          <MaterialIcons
            name="alternate-email"
            size={20}
            color="#666"
            style={{ marginRight: 5 }}
          />
        }
        keyboardType="email-address"
        value={account.email}
        onChangeText={(value) => setAccount({ ...account, email: value })}
      />

      <InputField
        label={'Password'}
        icon={
          <Ionicons
            name="ios-lock-closed-outline"
            size={20}
            color="#666"
            style={{ marginRight: 5 }}
          />
        }
        inputType="password"
        value={account.password}
        onChangeText={(value) => setAccount({ ...account, password: value })}
        fieldButtonLabel={'Forgot?'}
        fieldButtonFunction={() => {}}
      />

<CustomButton label={'Login'} onPress={handleLogin} />

      <Text style={{ textAlign: 'center', color: '#666', marginBottom: 30 }}>
        Or, login with ...
      </Text>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 30,
        }}>
        <TouchableOpacity
          onPress={() => {}}
          style={{
            borderColor: '#ddd',
            borderWidth: 2,
            borderRadius: 10,
            paddingHorizontal: 30,
            paddingVertical: 10,
          }}>
          <AntDesign name="google" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {}}
          style={{
            borderColor: '#ddd',
            borderWidth: 2,
            borderRadius: 10,
            paddingHorizontal: 30,
            paddingVertical: 10,
          }}>
          <AntDesign name="facebook-square" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {}}
          style={{
            borderColor: '#ddd',
            borderWidth: 2,
            borderRadius: 10,
            paddingHorizontal: 30,
            paddingVertical: 10,
          }}>
          <AntDesign name="twitter" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginBottom: 30,
        }}>
        <Text>New to the app?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={{ color: '#AD40AF', fontWeight: '700' }}> Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
