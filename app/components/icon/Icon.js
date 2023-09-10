import React from "react";
import { View, Text } from "react-native";
import { Ionicons, FontAwesome5, MaterialIcons } from "@expo/vector-icons";

const Icon = ({ iconName }) => {
  let iconComponent = null;

  // Sử dụng switch case để xác định icon tương ứng dựa trên tên tính năng
  switch (iconName) {
    case "Wifi":
      iconComponent = <Ionicons name="wifi" size={30} color="blue" />;
      break;
    case "Swimming pool":
      iconComponent = <Ionicons name="water" size={30} color="blue" />;
      break;
    case "Gym":
      iconComponent = <Ionicons name="fitness" size={30} color="blue" />;
      break;
    case "Spa":
      iconComponent = <FontAwesome5 name="spa" size={30} color="blue" />;
      break;
    case "Restaurant":
      iconComponent = <Ionicons name="restaurant" size={30} color="blue" />;
      break;
    case "Bar":
      iconComponent = (
        <FontAwesome5 name="cc-diners-club" size={30} color="blue" />
      );
      break;
    case "24/7 room service":
      iconComponent = (
        <MaterialIcons name="room-service" size={30} color="blue" />
      );
      break;
    case "Free breakfast":
      iconComponent = (
        <MaterialIcons name="breakfast-dining" size={30} color="blue" />
      );
      break;
    case "Parking":
      iconComponent = (
        <MaterialIcons name="local-parking" size={30} color="blue" />
      );
      break;
    case "Airport shuttle":
      iconComponent = (
        <MaterialIcons name="airport-shuttle" size={30} color="blue" />
      );
      break;
    // Thêm các trường hợp cho các tính năng khác ở đây
    default:
      // Nếu không tìm thấy tên tính năng trong danh sách, trả về null
      iconComponent = null;
      break;
  }

  return <View>{iconComponent}</View>;
};

export default Icon;
