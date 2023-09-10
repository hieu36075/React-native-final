import React from 'react';
import { View, Image, Text, TouchableOpacity, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import styles from './styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
const MenuScreen = () => {
  const handleOption1 = () => {
    // Thực hiện chức năng tùy chọn 1
  };

  const handleOption2 = () => {
    // Thực hiện chức năng tùy chọn 2
  };

  const handleOption3 = () => {
    // Thực hiện chức năng tùy chọn 3
  };
  return (
    <View style={styles.menu}>
      <View
        style={styles.view_top}
      >
        <View
          style={styles.view_image}
        >
          <Image
            source={{
              uri:
                'https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png',
            }}
            style={styles.image}
          />
        </View>
        <Text style={styles.email}>Hieu36075@gmail.com</Text>
      </View>
      {/* <View style={{ backgroundColor: 'lightgray', flex: 1 }}> */}
      <ScrollView >
      <TouchableOpacity
          onPress={handleOption1}
          style={styles.touch_option}
        >
          <AntDesign name="profile" size={24} color="gray" />
          <Text style={styles.text_action}>Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleOption2}
          style={styles.touch_option}
         >
          <MaterialCommunityIcons name="shield-key-outline" size={24} color="black" />
            <Text style={styles.text_action}>Change Pass</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={handleOption3} 
          style={styles.touch_option}
        >
         
            <Text>Tùy chọn 3</Text>

        </TouchableOpacity>

        {/* Thêm các TouchableOpacity khác nếu cần */}
      </ScrollView>
      {/* </View> */}
    </View>
  );
};

export default MenuScreen;
