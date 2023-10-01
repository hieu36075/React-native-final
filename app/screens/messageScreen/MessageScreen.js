import React, { useLayoutEffect, useState } from "react";
import { View, TextInput, Text, FlatList, Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MessageItem from "../../components/messageItem/MessageItem";
import styles from "./styles";
import jwtDecode from "jwt-decode";
import { useEffect } from "react";
import { getMessageByRoomId } from "../../redux/roomMessage/roomMessageThunk";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../../redux/roomMessage/roomMessageSlice";
import socket from "../../service/socket";
import { KeyboardAvoidingView } from "react-native";

const MessageScreen = ({ route, navigation }) => {
    const dispatch = useDispatch();
    const [message, setMessage] = useState("");
    const [user, setUser] = useState();
    const { details, loading } = useSelector((state) => state.roomMessage);
    const [token, setToken] = useState('');
    // console.log(details)
    //👇🏻 Access the chatroom's name and id
    const { name, id } = route?.params || {};
    

//👇🏻 This function gets the username saved on AsyncStorage
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

    //👇🏻 Sets the header title to the name chatroom's name
    useLayoutEffect(() => {
        navigation.setOptions({headerShown: true, title: name });
        getUsername()
    }, []);

    useEffect(() => {
        dispatch(getMessageByRoomId(id));
      }, [id]);

    if(!details){
        return(
            <Text>loading</Text>
        )
    }
      useEffect(()=>{
        socket.on('message-received',(data)=>{
        //   console.log('message:', data)
          dispatch(addMessage(data))
        })
      },[])

    const handleNewMessage = () => {
        socket.emit('sendMessageNative', {
            content: message,
            roomId: id,
            authencation: token
          });
        // console.log('a')
    };
    
    return (
        <View style={styles.messagingscreen}>
            <KeyboardAvoidingView
                style={[
                    styles.messagingscreen,
                    { paddingVertical: 15, paddingHorizontal: 10 },
                ]}
            >
                {details && details?.message ? (
                    <FlatList
                        data={details?.message}
                        renderItem={({ item }) => (
                            <MessageItem item={item} user={user?.id} />
                        )}
                        keyExtractor={(item) => item?.id.toString()}
                    />
                ) : (
                    ""
                )}
            </KeyboardAvoidingView>

            <View style={styles.messaginginputContainer}>
                <TextInput
                    style={styles.messaginginput}
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
        </View>
    );
};

export default MessageScreen;