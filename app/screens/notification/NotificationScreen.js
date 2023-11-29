import { StyleSheet } from "react-native";
import { Text, View } from "react-native";
import socket from "../../service/socket";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ToastAndroid } from "react-native";
import { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import { getNoticationById } from "../../redux/notification/notificationThunks";
import { FlatList } from "react-native";
import NotificationItem from "../../components/notification/NotificationItem";
import { Ionicons } from '@expo/vector-icons';
const NotificationSceen = () =>{
    const dispatch = useDispatch();
    const data = useSelector((state)=> state.notification.data)
    const [token, setToken] = useState({});

    useEffect(()=>{
        const getToken = async () => {
          try {
            const token = await AsyncStorage.getItem('token');
            setToken(jwtDecode(token))
          } catch (error) {
            console.error('Lỗi khi lấy token từ AsyncStorage:', error);
          }
        };
    
        getToken();
      },[])


    useEffect(() => {
          dispatch(getNoticationById());
      }, [dispatch]);
    

    
      useEffect(() => {
          socket.on("notification", (data) => {
            setNotifications((prevNotifications) => [data, ...prevNotifications]);
          });

          return () => {
            socket.off("notification");
          };
      }, []);


    return(
        <View style={styles.chatscreen}>
            <View style={styles.chattopContainer}>
                <View style={styles.chatheader}>
                    <Text style={styles.chatheading}>Notification</Text>
                </View>
            </View>

            <View style={styles.chatlistContainer}>
                {data?.length > 0 ? (
                    <FlatList
                        data={data}
                        renderItem={({ item }) => <NotificationItem item={item} />}
                        keyExtractor={(item) => item.id}
                    />
                ) : (
                    <View style={styles.chatemptyContainer}>
                        <Ionicons name="md-notifications-off-outline" size={60} color="black" />
                        <Text style={styles.chatemptyText}>You Don't Have Notification!</Text>
                    </View>
                )}
            </View>
        </View>
    )
} 

export default NotificationSceen;

const styles = StyleSheet.create({
    chatscreen: {
		backgroundColor: "white",
		flex: 1,
		position: "relative",
	},
	chatheading: {
		fontSize: 20,
		fontWeight: "bold",
		color: "#2E7CC3",
	},
	chattopContainer: {
		backgroundColor: "white",
		height: 70,
		width: "100%",
		padding: 20,
		justifyContent: "center",
		marginBottom: 15,
		elevation: 2,
	},
	chatheader: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	chatlistContainer: {

	},
    chatemptyContainer:{
        // flex:1,
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'column',
        height: '80%'
    }
})