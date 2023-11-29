import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useLayoutEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderByUserId } from '../redux/order/orderThunk';
import { Image } from 'react-native';
import { getHotelById } from '../redux/hotel/hotelThunks';
import BookingItem from '../components/bookingItem/BookingItem';

const BookingScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const bookings = useSelector((state) => state.order.data)
  useLayoutEffect(()=>{
    navigation.setOptions({headerShown: true });
  },[])
  useEffect(()=>{
    dispatch(getOrderByUserId({page: 1 , perPage :10}))
  },[])
  return (
    <View style={styles.container}>
      <View>
        <FlatList
          data={bookings}
          renderItem={({item})=>(
            <BookingItem data={item}/>
          )}
        />
      </View>
    </View>
  )
}

export default BookingScreen

const styles = StyleSheet.create({
  container:{
    flex:1,
    margin:10
  },

})