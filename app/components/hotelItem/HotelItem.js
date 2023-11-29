import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import { View, Image, Text } from 'react-native';
import { Pressable } from 'react-native';
const HotelItem =({data}) =>{
    const navigation = useNavigation()
    const goToPostPage = (id) => {
      navigation.navigate('DetailsScreen',{hotelId: id})
    };
    return(
        <Pressable
        onPress={()=>{
            goToPostPage(data.id)
        }}
         style={styles.item}>
            <Image source={{uri: data?.images[0]?.url}} style={styles.image}/>
            <Text style={styles.textName}>{data?.name}</Text>
            <Text style={styles.textPrice}>
                $ {data?.rooms[0].price} /1 night
            </Text>
        </Pressable>
    )
}
export default HotelItem;