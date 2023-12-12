import React, { useEffect, useState } from "react";
import { View, Image, Text, TouchableOpacity, ScrollView } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import styles from "./styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ModalComponent from "../../components/bottomPopup/BottomPopup";
import { TextInput } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/auth/authSlice";
import { Ionicons } from '@expo/vector-icons';
import { Alert } from 'react-native';
import { ToastAndroid } from "react-native";
import { getMyProfile } from "../../redux/profile/profileThunk";
import { changePassword } from "../../redux/auth/authThunks";

const MenuScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [validationError, setValidationError] = useState("");

  const profile = useSelector(state => state.profile.data);

  useEffect(()=>{
    dispatch(getMyProfile());
  },[]);

  const openModal = () => {
    setModalVisible(true);
    // Reset validation errors when modal is opened
    setValidationError("");
  };

  const closeModal = () => {
    setModalVisible(false);
    // Reset password fields and validation errors when modal is closed
    setPassword("");
    setConfirmPassword("");
    setNewPassword("");
    setValidationError("");
  };

  const handleOk = () => {
    // Validate passwords before proceeding
    if (validatePasswords()) {
      dispatch(changePassword({password: password, newPassword: newPassword}))
      closeModal(); 
    } else {
      ToastAndroid.show(validationError, ToastAndroid.SHORT);
    }
  };

  const handleOption1 = () => {
    navigation.navigate('ProfileScreen');
  };

  const handleOption2 = () => {
    // Handle Option 2
  };

  const handleLogout = () => {
    Alert.alert(
      "Confirm Logout",
      "Are you sure you want to log out?", 
      [
          {
              text: "Cancel",
              onPress: () => ToastAndroid.show("Cancel Logout", ToastAndroid.SHORT),
              style: "cancel"
          },
          { 
              text: "OK", 
              onPress: () => {
                  dispatch(logout());
              }
          }
      ],
    );
  };

  const validatePasswords = () => {
    // Add your password validation logic here
    if (password.length === 0 || confirmPassword.length === 0 || newPassword.length === 0) {
      setValidationError("All password fields are required");
      return false;
    }  
    if (newPassword !== confirmPassword) {
      setValidationError("New password and confirm password must match");
      return false;
    }
    // You can add more validation rules as needed
    return true;
  };

  return (
    <View style={styles.menu}>
      <View style={styles.view_top}>
        <View style={styles.view_image}>
          <Image
            source={{
              uri: profile?.avatarUrl || "https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png",
            }}
            style={styles.image}
          />
        </View>
        <Text style={styles.email}>{profile?.fullName}</Text>
      </View>
      <ScrollView>
        <TouchableOpacity onPress={handleOption1} style={styles.touch_option}>
          <AntDesign name="profile" size={24} color="gray" />
          <Text style={styles.text_action}>Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={openModal} style={styles.touch_option}>
          <MaterialCommunityIcons
            name="shield-key-outline"
            size={24}
            color="black"
          />
          <Text style={styles.text_action}>Change Pass</Text>
        </TouchableOpacity>
        <ModalComponent
          visible={modalVisible}
          onClose={closeModal}
          onOk={handleOk}
        >
          <View style={{ alignItems: "center", margin: 10 }}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputs}
                type="password"
                placeholder="Current Password"
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputs}
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChangeText={(text) => setNewPassword(text)}
                secureTextEntry
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputs}
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={(text) => setConfirmPassword(text)}
                secureTextEntry
              />
            </View>
          </View>
        </ModalComponent>

        <TouchableOpacity onPress={handleLogout} style={styles.touch_option}>
          <Ionicons name="exit-outline" size={24} color="black" />
          <Text style={styles.text_action}>Log out</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default MenuScreen;
