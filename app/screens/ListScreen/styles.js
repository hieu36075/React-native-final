import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    container: {
    //   flex: 1,
    backgroundColor: '#ede8e8'
    },
    container_search: {
      width: "100%",
      backgroundColor: "#E5F5FF", // Màu nền xanh
      alignItems: "center",
      padding: 16,
      marginBottom: 16,
    },
    searchBox: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "white", // Màu nền trắng cho ô tìm kiếm
      borderRadius: 10,
      padding: 5,
    },
    input: {
      flex: 1,
      paddingVertical: 5,
    },
    confirmText: {
      color: "#007AFF", // Màu chữ xanh dương cho "Hoàn tất"
    },
   
  });

export default styles;