import { View, Text, Pressable } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProfileById } from "../../redux/profile/profileThunk";
import moment from "moment";
import socket from "../../service/socket";

export default function ChatItem({ item}) {
    const navigation = useNavigation();
    const dispatch = useDispatch();
	const [messages, setMessages] = useState(item?.message[0]?.content || '');
    const [user, setUser] = useState([])
	useLayoutEffect(() => {
        if (item && item.message && item.message[0]) {
            setMessages(item.message[0]);
        }
	}, []);
    useEffect(()=>{
        if (item && item.userRoomMessage && item.userRoomMessage[0]) {
        dispatch(getProfileById(item?.userRoomMessage[0].userId)).unwrap()
        .then((res)=>{
            setUser(res)
        })
    }
    },[])

    useEffect(()=>{
        socket.on('message-received',(data)=>{
            if(item.id === data.roomId){
                setMessages(data.newMessage)
            }
          })
    },[])
	const handleNavigation = () => {
		navigation.navigate("MessageScreen", {
			id: item.id,
			name: user.fullName,
		});

	};

	return (
		<Pressable style={styles.cchat} onPress={handleNavigation}>
			<Ionicons
				name='person-circle-outline'
				size={45}
				color='black'
				style={styles.cavatar}
			/>

			<View style={styles.crightContainer}>
				<View>
					<Text style={styles.cusername}>{user.fullName}</Text>

					<Text style={styles.cmessage}>
						{messages?.content ? messages.content : "Tap to start chatting"}
					</Text>
				</View>
				<View>
					<Text style={styles.ctime}>
						{messages?.createAt ? moment(messages.createAt).format('HH:mm')  : "now"}
					</Text>
				</View>
			</View>
		</Pressable>
	);
}