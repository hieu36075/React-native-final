import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
  menu:{
    flex: 1, 
    backgroundColor: '#ede8e8'
  },
  view_top:{
    width: '100%',
    height: 150,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center', // Căn giữa ảnh và văn bản
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  image:{
    width: '100%',
    height: '100%',
  },
  email:{
    marginTop: 10
  },
  view_image:{
    backgroundColor: 'gray', // Màu xám
    width: 80, // Độ rộng của vùng ảnh
    height: 80, // Độ cao của vùng ảnh
    borderRadius: 40, // Để tạo hình tròn, bạn có thể thay đổi giá trị này
    overflow: 'hidden', // Để ảnh không tràn ra ngoài vùng hình tròn
    justifyContent: 'center',
    alignItems: 'center',
  },
  touch_option:{
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  text_action:{
    marginLeft: 10
  },
  inputs:{
    padding:10
},
  inputContainer: {
    borderColor:'black',
    borderWidth:1, 
    borderRadius:20,  
    backgroundColor:'#FFFFFF',
    height:45,
    width:'100%',
    marginVertical:10,
},
});

export default styles;