import { useEffect } from "react";
import {
  View,
  Image,
  FlatList,
  Text,
  Pressable,
  ScrollView,
  Touchable,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getCategoryRoomByHotel } from "../../redux/categoryRoom/categoryRoomThunks";
import styles from "./styles";
import { useState } from "react";
import { Octicons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import Modal from "react-native-modal";
import WheelPickerExpo from "react-native-wheel-picker-expo";
import { createOrder, updateOrder } from "../../redux/order/orderThunk";
const RoomScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.categoryRoom);
  const [id, setId] = useState(route?.params?.id || "cln3km3n90001c3iwelc3d8uu");

  const [startDate, setStartDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const [isModalVisible, setModalVisible] = useState(false);
  const [showOption, setShowOption] = useState(false);
  const [selectedDay, setSelectedDay] = useState(1);
  const [endDate, setEndDate] = useState(
    new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
  );

  const numDays = 30;
  const dayOptions = Array.from({ length: numDays }, (_, index) => ({
    label: `${index + 1} days`,
    value: index + 1,
  }));
  // console.log(data)
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);

  const toggleDatePicker = () => {
    setShowPicker(!showPicker);
  };

  const onChangeTime = ({ type }, selectedDate) => {
    if (type == "set") {
      const currentDate = selectedDate;
      setStartDate(currentDate);
      setShowPicker(false);
    } else {
      toggleDatePicker();
    }
  };
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const toggleModalOption = () => {
    setShowOption(!showOption);
  };
  const handleSelectedDay = () => {
    const newEndDate = new Date(startDate);
    newEndDate.setDate(startDate.getDate() + selectedDay);
    setEndDate(newEndDate);
    toggleModal();
  };
  //   console.log(data);
  useEffect(() => {
    dispatch(
      getCategoryRoomByHotel({
        id: id,
        page: 1,
        perPage: 5,
      })
    );
  }, [id]);

  if (loading) {
    return <Text>loading</Text>;
  }
  const vatRate = 0.1; // 10% VAT
  const serviceRate = 0.05;

  // console.log(roomPrice)

  const isOrderChanged = (existingOrder, updatedOrder) => {
    const checkInChanged = existingOrder.checkIn !== updatedOrder.checkIn;
  
    const checkOutChanged = existingOrder.checkOut !== updatedOrder.checkOut;
    
    const priceChanged = existingOrder.price !== updatedOrder.price;

    return checkInChanged || checkOutChanged || priceChanged/* || ... */;
  }

  const handleChooseRoom = async (roomId, price) => {
    const roomPrice = price * selectedDay
    const vatAmount = roomPrice * vatRate;
    const serviceAmount = roomPrice * serviceRate;
    const totalservice = vatAmount + serviceAmount;
    const totalPrice = roomPrice + totalservice
    try{
        const order = await dispatch(createOrder({
            checkIn: startDate,
            checkOut: endDate,
            price: totalPrice,
            roomId: roomId,
            hotelId: id,
        })).unwrap();
        if(order){
            const newOrder ={
                ...order,
                checkIn: startDate,
                checkOut: endDate,
                price: totalPrice
            }
            if(isOrderChanged(order, newOrder)){
                await dispatch(updateOrder({
                    id: order.id,
                    checkIn: startDate,
                    checkOut: endDate,
                    price: totalPrice,
                    hotelId: id,
                })).unwrap();
            };
        };
        navigation.navigate("ConfirmPaymentScreen", {id: order?.id})
    }catch(error){
        console.error('error', error)
    }
  };

  const renderItem = ({ item }) => (
    <View style={{ margin: 10 }} key={item.id}>
      <Text style={styles.title}>{item.name}</Text>
      <View>
        {item?.rooms?.map((room) => (
          <View style={styles.containerRoom} key={room.id}>
            <FlatList
              data={room.imageRoom}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => {
                return (
                  <Pressable>
                    <Image
                      key={item.id}
                      style={styles.image}
                      source={{
                        uri: item.url,
                      }}
                    />
                  </Pressable>
                );
              }}
            />
            <Text style={styles.name}>{room.name}</Text>
            <View style={styles.separator}></View>
            <View style={styles.infoContainer}>
              <View style={styles.leftInfo}>
                <View style={styles.icon}>
                  <Octicons name="person" size={16} color="black" />
                  <Text style={styles.text}>
                    {room.occupancy} person / 1 room
                  </Text>
                </View>
                <View style={styles.icon}>
                  <Ionicons name="md-bed-outline" size={16} color="black" />
                  <Text style={styles.text}> {item.numberOrBeds} / bed</Text>
                </View>
              </View>
              <View style={styles.separator}></View>
              <View style={styles.rightInfo}>
                <Text style={styles.text}> {room.price}$ /1 night</Text>
                <Pressable
                  style={styles.button}
                  onPress={() => handleChooseRoom(room.id, room.price)}
                >
                  <Text style={styles.submitButton}> Booking</Text>
                </Pressable>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
  return (
    <>
      <View style={styles.headerContainer}>
        <View style={styles.action}>
          <TouchableOpacity
            style={styles.actionFilter}
            onPress={toggleDatePicker}
          >
            <Text style={styles.textFilter}>
              {" "}
              {moment(startDate).format("DD/HH/YYYY")}
            </Text>
          </TouchableOpacity>
          {showPicker && (
            <DateTimePicker
              mode="date"
              display="spinner"
              value={startDate}
              onChange={onChangeTime}
            />
          )}
          <View style={styles.verticalSeparator}></View>
          <TouchableOpacity style={styles.actionFilter} onPress={toggleModal}>
            <Text style={styles.textFilter}> {selectedDay} Day</Text>
          </TouchableOpacity>
          <Modal
            isVisible={isModalVisible}
            style={{ justifyContent: "flex-end", margin: 0 }}
            backdropOpacity={0.5}
          >
            <View
              style={{
                height: "25%",
                backgroundColor: "white",
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  padding: 10,
                }}
              >
                <TouchableOpacity onPress={toggleModal}>
                  <Text style={{ color: "blue" }}>Hủy</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSelectedDay}>
                  <Text style={{ color: "blue" }}>OK</Text>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: "25%",
                }}
              >
                <WheelPickerExpo
                  height={200}
                  width={200}
                  initialSelectedIndex={selectedDay - 1}
                  items={dayOptions}
                  style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                  onChange={({ item }) => setSelectedDay(item.value)}
                />
              </View>
            </View>
          </Modal>
          <View style={styles.verticalSeparator}></View>
          <TouchableOpacity
            style={styles.actionFilter}
            onPress={toggleModalOption}
          >
            <Text style={styles.textFilter}> Khachs</Text>
          </TouchableOpacity>
          <Modal
            isVisible={showOption}
            style={{ justifyContent: "flex-end", margin: 0 }}
            backdropOpacity={0.5}
          >
            <View
              style={{
                height: "35%",
                backgroundColor: "white",
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  padding: 10,
                }}
              >
                <TouchableOpacity onPress={toggleModalOption}>
                  <Text style={{ color: "blue" }}>Hủy</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={toggleModalOption}>
                  <Text style={{ color: "blue" }}>OK</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.row}>
                <View style={{ justifyContent: "space-between" }}>
                  <Text style={{ fontWeight: "bold" }}>Adults</Text>
                  <Text style={{ color: "#8d8d8d" }}>Ages 13 or above</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Pressable
                    onPress={() => setAdults(Math.max(0, adults - 1))}
                    style={styles.buttonValue}
                  >
                    <Text style={{ fontSize: 20, color: "#474747" }}>-</Text>
                  </Pressable>

                  <Text style={{ marginHorizontal: 20, fontSize: 16 }}>
                    {adults}
                  </Text>

                  <Pressable
                    onPress={() => setAdults(adults + 1)}
                    style={styles.buttonValue}
                  >
                    <Text style={{ fontSize: 20, color: "#474747" }}>+</Text>
                  </Pressable>
                </View>
              </View>

              <View style={styles.row}>
                <View>
                  <Text style={{ fontWeight: "bold" }}>Children</Text>
                  <Text style={{ color: "#8d8d8d" }}>Ages 2-12</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Pressable
                    onPress={() => setChildren(Math.max(0, children - 1))}
                    style={styles.buttonValue}
                  >
                    <Text style={{ fontSize: 20, color: "#474747" }}>-</Text>
                  </Pressable>

                  <Text style={{ marginHorizontal: 20, fontSize: 16 }}>
                    {children}
                  </Text>

                  <Pressable
                    onPress={() => setChildren(children + 1)}
                    style={styles.buttonValue}
                  >
                    <Text style={{ fontSize: 20, color: "#474747" }}>+</Text>
                  </Pressable>
                </View>
              </View>
              <View style={styles.row}>
                <View>
                  <Text style={{ fontWeight: "bold" }}>Infants</Text>
                  <Text style={{ color: "#8d8d8d" }}>Under 2</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Pressable
                    onPress={() => setInfants(Math.max(0, infants - 1))}
                    style={styles.buttonValue}
                  >
                    <Text style={{ fontSize: 20, color: "#474747" }}>-</Text>
                  </Pressable>

                  <Text style={{ marginHorizontal: 20, fontSize: 16 }}>
                    {infants}
                  </Text>

                  <Pressable
                    onPress={() => setInfants(infants + 1)}
                    style={styles.buttonValue}
                  >
                    <Text style={{ fontSize: 20, color: "#474747" }}>+</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </View>
      <ScrollView>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
        />
      </ScrollView>
    </>
  );
};

export default RoomScreen;
