import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
  item:{
    width: 170,
    height: 200,
    borderRadius: 10,
    elevation: 5,
    backgroundColor: '#fff',
    marginLeft: 20,
    marginBottom:10,
  },
  image:{
    width: '100%',
    height: '50%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  textName:{
    marginLeft:10,
    marginTop:10,
    fontSize:18,
    fontWeight: '600'
  },
  textPrice:{
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10
  }
});

export default styles;