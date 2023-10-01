import { StyleSheet, Text, View,ImageBackground, Pressable, TextInput, TouchableOpacity,FlatList, ScrollView, RefreshControl} from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import Fontisto from 'react-native-vector-icons/Fontisto';
import styles from './styles';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SelectAllHotel } from "../../redux/hotel/hotelSelect";
import { getHotels } from '../../redux/hotel/hotelThunks';
import HotelItem from '../../components/hotelItem/HotelItem';
import useRefreshControl from '../../context/Refresh/useRefreshControl';

const HomeScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const useRefresh = useRefreshControl();
    const hotel = useSelector(SelectAllHotel)
    useLayoutEffect(()=>{
        navigation.setOptions({
            headerShown: false,
            
        })
    },[])

    useEffect(()=>{
      dispatch(getHotels({page:1, perPage:5}))
    },[])
    
    useEffect(()=>{
      if(useRefresh.isRefreshing){
        dispatch(getHotels({page:1, perPage:5}))
      }
    },[useRefresh.isRefreshing])
    const handleSearch = () => {
      // Xử lý sự kiện khi người dùng nhấn vào nút tìm kiếm
      // Ví dụ: navigation.navigate('DestinationSearch', { query: searchQuery });
    };
   const countries = [
  { id: '1', name: 'Country 1' },
  { id: '2', name: 'Country 2' },
  { id: '3', name: 'Country 3' },
  { id: '4', name: 'Country 3' },
  { id: '5', name: 'Country 3' },
  { id: '6', name: 'Country 3' },
   ]

  return (
    <ScrollView
    showsVerticalScrollIndicator={false}
    refreshControl={
      <RefreshControl
      refreshing={useRefresh.isRefreshing}
      onRefresh={useRefresh.onRefresh}/>
      
    }
    // refreshControl={
    //   <CustomRefreshControl
    //   refreshing={useRefresh.onRefresh}
    //   onRefresh={useRefresh.finishRefresh}
    //   />
    // }
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
        <Text style={styles.title}>Welcome to TravelGreen</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => console.warn('Explore Btn clicked')}
          >
          <Text style={styles.buttonText}>Explore nearby stays</Text>
        </TouchableOpacity>
      </ImageBackground>
      <View style={{marginTop: 20}}>
        <FlatList 
        data={countries} 
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index})=>{
          return(
            <TouchableOpacity style={{padding:10, borderWidth:1, marginLeft:20, borderRadius:20}}>
              <Text>{item.name}</Text>
            </TouchableOpacity>
          )
        }}
        />
        <Text style={styles.textModal}>
          Hotel
        </Text>
          <View style={{marginTop:20}}>
            {hotel ? (
              <FlatList 
                data={hotel} 
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({item, index})=>{
                  return <HotelItem data={item}/>;
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

