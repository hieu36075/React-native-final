import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    mainContainer:{
        margin: 20,
        backgroundColor: 'white'
    },
    textName:{
        fontSize: 20,
        fontWeight: 'bold'
    },
    categoryBorder:{
        borderWidth:1,
        borderColor: '#2E7CC3',
        borderRadius: 10,
        padding: 5,
        width: '30%',
        marginTop: 5,
        alignItems: 'center'
    },
    textCategory:{
        fontSize: 16,
        fontWeight: 'bold'
    },
    textLocation:{
        marginTop: 10,
        fontSize: 20
    },
    separator:{
        marginTop: 10,
        borderBottomColor: 'black',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomWidth: 0.5, // Độ rộng của đường kẻ
        borderBottomStyle: 'dashed',
    },
    amentityContainer:{
        marginTop: 10
    },
    textTitle:{
        fontSize: 16,
        fontWeight: 'bold'
    },
    amentityItem:{
        marginTop: 10,
        marginLeft: 20,
        alignItems: 'center',
        marginBottom: 20
    },
    policyContainer:{
        marginTop: 10
    },
    timePolicy:{
        flexDirection:'row',
        alignItems: 'center'
    },
    textPolicy:{
        fontSize: 14,
        fontWeight: '500'
    },
    textNormal:{
        marginLeft: 30
    },
    textExtraInfo:{
        marginRight: 10,
    },
    showMoreExtraInfo:{
        alignContent:'center',
        alignItems: 'center',
        marginTop: '5%'
    },
    footerContainer:{
        height: '10%',
        backgroundColor: 'gray',
        flexDirection:'row',
        alignItems: 'center',
        justifyContent:'space-between',
        paddingHorizontal: 20,
        backgroundColor: '#005DB1',
        borderTopColor:'black'
    },
    textFooter:{
        marginTop: 10,
        marginLeft: 20,
        color:'white'
    },
    footerPrice:{
        flexDirection:'column',
        alignItems: 'center'
    },
    textPriceFooter:{
        marginLeft: 20,
        fontSize: 18,
        color: '#FFE235',
        fontWeight: '700'
    },
    Button:{
        borderWidth:1,
        borderColor: '#FFE235',
        borderRadius: 20,
        padding: 10,
        width: '30%',
        marginTop: 5,
        alignItems: 'center',
        backgroundColor:'#FFE235',
        shadowColor:'#000000',
        elevation: 5
    },
    textButton:{
        color: '#005DB1',
        fontWeight:'500'
    }
      
});

export default styles;