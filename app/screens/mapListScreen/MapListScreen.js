// import styles

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { FlatList, Text, View, useWindowDimensions } from "react-native";
import Mapview, { Marker } from "react-native-maps";
// import Geolocation from "@react-native-community/geolocation";
import * as Location from "expo-location";
import CustomMarker from "../../components/customMarker/CustomMarker";
import HotelMapItem from "../../components/hotelMapItem/HotelMapItem";
import { useSelector } from "react-redux";

const MapListScreen = ({ navigation }) => {
  const [location, setLocation] = useState(null);

  const { data } = useSelector((state) => state.hotel);
  const [selectedPlaceId, setSelectedPlaceId] = useState(null);

  const flatlist = useRef();
  const map = useRef();
  const viewConfig = useRef({ itemVisiblePercentThreshold: 70 });
  const width = useWindowDimensions().width;
  const onViewChanged = useRef(({viewableItems}) => {
    if (viewableItems.length > 0) {
      const selectedPlace = viewableItems[0].item;
      setSelectedPlaceId(selectedPlace.id)
    }
  })
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  useEffect(()=>{
    if(!selectedPlaceId || !flatlist){
        return;
    }
    const index = data.findIndex(hotel => hotel.id === selectedPlaceId);
    flatlist.current.scrollToIndex({index})

    const selectedPlace = data[index];
    const region = {
      latitude: selectedPlace.latitude,
      longitude: selectedPlace.longitude,
      latitudeDelta: 0.2,
      longitudeDelta: 0.03,
    }
    map.current.animateToRegion(region);
  },[selectedPlaceId])
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  
  //   if(data){
  //     return(
  //         <Text>loading..</Text>
  //     )
  //   }
  return (
    <View style={{ width: "100%", height: "100%" }}>
      {location ? (
        <>
          <Mapview
            ref={map}
            style={{ width: "100%", height: "100%" }}
            initialRegion={{
              latitude: 16.046815,
              longitude: 108.2366789,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            {data?.map((hotel) => (
              <CustomMarker
                latitude={hotel?.latitude}
                longitude={hotel?.longitude}
                price={hotel?.rooms?.[0]?.price}
                isSelected={hotel?.id === selectedPlaceId}
                onPress={() => setSelectedPlaceId(hotel?.id)}
                key={hotel?.id.toString()}
              />
            ))}
          </Mapview>
          <View style={{ position: "absolute", bottom: 10 }}>
            <FlatList
              ref={flatlist}
              data={data}
              renderItem={({ item }) => <HotelMapItem hotel={item} />}
              keyExtractor={(item) => item?.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              snapToInterval={width - 60}
              snapToAlignment={"center"}
              decelerationRate={"fast"}
              viewabilityConfig={viewConfig.current}
              onViewableItemsChanged={onViewChanged.current}
            />
          </View>
        </>
      ) : (
        <Text>loading..</Text>
      )}
      {/* <Text>map list</Text> */}
    </View>
  );
};

export default MapListScreen;
