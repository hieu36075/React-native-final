import { StyleSheet, Text, View, ImageBackground, Pressable, TextInput, TouchableOpacity, FlatList, ScrollView, RefreshControl } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import Fontisto from 'react-native-vector-icons/Fontisto';
import styles from './styles';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SelectAllHotel } from "../../redux/hotel/hotelSelect";
import { getHotels } from '../../redux/hotel/hotelThunks';
import HotelItem from '../../components/hotelItem/HotelItem';
import useRefreshControl from '../../context/Refresh/useRefreshControl';
import { MaterialIcons } from '@expo/vector-icons';
import jwtDecode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import socket from '../../service/socket';

const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const useRefresh = useRefreshControl();
  const hotel = useSelector(SelectAllHotel)
  const [token, setToken] = useState({});
  const [hasToken, setHasToken] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,

    })
  }, [])
  useEffect(()=>{
    const getToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        setToken(jwtDecode(token))
        setHasToken(true);
      } catch (error) {
        console.error('Lỗi khi lấy token từ AsyncStorage:', error);
      }
    };

    getToken();
  },[])

  useEffect(() => {
    if(hasToken){
      socket.emit("join", token.id);
      socket.on("ping", () => {
        socket.emit("pong", { timestamp: new Date() });
      });
      return () => {
        socket.emit("leave", token.id);
      }
    }
}, [token, hasToken]);

  useEffect(() => {
    dispatch(getHotels({ page: 1, perPage: 5 }));
    // dispatch(getCate)
  }, [])

  useEffect(() => {
    if (useRefresh.isRefreshing) {
      dispatch(getHotels({ page: 1, perPage: 5 }))
    }
  }, [useRefresh.isRefreshing])
  const handleSearch = () => {
  };
  const countries = [
    { id: '1', name: 'Viet Nam' },
    { id: '2', name: 'Thai Lan' },
    { id: '3', name: 'China' },
    { id: '4', name: 'Korean' },
    { id: '5', name: 'Japanse' },
    { id: '6', name: 'Country 3' },
  ]

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={useRefresh.isRefreshing}
          onRefresh={useRefresh.onRefresh} />

      }
    >
      <View>
        <ImageBackground
          source={require('../../assets/images/wallpaper.jpg')}
          style={styles.image}
        >
          <Pressable
            style={styles.searchButton}
            onPress={() => navigation.navigate('SearchScreen')}>
            <Fontisto name="search" size={25} color={'#f15454'} />
            <Text style={styles.searchButtonText}>Where are you going?</Text>
          </Pressable>
          <Text style={styles.title}>Welcome to Travel</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => console.warn('Explore Btn clicked')}
          >
            <Text style={styles.buttonText}>Explore nearby stays</Text>
          </TouchableOpacity>
        </ImageBackground>
        <View style={{ marginTop: 20 }}>
          <FlatList
            data={countries}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity style={{ padding: 10, borderWidth: 1, marginLeft: 20, borderRadius: 20 }}>
                  <Text>{item.name}</Text>
                </TouchableOpacity>
              )
            }}
          />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
            <Text style={styles.textModal}>
              Hotel
            </Text>
            <MaterialIcons
              style={[styles.textModal, {paddingRight:20}]}
              name="arrow-forward-ios" size={24} color="black" />
          </View>
          <View style={{ marginTop: 20 }}>
            {hotel ? (
              <FlatList
                data={hotel}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => {
                  return <HotelItem data={item} />;
                }}
              />
            ) : ('')}
          </View>
        </View>

      </View>
    </ScrollView>
  )
}

export default HomeScreen

