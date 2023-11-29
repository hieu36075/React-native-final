import { useEffect } from "react";
import { View, Image, FlatList, Text, Pressable } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getCategoryRoomByHotel } from "../../redux/categoryRoom/categoryRoomThunks";
import styles from "./styles";

const RoomItem = ({ id }) => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.categoryRoom);


  useEffect(() => {
    dispatch(getCategoryRoomByHotel({ id: id, page: 1, perPage: 5 }));
  }, [id]);

  if (loading) {
    return <Text>loading</Text>;
  }

  const renderItem = ({ item }) => (
    <View style={{ margin: 10 }} key={item.id}>
      <Text style={{ fontSize: 16, margin: 10 }}>{item.name}</Text>
      {item?.rooms?.map((room) => (
        <View style={styles.containerRoom} key={room.id}>
            <FlatList
              data={room.imageRoom}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              renderItem={({item, index})=>{
                return (
                  <Pressable >
                                <Image
              key={item.id}
              style={styles.image}
              source={{
                uri: item.url,
              }}
          />
                  </Pressable>
                )
              }}
            />
        </View>
      ))}
    </View>
  );
  return (
    <>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
      />
    </>
  );
};

export default RoomItem;
