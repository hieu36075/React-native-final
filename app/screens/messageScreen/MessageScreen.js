import React, { useLayoutEffect, useState } from "react";
import { View, TextInput, Text, FlatList, Pressable, ToastAndroid } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MessageItem from "../../components/messageItem/MessageItem";
import styles from "./styles";
import jwtDecode from "jwt-decode";
import { useEffect } from "react";
import { getMessageByRoomId } from "../../redux/roomMessage/roomMessageThunk";
import { useDispatch, useSelector } from "react-redux";
import { addMessage, updateNewRoom } from "../../redux/roomMessage/roomMessageSlice";
import socket from "../../service/socket";
import { KeyboardAvoidingView } from "react-native";
import { useRef } from "react";

const MessageScreen = ({ route, navigation }) => {
    const dispatch = useDispatch();
    const [message, setMessage] = useState("");
    const [user, setUser] = useState();
    const { details, loading } = useSelector((state) => state.roomMessage);
    const [token, setToken] = useState('');
    const endOfMessagesRef = useRef(null);
    const [roomId, setRoomId] = useState(route?.params.id)
    const { name } = route?.params || {};

    const getUsername = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const decodedToken = jwtDecode(token)
            if (token !== null) {
                setUser(decodedToken);
                setToken(token)
            }
        } catch (e) {
            console.error("Error while loading username!", e);
        }
    };


    useLayoutEffect(() => {
        navigation.setOptions({ headerShown: true, title: name });
        getUsername()
    }, []);

    useEffect(() => {
        if(roomId) {
            dispatch(getMessageByRoomId(roomId));
        }
    }, [roomId]);

    useEffect(() => {
        if (endOfMessagesRef.current && details?.message?.length > 0) {
            endOfMessagesRef.current.scrollToEnd({ animated: true });
        }
    }, [details?.message]);

    if (!details) {
        return (
            <Text>loading</Text>
        )
    }
    useEffect(() => {
        socket.on('message-received', (data) => {
            dispatch(addMessage(data))
        })
        return () => {
            socket.off('message-received');
        };
    }, [])

    useEffect(() => {
        socket.on('newRoom-received', (data) => {
            console.log(data)
            dispatch(updateNewRoom(data.newRoom))
            if (!roomId) {
                setRoomId(data?.newRoom?.id)
                socket.emit('joinRoom', data?.newRoom?.id)
            }
        })
        return () => {
            socket.off('newRoom-received');
        };
    }, [])

    const handleNewMessage = () => {
        if (!message || message.trim() === "") {
            ToastAndroid.show('Message is empty', ToastAndroid.SHORT); 
            return; 
          }
        if (!roomId) {
            socket.emit('messageNative', {
                content: message,
                userId: route?.params?.state?.userId,
                authencation: token
            });
            setMessage("")
        } else {
            socket.emit('sendMessageNative', {
                content: message,
                roomId: roomId,
                authencation: token
            });
            setMessage("")
        }
    };


    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 80}
        >
            <View style={styles.messagingscreen}>
                {details && details?.message ? (
                    <FlatList
                        data={details?.message}
                        ref={endOfMessagesRef}
                        renderItem={({ item, index }) => (
                            <MessageItem item={item} user={user?.id} />
                        )}
                        keyExtractor={(item) => item?.id.toString()}
                        onContentSizeChange={() => endOfMessagesRef.current?.scrollToEnd({ animated: true })}
                        automaticallyAdjustKeyboardInsets={true}
                    />
                ) : (
                    ""
                )}

            </View>
            <View style={styles.messaginginputContainer}>
                <TextInput
                    style={styles.messaginginput}
                    value={message}
                    onChangeText={(value) => setMessage(value)}
                />
                <Pressable
                    style={styles.messagingbuttonContainer}
                    onPress={handleNewMessage}
                >
                    <View>
                        <Text style={{ color: "#f2f0f1", fontSize: 20 }}>SEND</Text>
                    </View>
                </Pressable>
            </View>
        </KeyboardAvoidingView>
    );
};

export default MessageScreen;