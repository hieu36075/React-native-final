import { useDispatch } from "react-redux";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { useEffect } from "react";
import { getHotelById } from "../../redux/hotel/hotelThunks";
import { useState } from "react";
import styles from "./styles";
import moment from "moment";
import { calculateNumberOfDays } from "../../screens/confirmPaymentScreen/caculate";
import { AntDesign } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const BookingItem = ({ data }) => {
    const navigation = useNavigation();
  const dispatch = useDispatch();
  const [hotel, setHotel] = useState();

  useEffect(() => {
    dispatch(getHotelById(data.hotelId))
      .unwrap()
      .then((res) => {
  
        setHotel(res);
      });
  }, []);
  if (!hotel) {
    return <Text>loading</Text>;
  }

  // Tính số ngày
  const differenceInDays = calculateNumberOfDays(data?.checkIn, data?.checkOut);

  const handleNavigate=()=>{
    navigation.navigate('BillScreen', {id: data.id})
  }


  return (
    <View style={styles.mainContainer}>
        <TouchableOpacity onPress={handleNavigate}>
      <View style={styles.header}>
        <Text>{data?.status}</Text>
        <Text>
          <Ionicons name="ios-pricetags-outline" size={16} color="black" />{" "}
          {data?.price}$
        </Text>
      </View>
      <View style={styles.itemContainer}>
        <Image source={{ uri: hotel?.images?.[0]?.url }} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={{ margin: 7 }}>
            <Fontisto name="room" size={16} color="black" />
            {" "}
            {data?.orderdetails[0].room.name} in {hotel?.name}{" "}
          </Text>
          <View style={styles.date}>
            <Text>
              {" "}
              <Fontisto name="night-clear" size={16} color="black" />{" "}
              {differenceInDays} Days:{" "}
            </Text>
            <Text>
              <Fontisto name="date" size={16} color="black" />{" "}
              {moment(data?.checkIn).format("YYYY/MM/DD")}
            </Text>
            <Text>
              {" "}
              <AntDesign name="arrowright" size={16} color="black" />{" "}
              {moment(data?.checkOut).format("YYYY/MM/DD")}
            </Text>
          </View>
        </View>
      </View>
        </TouchableOpacity>
    </View>
  );
};
export default BookingItem;
