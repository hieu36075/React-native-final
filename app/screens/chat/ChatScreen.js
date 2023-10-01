import React from "react";
import { View, Text, Pressable, SafeAreaView, FlatList } from "react-native";
import { Feather } from "@expo/vector-icons";

// import ChatComponent from "../component/ChatComponent";
import ChatItem from "../../components/chatItem/ChatItem";
import styles from "./style";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyMessage } from "../../redux/roomMessage/roomMessageThunk";
import { useState } from "react";
import socket from "../../service/socket";
import { useLayoutEffect } from "react";
const ChatScreen = ({navigation}) => {
    const dispatch = useDispatch();
    const [roomId, setRoomId] = useState('')
    const {data, loading} = useSelector((state) => state.roomMessage)
    useLayoutEffect(()=>{
        navigation.setOptions({
            headerShown: false,
        })
    },[])
    useEffect(()=>{
        dispatch(getMyMessage()).unwrap()
        .then((res)=>{
            setRoomId(res[0].id)
            res.forEach(element => {
                socket.emit('joinRoom', element.id)
            });
        })
    },[])
    if(loading){
        return(
            <Text> loading</Text>
        )
    }

    return (
        <View style={styles.chatscreen}>
            <View style={styles.chattopContainer}>
                <View style={styles.chatheader}>
                    <Text style={styles.chatheading}>Chats</Text>
                </View>
            </View>

            <View style={styles.chatlistContainer}>
                {data?.length > 0 ? (
                    <FlatList
                        data={data}
                        renderItem={({ item }) => <ChatItem item={item} />}
                        keyExtractor={(item) => item.id}
                    />
                ) : (
                    <View style={styles.chatemptyContainer}>
                        <Text style={styles.chatemptyText}>No rooms created!</Text>
                        <Text>Click the icon above to create a Chat room</Text>
                    </View>
                )}
            </View>
        </View>
    );
};

export default ChatScreen;