import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
} from "react-native";
import styles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { getHotels, searchHotel } from "../../redux/hotel/hotelThunks";
import { useLayoutEffect } from "react";
import SearchItem from "../../components/searchItem/SearchItem";
const ListScreen = ({ route, navigation }) => {
  const { searchQuery } = route.params;
  const dispatch = useDispatch();
  const [searchResults, setSearchResults] = useState([]);
//   const [loading, setLoading] = useState(true);
    const {list, loading}= useSelector((state) => state.hotel)
    useLayoutEffect(()=>{
        navigation.setOptions({
            headerShown: false,
            
        })
    },[])

    const [searchData, setSearchData] = useState({
        countryId: '',
        name: '',
        categoryId:'',
        occupancy: 1,
        minPrice:1 ,
        maxPrice: 99999
    })

    useEffect(()=>{
        const flechData= async () =>{
           await dispatch(searchHotel(searchData)).unwrap()
        }
        flechData();
    },[searchData])

   
  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <>
        
          <TouchableOpacity onPress={() => navigation.navigate("SearchScreen",{searchQuery})}>
            <View style={styles.container_search}>
              <View style={styles.searchBox}>
                <Text style={styles.input}>{searchQuery}</Text>
                <Text style={styles.confirmText}>Hoàn tất</Text>
              </View>
            </View>
          </TouchableOpacity>
          <FlatList
            data={list}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              return <SearchItem data={item}/>
            }}
          />
        </>
      )}
    </View>
  );
};

export default ListScreen;
