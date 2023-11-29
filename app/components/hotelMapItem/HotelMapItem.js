import React from "react";
import {
  View,
  Text,
  Image,
  useWindowDimensions,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";
const HotelMapItem = (props) => {
    const hotel = props.hotel
    const width = useWindowDimensions().width;
    const navigation = useNavigation()
    const goToPostPage = () => {
      navigation.navigate('DetailsScreen',{hotelId: hotel.id})
    };
  return (
    <Pressable
      onPress={goToPostPage}
      style={[styles.container, { width: width - 60 }]}
    >
      <View style={styles.innerContainer}>
        {/* Image  */}
        <Image style={styles.image} source={{ uri: hotel?.images?.[0]?.url }} />

        <View style={{ flex: 1, marginHorizontal: 10 }}>
          {/* Bed & Bedroom  */}
          <Text style={styles.bedrooms}>
            {hotel?.categoryRooms?.[0].numberOrBeds} bed 
          </Text>

          {/* Type & Description */}
          <Text style={styles.description} numberOfLines={2}>
            {hotel.name}
          </Text>

          {/*  Old price & new price */}
          <Text style={styles.prices}>
            <Text style={styles.price}>${hotel?.rooms?.[0].price} </Text>/ night
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default HotelMapItem;
