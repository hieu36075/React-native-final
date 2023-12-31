import React from "react";
import { View, Text, Image, Pressable, FlatList } from "react-native";
import styles from "./styles.js";
import { useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
const SearchItem = ({ data }) => {
    const navigation = useNavigation()
  const days = 1;
  const goToPostPage = (id) => {
    navigation.navigate('DetailsScreen',{hotelId: id})
  };
  if(!data){
    return(
      <View>
        <Text>Null</Text>
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={data.images}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => {
          return (
            <Pressable onPress={() => goToPostPage(data.id)}>
              <Image
                style={[
                  styles.image,
                  {
                    marginLeft: index === 0 ? 1 : 10,
                  },
                ]}
                source={{ uri: item.url }}
              />
            </Pressable>
          );
        }}
      />
      <Pressable onPress={() => goToPostPage(data.id)}>
        <View style={styles.infoContainer}>
          <Text style={styles.name} numberOfLines={2}>
            {data?.name}
          </Text>
          <View style={styles.category}>
            <MaterialIcons style={{marginLeft: 5}}name="hotel" size={24} color="white" />
            <Text style={{marginLeft: 10, color: 'white'}}>{data.category.name}</Text>
          </View>
          <Text style={styles.location}>
            <Entypo name="location-pin" size={26} color="gray" />
            {data.city.name} in {data.country.name}
          </Text>
          <View style={styles.separator} />
          <Text style={styles.prices}>
            <Text style={styles.price}> ${data?.rooms[0].price} </Text>/ night
          </Text>

          <Text style={styles.totalPrice}>
            ${data?.rooms[0].price * days} total
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

export default SearchItem;
