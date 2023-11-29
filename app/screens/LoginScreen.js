import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomButton from '../components/CustomButton';
import InputField from '../components/InputField';
import { useDispatch, useSelector } from 'react-redux';
import { login, resetPassword } from '../redux/auth/authThunks';
import { ToastAndroid } from 'react-native';
// import Auth from '../components/auth/Auth';


const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { token } = useSelector(state => state.auth)
  const [account, setAccount] = useState({
    email: "",
    password: "",
  });
  const handleLogin = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(account.email)) {
      ToastAndroid.show("Email don't valid ", ToastAndroid.SHORT)
      return;
    }
    if (!account.password || account.password.trim() === "") {
      ToastAndroid.show("Password can not be blank", ToastAndroid.SHORT)
      return;
    }
    try{
       await dispatch(login(account)).unwrap()
    }catch{
      ToastAndroid.show("Please check email and password again", ToastAndroid.SHORT)
    }
  }

  const handleForget = async () =>{
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(account.email)) {
      ToastAndroid.show("Email don't valid ", ToastAndroid.SHORT)
      return;
    }
    try{
      Alert.alert(
        "Confirm",
        "Are you sure you want to reset your password?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "OK",
            onPress: async () => {
              await dispatch(resetPassword({ email: account.email })).unwrap();
              ToastAndroid.show("Reset password success", ToastAndroid.SHORT);
            },
          },
        ]
      );
    }catch{
      ToastAndroid.show("Pass", ToastAndroid.SHORT)
    }
  }

  return (
    <View style={{ paddingHorizontal: 25 }}>
      <View style={{ alignItems: 'center' }}>
      <Image
        style={{width:200, height:200, borderRadius: 20, marginTop: 50}}
        source={{
          uri: 'https://logo.com/image-cdn/images/kts928pd/production/9450d7504579af76d04b446909e53aedf0b66950-338x343.png?w=1080&q=72',
        }}
      />
      </View>

      <Text
        style={{
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
        fieldButtonFunction={() => {handleForget()}}
        />


      <CustomButton label={'Login'} onPress={handleLogin} />

      <View
        style={{
          marginBottom: 30,
          alignItems: 'center'
        }}>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginBottom: 30,
        }}>
        <Text>New to the app?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={{ color: '#4d8bf0', fontWeight: '700' }}> Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
