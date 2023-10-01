import React, { useState } from "react";
import { View, Image, Text, TouchableOpacity, ScrollView } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import styles from "./styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ModalComponent from "../../components/bottomPopup/BottomPopup";
import { TextInput } from "react-native";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/auth/authSlice";
const MenuScreen = () => {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [password, setPassword] = useState("");
  console.log(password);
  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleOk = () => {
    // Handle OK button action
    console.log("OK button pressed");
    closeModal(); // Close the modal
  };
  const handleOption1 = () => {
    // Thực hiện chức năng tùy chọn 1
  };

  const handleOption2 = () => {
    // Thực hiện chức năng tùy chọn 2
  };

  const handleLogout = () => {
    dispatch(logout());
    // Thực hiện chức năng tùy chọn 3
  };
  return (
    <View style={styles.menu}>
      <View style={styles.view_top}>
        <View style={styles.view_image}>
          <Image
            source={{
              uri: "https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png",
            }}
            style={styles.image}
          />
        </View>
        <Text style={styles.email}>Hieu36075@gmail.com</Text>
      </View>
      {/* <View style={{ backgroundColor: 'lightgray', flex: 1 }}> */}
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
          <Text>Log out</Text>
        </TouchableOpacity>

        {/* Thêm các TouchableOpacity khác nếu cần */}
      </ScrollView>
      {/* </View> */}
    </View>
  );
};

export default MenuScreen;
