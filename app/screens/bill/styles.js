import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    billContainer:{
        flex:2,
        backgroundColor:'#D3D3D3'
    }, 
    headerContainer:{
        flex:1,
        backgroundColor:'#2B9FDC',
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
        width: '80%', 
        height: 1,
        backgroundColor: 'black', 
        marginHorizontal: 0, 
        alignSelf: 'center'
    },
    textTicket:{
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
    },
    title:{
        marginTop:10,
        marginLeft:5,
        fontWeight:'bold'
    },
    address:{
        backgroundColor:'#2B9FDC',
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