import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import styles from "./styles";
import { ScrollView } from "react-native";
import { useLayoutEffect } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { confirmOrder, getOrderById } from "../../redux/order/orderThunk";
import {formatDateRange, calculateNumberOfDays} from './caculate'
import { createBill } from "../../redux/payment/paymentThunk";
import {useStripe} from '@stripe/stripe-react-native';
import { getHotelById } from "../../redux/hotel/hotelThunks";
import { ToastAndroid } from "react-native";
const ConfirmPaymentScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const{details, loading} = useSelector((state) => state.order);
  const hotel = useSelector((state)=> state.hotel.details)
  const id = route?.params?.id
  useLayoutEffect(()=>{
    navigation.setOptions({
      headerShown: true,
      title: hotel? hotel?.name : '',
      headerStyle:{
        backgroundColor: "#2B9FDC",
      },
      headerTintColor: "white",
    })
  },[])

  useEffect(()=>{
    dispatch(getOrderById(id)).unwrap()
    .then((res)=>{
      dispatch(getHotelById(res.hotelId))
    })
  },[id])
  if(loading){
    return(
      <Text> loading</Text>
    )
  }
  const vatRate = 0.1; 
  const serviceRate = 0.05;
  const dateString = formatDateRange(details.checkIn, details.checkOut)
  const numberOfDays = calculateNumberOfDays(details.checkIn, details.checkOut);
  const roomPrice = details?.orderdetails?.[0]?.room?.price || ''
  const vatAmount = roomPrice * vatRate;
  const serviceAmount = roomPrice * serviceRate;
  const totalservice = vatAmount + serviceAmount

  const checkOut = async () =>{
    const reponse = await dispatch(createBill({
      amount: details?.price * 100,
      currency: "usd",
      orderId: details?.id
    })).unwrap()
    if(reponse.error){
      return
    }

    const { error: paymentSheetError } = await initPaymentSheet({
      merchantDisplayName: 'hieu.dev',
      paymentIntentClientSecret: reponse.clientSecret,
      defaultBillingDetails: {
		    name: 'Cong Hieu ne',
		  },
    });
    if(paymentSheetError){
      Alert.alert('error:', paymentSheetError.message)
      return
    }
    const result = await presentPaymentSheet();

    if(result.error){
      ToastAndroid.show('Payment error', ToastAndroid.BOTTOM)
      return
    }

      dispatch(confirmOrder(details?.id)).unwrap()
      .then((res)=>{
        navigation.navigate('BillScreen', {id: res.id})
      })

 

  }
  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.tripContainer}>
        <View style={{ margin: 10 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
            Your trip
          </Text>
          <Text style={styles.title}>Dates</Text>
          <View
            style={{ justifyContent: "space-between", flexDirection: "row" }}
          >
            <Text style={{ marginLeft: 10, marginBottom: 10 }}>{dateString}</Text>
            <Text style={{ marginRight: 10 }}> Edit</Text>
          </View>
          <Text style={styles.title}>Guest</Text>
          <Text style={{ marginLeft: 10, marginBottom: 10 }}>1 adult</Text>
        </View>
      </View>
          <Text style={styles.title}>Requirement for your trip</Text>
      <View style={styles.infoContainer}>
        <View style={{margin:10}}>
          <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
          <Text style={{ marginLeft: 10, marginBottom: 10, fontWeight:'bold' }}> Phone Number</Text>
          <Text style={{ marginRight: 10 }}> Add</Text>
          </View>
          <Text style={{ marginLeft: 10, marginBottom: 10 }}> Add and conffirm your phone number to get trips update</Text>
        </View>
      </View>

        <Text style={styles.title}>Cancellation Policy</Text>
      <View style={styles.policyContainer}>
        <View style={{margin:10}}>
        <Text style={{ marginLeft: 10, marginBottom: 10 }}> Add and conffirm your phone number to get trips update</Text>
        </View>
      </View>

            <Text style={styles.title}>General standards</Text>
      <View style={styles.generalContainer}>
            <View style={{margin:10}}>
            <Text style={{ marginLeft: 10, marginBottom: 10 }}> Please keep in mind some simple rules to be a great guest.</Text>
            <Text style={{marginLeft: 20 ,marginBottom:10}}> Follow the house rules. </Text>
            <Text style={{marginLeft: 20, marginBottom:10}}>Treat your Host’s home like your own.</Text>
            </View>
      </View>
      <Text style={styles.title}>Details Price</Text>
      <View style={styles.detailContainer}>
        <View  style={{ justifyContent: "space-between", flexDirection: "row", margin:10 }}>
            <Text style={{ marginLeft: 10, marginBottom: 10 }}>Total Price ({numberOfDays} days)</Text>
            <Text style={{ marginRight: 10, marginBottom: 10 }}> {details.price} USD</Text>
        </View>
        <View  style={{ justifyContent: "space-between", flexDirection: "row", margin:10 }}>
            <Text style={{ marginLeft: 10, marginBottom: 10 }}>Room</Text>
            <Text style={{ marginRight: 10, marginBottom: 10 }}> {details?.orderdetails?.[0]?.room?.price || ''}$</Text>
        </View>
        <View  style={{ justifyContent: "space-between", flexDirection: "row", margin:10 }}>
            <Text style={{ marginLeft: 10, marginBottom: 10 }}>Vat(10%)</Text>
            <Text style={{ marginRight: 10, marginBottom: 10 }}> {totalservice} USD</Text>
        </View>
      <View  style={styles.buttonContainer}>
      <TouchableOpacity style={styles.buttonAction} onPress={checkOut}>
        <Text style={{color:'white', fontWeight: 'bold'}} > Continue</Text>
      </TouchableOpacity>
      </View>
      </View>
    </ScrollView>
  );
};

export default ConfirmPaymentScreen;
