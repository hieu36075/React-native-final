import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    billContainer:{
        flex:2,
        backgroundColor:'#D3D3D3'
    }, 
    headerContainer:{
        flex:1,
        backgroundColor:'#5cb85c',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textHeader:{
        margin:10,
        color: 'white'
    },
    detailsBillContainer:{
        backgroundColor:'white',
        flex:1,
        marginBottom:10
    },
    infoText:{
        justifyContent:'space-between',
        flexDirection:'row',
        marginTop:5,
        marginLeft:10
    },
    infoOrder:{
        flex:1,
        backgroundColor: 'white',
        marginBottom: 10
    },
    ticket:{
        borderWidth:1,
        width: 'auto',
        height:'auto',
        borderRadius:15,
        margin:10
    },
    separator: {
        width: '80%', // Độ rộng của đường kẻ dọc
        height: 1,
        backgroundColor: 'black', // Màu của đường kẻ dọc
        marginHorizontal: 0, // Khoảng cách giữa các nút và đường kẻ dọc
        alignSelf: 'center'
    },
    textTicket:{
        // alignSelf: 'flex-start',
        margin:10,
    },
    infoTiket:{
        flex: 1,
        backgroundColor:'white',
        marginBottom:10
    },
    textInfo:{
      
    },
    infomationContainer:{
        flex:1,
        backgroundColor: 'white',
        // marginBottom:10
    },
    title:{
        marginTop:10,
        marginLeft:5,
        fontWeight:'bold'
    },
    address:{
        // flex:1,
        backgroundColor:'#9dd49d',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius:15
    },
    success:{
        borderWidth:1,
        width: 'auto',
        height:'auto',
        borderRadius:15,
        marginRight:10,
        backgroundColor: '#5CFF5C'
    }
      
});

export default styles;