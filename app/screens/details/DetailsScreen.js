import {
  Image,
  ImageBackground,
  View,
  Text,
  Pressable,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import styles from "./styles";
import { Entypo } from "@expo/vector-icons";
import ImageItem from "../../components/imageItem/ImageItem";
import Icon from "../../components/icon/Icon";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHotelById } from "../../redux/hotel/hotelThunks";
import { useLayoutEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import RoomItem from "../../components/Room/RoomItem";

const DetailsScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const scrollViewRef = useRef(null);
  const [isAtTop, setIsAtTop] = useState(true);
  // const amentitySlice = Amentity.slice(0, 10);
  const handleScroll = (event) => {
    const { contentOffset } = event.nativeEvent;
    setIsAtTop(contentOffset.y === 0);
  };
  const { details, loading } = useSelector((state) => state.hotel);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: isAtTop ? false : true,
      title: details?.name,
      headerStyle: {
        backgroundColor: "#005DB1",
        display: isAtTop ? "none" : "flex", // hide header if at the top
      },
      headerTintColor: "white",
    });
  }, [navigation, details, isAtTop]);

  useEffect(() => {
    dispatch(getHotelById(route?.params?.hotelId));
  }, [route.params.hotelId]);

  const handleBooking = () => {
    navigation.navigate('RoomScreen', {id: details?.id, hotelId: details?.hotelId})
  };

  // if (loading && details) {
  //   return <Text>Loadding</Text>;
  // }
  return (
    <>
        {loading && details 
        ? (
          <Text>Loadding</Text>
        ) 
        : (
          <View style={{ flex: 1 }}>
      {/* {loading && details ? ('') : ('')} */}
      <ScrollView
        ref={scrollViewRef}
        onScroll={handleScroll}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
        style={{ backgroundColor: "white", flex: 1 }}
      >
        <ImageItem data={details} />

        <View style={styles.mainContainer}>
          <Text style={styles.textName}>{details?.name}</Text>
          <View style={styles.categoryBorder}>
            <Text style={styles.textCategory}>Khach san</Text>
          </View>
          <Text style={styles.location}>
            <Entypo name="location-pin" size={26} color="gray" />
            {details?.city?.name} in {details?.country?.name}
          </Text>
          <View style={styles.separator} />
          <View style={styles.amentityContainer}>
            <Text style={styles.textTitle}>Amentity</Text>
            <FlatList
              data={details.amenities}
              keyExtractor={(item) => item.id}
              horizontal={true}
              nestedScrollEnabled={true}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => {
                return (
                  <View style={styles.amentityItem}>
                    <Icon iconName={item.name} />
                    <Text style={{ flexDirection: "row" }}>{item.name}</Text>
                  </View>
                );
              }}
            />
          </View>
          <View style={styles.separator} />
          <View style={styles.policyContainer}>
            <Text style={styles.textTitle}>Accommodation policy</Text>
            <View style={styles.timePolicy}>
              <Ionicons name="time-outline" size={24} color="black" />
              <Text style={styles.textPolicy}> Time Check In/ Check Out</Text>
            </View>
            <Text style={styles.textNormal}>
              Time Check In: {details.checkInTime}
            </Text>
            <Text style={styles.textNormal}>
              Time Check Out: {details.checkOutTime}{" "}
            </Text>
            <View style={styles.timePolicy}>
              <MaterialCommunityIcons
                name="clock-fast"
                size={24}
                color="black"
              />
              <Text style={styles.textPolicy}> Check in early</Text>
            </View>
            <Text style={styles.textNormal}>
              You may check in earlier than the property's policy and additional
              fees may apply. Please contact the accommodation facility to
              receive further information.
            </Text>
            <View style={styles.timePolicy}>
              <Ionicons name="time-outline" size={24} color="black" />
              <Text style={styles.textPolicy}> Checking out late</Text>
            </View>
            <Text style={styles.textNormal}>
              You can check out later than the specified time. However, there
              may be additional fees involved.
            </Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.policyContainer}>
            <Text style={styles.textTitle}>Extra Info</Text>
            <Text
              numberOfLines={3}
              ellipsizeMode="tail"
              style={styles.textExtraInfo}
            >
              {details?.extraInfo}
            </Text>
            <Pressable style={styles.showMoreExtraInfo}>
              <Text style={{ fontSize: 18, fontWeight: "bold", color: "#005DB1" }}>
                {" "}
                Show more
              </Text>
            </Pressable>
          </View>
        </View>
        <RoomItem data={details.id}/>
      </ScrollView>
      <View style={styles.footerContainer}>
        <View style={styles.footerPrice}>
          <Text style={styles.textFooter}>Price/1 Room/Night</Text>
          <Text style={styles.textPriceFooter}> 500USD</Text>
          <Text style={{ marginLeft: 20, color:'white' }}> Last Price</Text>
        </View>
        {/* <Button title="as" style={styles.Button}/> */}
        <TouchableOpacity style={[styles.Button]} onPress={handleBooking}>
          <Text style={styles.textButton}>Choose Room</Text>
        </TouchableOpacity>
      </View>
    </View>
        )}
    </>
    
  );
};

export default DetailsScreen;
