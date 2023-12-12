import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./app/screens/home/HomeScreen";
import { AntDesign } from '@expo/vector-icons';
import { NavigationContainer } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from '@expo/vector-icons';
import SavedScreen from "./app/screens/SavedScreen";
import BookingScreen from "./app/screens/BookingScreen";
import MenuScreen from "./app/screens/menu/MenuScreen";
import { SafeAreaView } from 'react-native';
import FocusedStatusBar from "./app/components/FocusedStatusBar";
import Header from "./app/layout/header";
import LoginScreen from "./app/screens/LoginScreen";
import RegisterScreen from "./app/screens/RegisterScreen";
import OnboardingScreen from "./app/screens/OnboardingScreen";
import { useDispatch, useSelector } from "react-redux";
import SearchScreen from "./app/screens/search/SearchScreen";
import ListScreen from "./app/screens/ListScreen/ListScreen";
import DetailsScreen from "./app/screens/details/DetailsScreen";
import RoomScreen from "./app/screens/roomScreen/RoomScreen";
import BillScreen from "./app/screens/bill/BillScreen";
import ConfirmPaymentScreen from "./app/screens/confirmPaymentScreen/ConfirmPaymentScreen";
import ChatScreen from "./app/screens/chat/ChatScreen";
import MessageScreen from "./app/screens/messageScreen/MessageScreen";
import { Feather } from '@expo/vector-icons';
import MapListScreen from "./app/screens/mapListScreen/MapListScreen";
import NotificationSceen from "./app/screens/notification/NotificationScreen";
import ProfileScreen from "./app/screens/profile/ProfileScreen";
import socket from "./app/service/socket";
import { useEffect } from "react";
import { addNotification } from "./app/redux/notification/notificationSlice";
const StackNavigator = () => {
  const Tab = createBottomTabNavigator();
  const { isLogin } = useSelector((state) => state.auth)
  const Stack = createNativeStackNavigator();
  const dispatch = useDispatch();
  useEffect(() => {
    socket.on("notification", (data) => {
      dispatch(addNotification(data))
    });

    return () => {
      socket.off("notification");
    };
}, []);
  function BottomTabs() {
    return (
      <Tab.Navigator>

        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: "Home",
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Entypo name="home" size={24} color="#003580" />
              ) : (
                <AntDesign name="home" size={24} color="black" />
              ),
          }}
        />

        <Tab.Screen
          name="ChatScreen"
          component={ChatScreen}
          options={{
            tabBarLabel: "Message",
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <AntDesign name="message1" size={24} color="#003580" />
              ) : (
                <AntDesign name="message1" size={24} color="black" />
              ),
          }}
        />

        <Tab.Screen
          name="Bookings"
          component={BookingScreen}
          options={{
            tabBarLabel: "Bookings",
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <AntDesign name="heart" size={24} color="#003580" />
              ) : (
                <AntDesign name="hearto" size={24} color="black" />
              ),
          }}
        />



        <Tab.Screen
          name="Notification"
          component={NotificationSceen}
          options={{
            tabBarLabel: "Notification",
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Ionicons name="notifications" size={24} color="#003580" />
              ) : (
                <Ionicons name="notifications-outline" size={24} color="black" />
              ),
          }}
        />

        <Tab.Screen
          name="Menu"
          component={MenuScreen}
          options={{
            tabBarLabel: "Menu",
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Ionicons name="person" size={24} color="#003580" />
              ) : (
                <Ionicons name="person-outline" size={24} color="black" />
              ),
          }}
        />
      </Tab.Navigator>
    );
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        {/* <Header navigation={null} /> */}
        <FocusedStatusBar backgroundColor="#005DB1" />
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {isLogin ? (
            <>
              <Stack.Screen name="Main" component={BottomTabs} options={{ headerShown: false }} />
              <Stack.Screen name="SearchScreen" component={SearchScreen} />
              <Stack.Screen name="ListScreen" component={ListScreen} />
              <Stack.Screen name="DetailsScreen" component={DetailsScreen} options={{ headerShown: true }} />
              <Stack.Screen name="RoomScreen" component={RoomScreen} options={{ headerShown: true }} />
              <Stack.Screen name="ConfirmPaymentScreen" component={ConfirmPaymentScreen} options={{ headerShown: true }} />
              <Stack.Screen name="BillScreen" component={BillScreen} options={{ headerShown: true }} />
              <Stack.Screen name="ChatScreen" component={ChatScreen} />
              <Stack.Screen name="MessageScreen" component={MessageScreen} />
              <Stack.Screen name="MapListScreen" component={MapListScreen} />
              <Stack.Screen name="ProfileScreen" component={ProfileScreen} />

            </>
          ) : (
            <>
              <Stack.Screen name="OnScreen" component={OnboardingScreen} />
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Register" component={RegisterScreen} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  )
}


export default StackNavigator;

const styles = StyleSheet.create({})