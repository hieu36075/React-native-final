import { Marker } from "react-native-maps";
import { Text, View } from "react-native"
const CustomMarker = (props) => {
    const {
        latitude,
        longitude, 
        price,
        onPress,
        isSelected,
    } = props
  return (
    <Marker coordinate={{latitude: latitude, longitude: longitude }} onPress={onPress}>
      <View
        style={{
          backgroundColor: isSelected ? "black" : "white",
          padding: 5,
          borderRadius: 10,
          borderColor: "grey",
          borderWidth: 1,
        }}
      >
        <Text style={{ color: isSelected? "white" : "black",fontWeight: "bold" }}>{price}$</Text>
      </View>
    </Marker>
  );
};

export default CustomMarker;
