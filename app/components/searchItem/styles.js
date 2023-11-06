import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex:1,
    margin: 10,
   
    backgroundColor: 'white',
    borderRadius: 10
  },
  image: {
    width: 200, // Điều chỉnh kích thước chiều rộng theo nhu cầu của bạn
    aspectRatio: 3 / 2,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  infoContainer:{
    padding: 10,
    // flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
  },
  category:{
    backgroundColor: '#2E7CC3', // Đặt màu nền màu xanh
    padding: 5, // Đặt lề xung quanh phần tử
    borderRadius: 20, // Đặt viền bo tròn
    flexDirection: 'row', // Để căn chỉnh icon và văn bản cùng một hàng
    alignItems: 'center', // Để căn chỉnh icon và văn bản theo trục dọc
    width: '25%'
  },
  bedrooms: {
    marginVertical: 10,
    color: '#5b5b5b',
  },
  name:{
    fontSize: 18,
    lineHeight: 26,
    fontWeight:'500',
  },
  description: {
    fontSize: 18,
    lineHeight: 26,
  },
  location:{
    color:'#818181'
  },
  separator:{
    marginTop: 10,
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 0.5, // Độ rộng của đường kẻ
    borderBottomStyle: 'dashed',
  },
  prices: {
    fontSize: 18,
    marginVertical: 10,
    marginLeft: '70%'
  },
  oldPrice: {
    color: '#5b5b5b',
    textDecorationLine: 'line-through',
  },
  price: {
    fontWeight: 'bold',
  },
  totalPrice: {
    color: 'green',
    textDecorationLine: 'underline',
    marginLeft: '80%'
  }
});

export default styles;