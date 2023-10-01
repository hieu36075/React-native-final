import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import styles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { getHotels, searchHotel } from "../../redux/hotel/hotelThunks";
import { useLayoutEffect } from "react";
import SearchItem from "../../components/searchItem/SearchItem";
import ModalComponent from "../../components/bottomPopup/BottomPopup";
import Slider from "@react-native-community/slider";
// import MultiSlider from '@pto'
const ListScreen = ({ route, navigation }) => {
  const { searchQuery } = route.params;
  const dispatch = useDispatch();
  const [searchResults, setSearchResults] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  //   const [loading, setLoading] = useState(true);
  const { list, loading } = useSelector((state) => state.hotel);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const [searchData, setSearchData] = useState({
    countryId: "",
    name: "",
    categoryId: "",
    occupancy: 1,
    minPrice: 1,
    maxPrice: 99999,
  });
  const [tempMinPrice, setTempMinPrice] = useState(1);
  const [tempMaxPrice, setTempMaxPrice] = useState(99999);
  const [priceRange, setPriceRange] = useState([100, 1000]); // Initial price range

  const handleMinPriceChange = (value) => {
    setTempMinPrice(value);
  };

  const handleMaxPriceChange = (value) => {
    setTempMaxPrice(value);
  };

  const handleApply = () => {
    setSearchData({
      ...searchData,
      minPrice: tempMinPrice,
      maxPrice: tempMaxPrice,
    });
  };

  // const handleMinPriceChange = (value) => {
  //   setSearchData((prevSearchData) => ({
  //     ...prevSearchData,
  //     minPrice: value,
  //   }));
  // };

  // const handleMaxPriceChange = (value) => {
  //   setSearchData((prevSearchData) => ({
  //     ...prevSearchData,
  //     maxPrice: value,
  //   }));
  // };
  const openFilter = () => {
    setShowFilter(true);
  };

  const closeFilter = () => {
    setShowFilter(false);
  };

  const handleFilter = () => {
    console.log("a");
    closeFilter();
  };
  const mapList = () =>{
    navigation.navigate('MapListScreen')
  }
  useEffect(() => {
    const flechData = async () => {
      await dispatch(searchHotel(searchData)).unwrap();
    };
    flechData();
  }, [searchData]);

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          {loading ? (
            <ActivityIndicator size="large" color="blue" />
          ) : (
            <>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("SearchScreen", { searchQuery })
                }
              >
                <View style={styles.container_search}>
                  <View style={styles.searchBox}>
                    <Text style={styles.input}>{searchQuery}</Text>
                    <Text style={styles.confirmText}>Hoàn tất</Text>
                  </View>
                </View>
              </TouchableOpacity>
              <FlatList
                data={list}
                scrollEnabled={false}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                  return <SearchItem data={item} />;
                }}
              />
            </>
          )}
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <View style={styles.actionContainer}>
          <TouchableOpacity style={styles.actionFilter} onPress={openFilter}>
            <Text style={styles.textFilter}>Filter</Text>
          </TouchableOpacity>
          <ModalComponent
            visible={showFilter}
            onClose={closeFilter}
            onOk={handleApply}
          >
            <View style={styles.filterContainer}>
              <Text style={{ margin: 10 }}>Min Price: ${tempMinPrice}</Text>
              <View style={styles.containerTest}>
                <Slider
                  style={{ width: "80%", height: 40 }}
                  minimumValue={1}
                  maximumValue={99999}
                  step={1}
                  value={tempMinPrice}
                  onValueChange={handleMinPriceChange}
                  minimumTrackTintColor="blue"
                  maximumTrackTintColor="gray"
                />
              </View>

              <Text style={{ margin: 10 }}>Max Price: ${searchData.maxPrice}</Text>
              <View style={styles.containerTest}>
                <Slider
                  style={{ width: "80%", height: 40 }}
                  minimumValue={1}
                  maximumValue={99999}
                  step={1}
                  value={searchData.maxPrice}
                  onValueChange={handleMaxPriceChange}
                  minimumTrackTintColor="blue"
                  maximumTrackTintColor="gray"
                />
              </View>
            </View>
          </ModalComponent>
          <View style={styles.verticalSeparator}></View>
          <TouchableOpacity style={styles.actionFilter}>
            <Text style={styles.textFilter}>Sort</Text>
          </TouchableOpacity>
          <View style={styles.verticalSeparator}></View>
          <TouchableOpacity style={styles.actionFilter} onPress={mapList}>
            <Text style={styles.textFilter}>Maps</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default ListScreen;
