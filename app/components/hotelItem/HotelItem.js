import styles from './styles';
import { View, Image, Text } from 'react-native';
const HotelItem =({data}) =>{

    return(
        <View style={styles.item}>
            <Image source={{uri: data?.images[0]?.url}} style={styles.image}/>
            <Text style={styles.textName}>{data?.name}</Text>
            <Text style={styles.textPrice}>
                $ {data?.rooms[0].price}
            </Text>
        </View>
    )
}
export default HotelItem;