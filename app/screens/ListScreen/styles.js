import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    container: {
    //   flex: 1,
    backgroundColor: '#ede8e8',
    // width: '100%'
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
    footer: {
      height: '5%',
      backgroundColor: 'gray',
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
      backgroundColor: '#CBCACA',
      borderTopColor: 'black',
    },
    actionContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    actionFilter: {
      flex: 1, // Chia đều các nút trong hàng ngang
    },
    textFilter: {
      textAlign: 'center', // Căn giữa văn bản
    },
    verticalSeparator: {
      width: 1, // Độ rộng của đường kẻ dọc
      backgroundColor: 'black', // Màu của đường kẻ dọc
      marginHorizontal: 10, // Khoảng cách giữa các nút và đường kẻ dọc
      // height: '100%'
    },
    containerTest: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    filterContainer:{
      margin:5
    },

  });

export default styles;