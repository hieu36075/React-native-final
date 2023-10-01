import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    imageFirst: {
        width: '100%',
        aspectRatio: 2 / 3,
        resizeMode: 'cover',
      },
    thumbnailContainer:{
        alignContent:'center',
        flexDirection: 'row',
    },
    thumbnailImage:{
        width: '25%',
        height: 100,
        margin: 1
    },
    mutedThumbnail: {
        opacity: 0.5, // Làm cho ảnh thứ ba mờ đi
    },
    overlayText: {
        position: 'absolute',
        left: '77%',
        top: '50%', // Để căn giữa theo chiều dọc
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
        // textAlign: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 5,
        width: '25%',
        height: 100,
        alignItems: 'center', // Căn giữa theo chiều ngang
        justifyContent: 'center', // Căn giữa theo chiều dọc
        marginTop: -50, // Dịch lên phía trên 50px (một nửa chiều cao của overlayText)
    },
    textShowMore:{
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold'
    },
    showMoreContainer:{
        backgroundColor: 'black',

    },
    showMoreContainerTop:{
        width: '100%',
        height: '100%',
        backgroundColor: 'black',
    },
    textAction:{
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10
        
    },
    topAction:{
        flexDirection: 'row',
        marginTop:30,
        marginLeft: 20,
        marginBottom: 20
    },
    allImage: {
        // width: '100%',
        aspectRatio: 9/ 16,
        resizeMode: 'cover',
        borderRadius: 10,
        marginVertical: 10,
        margin: 20
      },
    imageItem:{
        height: '100%'
    }
      
      
});

export default styles;