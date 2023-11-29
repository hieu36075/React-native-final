import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { MaterialIcons, Ionicons, AntDesign } from '@expo/vector-icons';
// import DatePicker from 'react-native-date-picker';
import InputField from '../components/InputField';
import CustomButton from '../components/CustomButton';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../redux/auth/authThunks';

const RegisterScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const {loading} = useSelector((state) => state.auth)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    userName: "",
  });
  const isValidEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };

  const handleRegister = () => {
    if (
      formData.firstName.trim() === '' ||
      formData.lastName.trim() === '' ||
      formData.userName.trim() === '' ||
      formData.phoneNumber.trim() === '' ||
      formData.email.trim() === '' ||
      formData.password.trim() === '' ||
      formData.confirmPassword.trim() === ''
    ) {
      alert('Please fill out all fields completely.');
      return;
    }
    if (!isValidEmail(formData.email)) {
      alert('Invalid email. Please enter email containing "@" and ".com" characters');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert('Password and confirm password do not match.');
      return;
    }
    
    dispatch(register(formData))
  };
  
  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ paddingHorizontal: 25 }}>
      <View style={{ alignItems: 'center' }}>
        <Image
          style={{ width: 200, height: 200, borderRadius: 20, marginTop: 35, marginBottom: 10 }}
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
        Register
      </Text>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ flex: 1, marginRight: 10 }}>
          <InputField
            label={'First Name'}
            icon={
              <Ionicons
                name="person-outline"
                size={20}
                color="#666"
                style={{ marginRight: 5 }}
              />
            }
            value={formData.firstName}
            onChangeText={(text) => handleInputChange('firstName', text)}
          />
        </View>
        <View style={{ flex: 1 }}>
          <InputField
            label={'Last Name'}
            icon={
              <Ionicons
                name="person-outline"
                size={20}
                color="#666"
                style={{ marginRight: 5 }}
              />
            }
            value={formData.lastName}
            onChangeText={(text) => handleInputChange('lastName', text)}
          />
        </View>
      </View>

      <InputField
        label={'User Name'}
        icon={
          <MaterialIcons
            name="alternate-email"
            size={20}
            color="#666"
            style={{ marginRight: 5 }}
          />
        }
        keyboardType="email-address"
        value={formData.userName}
        onChangeText={(text) => handleInputChange('userName', text)}
      />

      <InputField
        label={'Phone Number'}
        icon={
          <MaterialIcons
            name="alternate-email"
            size={20}
            color="#666"
            style={{ marginRight: 5 }}
          />
        }
        keyboardType="phone-pad"
        value={formData.phoneNumber}
        onChangeText={(text) => handleInputChange('phoneNumber', text)}
      />

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
        value={formData.email}
        onChangeText={(text) => handleInputChange('email', text)}
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
        secureTextEntry
        value={formData.password}
        autoCapitalize="none"
        onChangeText={(text) => handleInputChange('password', text)}
      />

      <InputField
        label={'Confirm Password'}
        icon={
          <Ionicons
            name="ios-lock-closed-outline"
            size={20}
            color="#666"
            style={{ marginRight: 5 }}
          />
        }
        inputType="password"
        secureTextEntry
        value={formData.confirmPassword}
        autoCapitalize="none"
        onChangeText={(text) => handleInputChange('confirmPassword', text)}
      />

      <CustomButton label={'Register'} disabled={loading} loading={loading} onPress={handleRegister} />

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginBottom: 30,
        }}>
        <Text>Already registered?</Text>
        <TouchableOpacity onPress={() => navigation.goBack()} >
          <Text style={{ color: '#4d8bf0', fontWeight: '700' }}> Login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>

  );
};

export default RegisterScreen;
