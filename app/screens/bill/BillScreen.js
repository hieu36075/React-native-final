import { ScrollView } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import styles from "./styles";
import { useEffect, useLayoutEffect } from "react";
import { getOrderById } from "../../redux/order/orderThunk";
import { useDispatch, useSelector } from "react-redux";
import { getHotelById } from "../../redux/hotel/hotelThunks";
import moment from "moment";
import { getCategoryRoomById } from "../../redux/categoryRoom/categoryRoomThunks";
import { Fontisto } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import paidImg from './../../assets/images/test.png'
import { Image } from "react-native";
const BillScreen = ({ navigation, route }) => {
  const id = route?.params?.id || "cln43fq3o0006c3qg6pw0d3rp";
  const dispatch = useDispatch();
  const order = useSelector((state) => state.order.details)
  const hotel = useSelector((state) => state.hotel.details)
  const roomType = useSelector((state) => state.categoryRoom.detail)
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: hotel?.name || '',
      headerStyle: {
        backgroundColor: "#2B9FDC",
      },
      headerTintColor: "white",
    });
  });
  useEffect(() => {
    dispatch(getOrderById(id)).unwrap()
    .then((res)=>{
        dispatch(getHotelById(res.hotelId))
        dispatch(getCategoryRoomById(res.orderdetails[0].roomId))
        // dispatch()
    })
  }, []);

  return (
    <>
      <ScrollView style={styles.billContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.textHeader}>
          Your room will be received before: {moment(order.checkIn).format('DD/MM/YY - HH:mm')}
          </Text>
        </View>
        <View style={styles.detailsBillContainer}>
          <View style={{ margin: 10 }}>
            <Text style={{ fontWeight: "bold" }}>Billing Information </Text>
            <View style={styles.infoText}>
              <Text>Method Payment</Text>
              <Text>card</Text>
            </View>
            <View style={styles.infoText}>
              <Text>Total</Text>
              <Text>{order.price}$</Text>
            </View>
            <View>
              <View style={styles.infoText}>
                <Text>Status</Text>
                <Text>Payment succeeded</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.infoOrder}>
          <Text style={styles.title}> Ticket</Text>
          <View style={styles.ticket}>
            <View style={styles.infoText}>
              <Text style={styles.textTicket}>
              <Ionicons name="time-outline" size={24} color="black" /> {moment(order.checkIn).format('DD/MM/YY - HH:mm')} (1 person) </Text>
            </View>
            <View style={styles.separator}></View>
            <View style={styles.infoText}>
              <Text style={styles.textTicket}><Fontisto name="hotel" size={16} color="black" /> Hotel </Text>
              <Image source={paidImg} style={{width:50, height:50, borderRadius: 20, marginRight: 20}}/>
           

            </View>
            <Text style={{marginLeft:'10%'}}>{hotel?.name}</Text>
            <View style={styles.separator}></View>
            <Text style={styles.textTicket}> <EvilIcons name="location" size={24} color="green" /> CheckIn : {moment(order.checkIn).format('DD/MM/YY - HH:mm')}</Text>
            <Text style={styles.textTicket}> <EvilIcons name="location" size={24} color="red" /> CheckOut: {moment(order.checkOut).format('DD/MM/YY - HH:mm')}</Text>
            <View style={styles.address}>
                <Text style={styles.textTicket}>
                {hotel.address} - {hotel?.city?.name} - {hotel?.country?.name }
                </Text>
            </View>
          </View>
        </View>
        <View style={styles.infoTiket}>
          <Text style={styles.title}> Details tiket</Text>
          <View style={{ marginLeft: 10, marginRight: 10 }}>
            <View style={styles.infoText}>
              <Text style={styles.textInfo}>ticketId</Text>
              <Text style={styles.textInfo}> #{order.id}</Text>
            </View>
            <View style={styles.infoText}>
              <Text style={styles.textInfo}>Name hotel</Text>
              <Text style={styles.textInfo}> {hotel.name}</Text>
            </View>
            <View style={styles.infoText}>
              <Text style={styles.textInfo}>Room</Text>
              <Text style={styles.textInfo}> {order?.orderdetails?.[0]?.room?.name || ''}</Text>
            </View>
            <View style={styles.infoText}>
              <Text style={styles.textInfo}>RoomType</Text>
              <Text style={styles.textInfo}> </Text>
            </View>
            <View style={styles.infoText}>
              <Text style={styles.textInfo}>Price</Text>
              <Text style={styles.textInfo}>{order.price}$</Text>
            </View>
            <View style={styles.infoText}>
              <Text style={styles.textInfo}>Check In</Text>
              <Text style={styles.textInfo}> {moment(order.checkIn).format('DD/MM/YY - HH:mm')}</Text>
            </View>
            <View style={styles.infoText}>
              <Text style={styles.textInfo}>Check Out</Text>
              <Text style={styles.textInfo}> {moment(order.checkOut).format('DD/MM/YY - HH:mm')}</Text>
            </View>
            {/* <View style={styles.infoText}>
              <Text style={styles.textInfo}>Ma ve</Text>
              <Text style={styles.textInfo}> 123</Text>
            </View> */}
          </View>
        </View>

        <View style={styles.infomationContainer}>
          <Text style={styles.title}> Thong tin lien he</Text>
          <View style={{ marginLeft: 10, marginRight: 10, marginBottom:20 }}>
            <View style={styles.infoText}>
              <Text style={styles.textInfo}>Full Name</Text>
              <Text style={styles.textInfo}> Truong cong hieu</Text>
            </View>
            <View style={styles.infoText}>
              <Text style={styles.textInfo}>Phone number</Text>
              <Text style={styles.textInfo}> 0981747708</Text>
            </View>
            <View style={styles.infoText}>
              <Text style={styles.textInfo}>Email</Text>
              <Text style={styles.textInfo}> 123</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default BillScreen;
