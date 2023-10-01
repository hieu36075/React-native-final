import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    containerRoom:{
        margin:10,
        flex:1,
        borderRadius:10,
        backgroundColor:'white',
    
    },
    image: {
        width: 200, // Điều chỉnh kích thước chiều rộng theo nhu cầu của bạn
        aspectRatio: 3 / 2,
        resizeMode: 'cover',
        borderRadius: 10,
        margin:10
      },
    infoContainer:{
        // flexDirection:'row',
        // alignItems: 'center',
        justifyContent:'space-between',
        margin:10
    },
    separator:{
        marginTop: 10,
        borderBottomColor: 'black',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomWidth: 0.5, // Độ rộng của đường kẻ
        borderBottomStyle: 'dashed',
      },
    leftInfo:{
        flexDirection:'column',
        // alignItems: 'center'
    },
    rightInfo:{
        marginRight: 10,
        marginTop: 5,
        alignItems: 'flex-end'
    },
    button:{
        borderWidth:1,
        borderColor: '#3AA2FF',
        borderRadius: 15,
        padding: 10,
        marginTop: 5,
        alignItems: 'center',
        backgroundColor:'#3AA2FF',
        marginTop: 20
    },
    title:{
        fontSize: 18,
        lineHeight:26,
        fontWeight: 'bold',
        margin:10
    },
    name:{
        fontSize: 16,
        fontWeight: 'bold',
        margin:10
    },
    text:{
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 5,
        marginLeft: 5
    },
    icon:{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5
    },
    headerContainer:{
        height: '5%',
        backgroundColor: 'gray',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#CBCACA',
        borderTopColor: 'black',
    },
    action:{
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    actionFilter:{
        flex:1
    },
    textFilter: {
        textAlign: 'center', // Căn giữa văn bản
    },
    verticalSeparator: {
        width: 1, // Độ rộng của đường kẻ dọc
        // height: '10%',
        backgroundColor: 'black', // Màu của đường kẻ dọc
        marginHorizontal: 10, // Khoảng cách giữa các nút và đường kẻ dọc
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 20,
        marginHorizontal: 20,
        borderBottomWidth: 1,
        borderColor: 'lightgrey',
    },
    buttonValue:{
        borderWidth: 1,
        width: 30,
        height: 30,
        borderRadius: 15,
        borderColor: '#676767',
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default styles;