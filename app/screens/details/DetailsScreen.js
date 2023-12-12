import {
  Image,
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
import { getUsersById } from "../../redux/user/userThunks";
import { getProfileById } from "../../redux/profile/profileThunk";

const DetailsScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const scrollViewRef = useRef(null);
  const [isAtTop, setIsAtTop] = useState(true);
  
  const handleScroll = (event) => {
    const { contentOffset } = event.nativeEvent;
    setIsAtTop(contentOffset.y === 0);
  };
  const { details, loading } = useSelector((state) => state.hotel);
  const user = useSelector((state) => state.user.details)
  const profile = useSelector((state)=> state.profile.data)
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: isAtTop ? false : true,
      title: details?.name,
      headerStyle: {
        backgroundColor: "#005DB1",
        display: isAtTop ? "none" : "flex", 
      },
      headerTintColor: "white",
    });
  }, [navigation, details, isAtTop]);

  useEffect(() => {
    dispatch(getHotelById(route?.params?.hotelId)).unwrap()
    .then((res)=>{
      dispatch(getUsersById(res?.userId))
      dispatch(getProfileById(res?.userId))
    })
  }, [route.params.hotelId]);

  const handleBooking = () => {
    navigation.navigate('RoomScreen', {id: details?.id, hotelId: details?.hotelId})
  };

  const handleMessage = (id) =>{
    navigation.navigate('MessageScreen', {state:{userId: id}})
  }

  if (loading) {
    return <Text>Loadding</Text>;
  }
  return (
    <>
        {loading && details 
        ? (
          <Text>Loadding</Text>
        ) 
        : (
          <View style={{ flex: 1 }}>
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
          <View style={styles.separator} />
          <View style={{}}>
              <Text style={styles.textTitle}>Owner Hotel Contact</Text>
              <View style={{justifyContent:'center', alignItems:'center', flexDirection:'col', marginTop:10}}> 
              <Image
                style={{width: 100, height: 100, borderRadius: 60}}
                source={{
                  uri: profile?.avatarUrl || 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png',
                }}
              />
                <Text style={{marginTop: 10}}>Email: {user?.email}</Text>
              <Pressable 
              style={{marginTop:15, borderWidth: 0, borderRadius: 10, padding:10, backgroundColor:"#005DB1" }}
              onPress={()=>{handleMessage(profile?.userId)}}
              >
                <Text style={{color:'white'}}>Message Now</Text>
              </Pressable>
              </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.footerContainer}>
        <View style={styles.footerPrice}>
          <Text style={styles.textFooter}>Price/1 Room/Night</Text>
          <Text style={styles.textPriceFooter}>{details?.rooms?.[0]?.price} USD</Text>
          <Text style={{ marginLeft: 20, color:'white' }}> Last Price</Text>
        </View>
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
