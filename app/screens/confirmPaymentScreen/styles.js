import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    mainContainer:{
        // backgroundColor: 'white',
        backgroundColor: '#F1F1F1',
        flex:2
        // margin:10
    },
    tripContainer:{
        // margin: 10,
        // height:'33%',
        flex:1,
        // borderBottomRightRadius: 10,
        // borderBottomLeftRadius: 10,
        backgroundColor:'#2B9FDC'
    },
    title:{
        // marginLeft: 10, 
        fontSize: 16, 
        fontWeight:'500', 
        marginBottom:5,
        margin:10
    },
    infoContainer:{
        flex:1,
        backgroundColor: 'white',
        margin:5,
        borderRadius: 10
    },
    separator: {
        width: '100%', // Độ rộng của đường kẻ dọc
        height: 1,
        backgroundColor: 'black', // Màu của đường kẻ dọc
        marginHorizontal: 0, // Khoảng cách giữa các nút và đường kẻ dọc
    },
    policyContainer:{
        flex:1,
        backgroundColor: 'white',
        margin: 5,
        borderRadius:10
    },
    generalContainer:{
        flex:1,
        backgroundColor: 'white',
        margin:5,
        borderRadius:10
    },
    detailContainer:{
        flex:1,
        backgroundColor: 'white',
        margin:5,
        borderRadius:10
    },
    buttonContainer:{
        flex:1,
        backgroundColor: 'white',
        alignContent: 'center',
        justifyContent:'center',

    },
    buttonAction:{
        margin: 20,
        borderRadius: 5,
        backgroundColor: '#3AA2FF',
        height: '60%',
        alignItems:'center',
        justifyContent: 'center'
    }
    
      
});

export default styles;