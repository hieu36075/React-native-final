import React from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';

const Header = ({ navigation }) => {
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", paddingHorizontal: 16, paddingTop: 10,  backgroundColor: "#003580" }}>
      <View style={{ flex: 1, borderRadius: 8, overflow: "hidden", backgroundColor: "#f2f2f2", marginLeft: 10, marginBottom:10 }}>
        <TextInput
          placeholder="Search..."
          style={{ padding: 8}}
        />
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("Notifications")} style={{ marginLeft: 10, marginTop: 10 }}>
        <Ionicons name="notifications" size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
