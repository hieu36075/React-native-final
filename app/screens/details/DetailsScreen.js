import {
  Image,
  ImageBackground,
  View,
  Text,
  Pressable,
  ScrollView,
  FlatList,
} from "react-native";
import styles from "./styles";
import { Entypo } from "@expo/vector-icons";
import ImageItem from "../../components/imageItem/ImageItem";
import Icon from "../../components/icon/Icon";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Button } from "react-native";
const data = [
  {
    id: "1",
    imageUrl: "https://a25hotel.com/files/images/3(7).jpg",
  },
  {
    id: "2",
    imageUrl: "https://a25hotel.com/files/images/3(7).jpg",
  },
  {
    id: "3",
    imageUrl: "https://a25hotel.com/files/images/3(7).jpg",
  },
  {
    id: "4",
    imageUrl: "https://a25hotel.com/files/images/3(7).jpg",
  },
  {
    id: "5",
    imageUrl: "https://a25hotel.com/files/images/3(7).jpg",
  },
  {
    id: "6",
    imageUrl: "https://a25hotel.com/files/images/3(7).jpg",
  },
];
const Amentity = [
  {
    id: "clluj403s0000c3l8zofir5ap",
    name: "Wifi",
  },
  {
    id: "clluj403s0001c3l8qtnc0u3h",
    name: "Swimming pool",
  },
  {
    id: "clluj403s0002c3l8a5d7fa5m",
    name: "Gym",
  },
  {
    id: "clluj403s0003c3l8pytus18h",
    name: "Spa",
  },
  {
    id: "clluj403s0004c3l8uq8g7kau",
    name: "Restaurant",
  },
  {
    id: "clluj403s0005c3l8xt0gcbh0",
    name: "Bar",
  },
  {
    id: "clluj403s0006c3l8ifhjy8o1",
    name: "24/7 room service",
  },
  {
    id: "clluj403s0007c3l819qazzkd",
    name: "Free breakfast",
  },
  {
    id: "clluj403s0008c3l8oaevmtq3",
    name: "Parking",
  },
  {
    id: "clluj403s0009c3l809cotyys",
    name: "Airport shuttle",
  },
  {
    id: "clluj403s000ac3l8hrenrktj",
    name: "Laundry service",
  },
  {
    id: "clluj403s000bc3l8y2r09ahl",
    name: "Wedding and conference services",
  },
  {
    id: "clluj403s000cc3l8szxjzdpt",
    name: "Babysitting service",
  },
  {
    id: "clluj403s000dc3l8s9lh0vqc",
    name: "Pet-friendly",
  },
  {
    id: "clluj403s000ec3l853qp0y9t",
    name: "Currency exchange",
  },
  {
    id: "clluj403s000fc3l8y15zlnes",
    name: "In-room safe",
  },
  {
    id: "clluj403s000gc3l8f1hqbbek",
    name: "24/7 front desk",
  },
  {
    id: "clluj403s000hc3l8bq7yxcjv",
    name: "Tour booking services",
  },
  {
    id: "clluj403s000ic3l8x2l8g6oi",
    name: "Business center",
  },
];
const DetailsScreen = () => {
  const amentitySlice = Amentity.slice(0, 10);

  return (
      <>
      <ScrollView
      showsVerticalScrollIndicator={false}
      nestedScrollEnabled={true}
      style={{backgroundColor:'white'}}
      >
      <ImageItem data={data} />

      <View style={styles.mainContainer}>
        <Text style={styles.textName}>ten khac san </Text>
        <View style={styles.categoryBorder}>
          <Text style={styles.textCategory}>Khach san</Text>
        </View>
        <Text style={styles.location}>
          <Entypo name="location-pin" size={26} color="gray" />
          ho chi minh in sai gon
        </Text>
        <View style={styles.separator} />
        <View style={styles.amentityContainer}>
          <Text style={styles.textTitle}>Amentity</Text>
          <FlatList
            data={amentitySlice}
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
          <Text style={styles.textNormal}>Time Check In: 13:00</Text>
          <Text style={styles.textNormal}>Time Check Out: 15:00 </Text>
          <View style={styles.timePolicy}>
            <MaterialCommunityIcons name="clock-fast" size={24} color="black" />
            <Text style={styles.textPolicy}> Check in early</Text>
          </View>
          <Text style={styles.textNormal}>
            You may check in earlier than the property's policy and additional
            fees may apply. Please contact the accommodation facility to receive
            further information.
          </Text>
          <View style={styles.timePolicy}>
            <Ionicons name="time-outline" size={24} color="black" />
            <Text style={styles.textPolicy}> Checking out late</Text>
          </View>
          <Text style={styles.textNormal}>
            You can check out later than the specified time. However, there may
            be additional fees involved.
          </Text>
        </View>
        <View style={styles.separator} />
        <View style={styles.policyContainer}>
        <Text style={styles.textTitle}>Extra Info</Text>
            <Text numberOfLines={3} ellipsizeMode="tail" style={styles.textExtraInfo}>
            Classy Boutique Hotel là lựa chọn sáng giá dành cho những ai 
            đang tìm kiếm một trải nghiệm xa hoa đầy thú vị trong kỳ nghỉ của mình. 
            Lưu trú tại đây cũng là cách để quý khách chiều chuộng bản thân với những dịch 
            vụ xuất sắc nhất và khiến kỳ nghỉ của mình trở nên thật đáng nhớ.
            </Text>
            <Pressable style={styles.showMoreExtraInfo}>
                <Text style={{fontSize: 18, fontWeight:'bold', color:'blue'}}> Show more</Text>
            </Pressable>
        </View>
      </View>
 </ScrollView>
        <View style={styles.footerContainer}>
            <View style={styles.footerPrice}>
            <Text style={styles.textFooter}>
                Price/1 Room/Night
            </Text>
            <Text style={styles.textPriceFooter}> 500USD</Text>
            <Text style={{marginLeft: 20}}> Last Price</Text>
            </View>
            {/* <Button title="as" style={styles.Button}/> */}
            <View style={styles.Button}>
                <Text style={styles.textButton}>Booking</Text>
            </View>
        </View>
    </>
  );
};

export default DetailsScreen;
