import React from "react";
import { StatusBar } from "react-native";
import { useIsFocused } from "@react-navigation/core";

const FocusedStatusBar = ({ backgroundColor, ...props }) => {
  const isFocused = useIsFocused();

  return isFocused ? (
    <StatusBar
      backgroundColor={backgroundColor} // Đặt màu nền cho StatusBar
      barStyle="light-content" // Đặt màu của biểu tượng và văn bản trên StatusBar
      animated={true}
      {...props}
    />
  ) : null;
};

export default FocusedStatusBar;