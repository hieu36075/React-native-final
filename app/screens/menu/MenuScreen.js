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
const MenuScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [password, setPassword] = useState("");
  const profile = useSelector(state => state.profile.data);

  useEffect(()=>{
    dispatch(getMyProfile())
  },[])
  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleOk = () => {
    console.log("OK button pressed");
    closeModal(); 
  };
  const handleOption1 = () => {
    navigation.navigate('ProfileScreen')
  };

  const handleOption2 = () => {

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
                placeholder="Password"
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry
              />
              
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputs}
                type="password"
                placeholder="Confirm password"
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
                value={password}
                onChangeText={(text) => setPassword(text)}
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
      {/* </View> */}
    </View>
  );
};

export default MenuScreen;
