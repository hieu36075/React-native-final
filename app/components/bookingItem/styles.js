import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    mainContainer:{
        borderRadius: 10,
        elevation: 5,
        backgroundColor: 'white',
        margin:10
    },
    header:{
        justifyContent:'space-between',
        flexDirection:'row',
        marginTop:5,
        marginLeft:10,
        marginRight: 10
    }, 
    itemContainer:{
        flex:1,
        flexDirection: 'row', // Align items in a row (horizontal)
        width: '100%',
        height: 'auto', // Adjust the height as needed
        alignItems: 'center', // Center items vertically
        paddingHorizontal: 10, // Add some padding for spacing
      },
      textContainer: {
        flex: 1, // Take up remaining space
        flexDirection:'column'
      },
      image:{
        width: 50,
        height: 50,
        borderRadius: 10, // Make it a circle
        marginRight: 10, // Add some spacing between image and text
      },
      textName:{

      },
      textPrice:{
        
      },
      date:{
        flexDirection:'row',
        margin:5
      },
      
});

export default styles;