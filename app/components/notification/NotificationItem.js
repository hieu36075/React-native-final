import { StyleSheet } from 'react-native'
import { Image } from 'react-native'
import { ScrollView } from 'react-native'
import { Text } from 'react-native'
import { View } from 'react-native'
import { Ionicons } from "@expo/vector-icons";
import moment from 'moment'
import { Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { ToastAndroid } from 'react-native'
export default function NotificationItem({ item }) {
    const navigation = useNavigation();

    const handleNotification = () => {
        switch (item.action) {
          case "action_booking_hotel":
            navigation.navigate('BillScreen', {id: item?.actionId, type: 'noti'})
            break;
          case "action_create_hotel":
            navigation.navigate(`DetailsScreen`, {hotelId: item?.actionId});
            break;
    
          default:
            ToastAndroid.show("This action is under development", ToastAndroid.SHORT);
        }
      };
    return (
        <Pressable style={({ pressed }) => [
            {
                backgroundColor: pressed ? 'rgba(0, 0, 0, 0.1)' : 'transparent'
            },
            styles.notiContainer
        ]}
        onPress={handleNotification}
        >
            <View style={styles.notiItem}>
                <Ionicons
                    name='person-circle-outline'
                    size={45}
                    color='black'
                    style={styles.cavatar}
                />
                <View style={styles.infoItem}>
                <Text>{item?.data}</Text>
                <Text >{item?.createdAt ? moment(item.createAt).format('HH:mm')  : "now"}</Text>
                </View>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    notiContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    notiItem: {
        padding: 10,
        flexDirection: 'row',
        alignItems:'center',
        
    },
    infoItem:{
        marginLeft:10,
    }
})

